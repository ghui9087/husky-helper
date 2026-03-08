import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.98.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { messages, language, userId } = await req.json();
    const userMessage = messages?.[messages.length - 1]?.content ?? "";

    // 1. Retrieve relevant knowledge from husky_knowledge
    const searchTerms = userMessage.toLowerCase().split(/\s+/).filter((w: string) => w.length > 2);
    let knowledgeContext = "";
    let knowledgeFound = false;

    // Fetch all knowledge rows (table is small/curated) and score relevance
    const { data: knowledgeRows } = await supabase
      .from("husky_knowledge")
      .select("category, title, content");

    if (knowledgeRows && knowledgeRows.length > 0 && searchTerms.length > 0) {
      // Score each article by keyword overlap
      const scored = knowledgeRows.map((row: any) => {
        const text = `${row.category} ${row.title} ${row.content}`.toLowerCase();
        const score = searchTerms.reduce((s: number, term: string) => {
          // Boost category matches
          const categoryMatch = row.category.toLowerCase().includes(term) ? 2 : 0;
          const titleMatch = row.title.toLowerCase().includes(term) ? 1.5 : 0;
          const contentMatch = text.includes(term) ? 1 : 0;
          return s + categoryMatch + titleMatch + contentMatch;
        }, 0);
        return { ...row, score };
      }).filter((r: any) => r.score > 0)
        .sort((a: any, b: any) => b.score - a.score)
        .slice(0, 5);

      if (scored.length > 0) {
        knowledgeFound = true;
        knowledgeContext = "\n\n## Relevant UW Knowledge Base Articles:\n" +
          scored.map((r: any) => `### [${r.category}] ${r.title}\n${r.content}`).join("\n\n");
      }
    }

    // 2. Fetch user profile if logged in
    let profileContext = "";
    if (userId) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, country, program, start_quarter, budget_range, is_international")
        .eq("user_id", userId)
        .maybeSingle();

      if (profile) {
        profileContext = `\n\n## Current User Profile:
- Name: ${profile.full_name || "Unknown"}
- Country: ${profile.country || "Unknown"}
- Program: ${profile.program || "Unknown"}
- Starting Quarter: ${profile.start_quarter || "Unknown"}
- Budget Range: ${profile.budget_range || "Unknown"}
- International Student: ${profile.is_international ? "Yes" : "No"}

Use this information to personalize your advice. For example, if their budget is "Low", suggest affordable options. If they're from a specific country, relate to cultural context where helpful.`;
      }
    }

    // 3. Build system prompt
    const languageInstruction = language && language !== "en"
      ? `CRITICAL LANGUAGE RULE: The user's site language is set to "${language}". You MUST respond entirely in this language. Do not mix languages. Every word of your response must be in "${language}".`
      : "Respond in English unless the user writes in another language, in which case respond in that language.";

    const systemPrompt = `You are HuskyGuide 🐾, an expert University of Washington (UW) International Student Advisor and AI assistant.

## Your Identity & Tone
- Warm, encouraging, and knowledgeable about UW Seattle campus life
- You use the Husky mascot 🐺 emoji occasionally
- You speak like a friendly senior student who knows everything about UW
- Keep responses concise but thorough (2-4 paragraphs max unless asked for detail)

## ${languageInstruction}

## Your Knowledge
You have access to a curated knowledge base about UW. Use the information below to answer questions accurately. If the knowledge base doesn't cover the topic, use your general knowledge about UW Seattle but note that your info may not be fully current.
${knowledgeContext || "\n(No specific knowledge base articles matched this query. Use your general UW knowledge.)"}
${profileContext}

## Guidelines
- Always prioritize safety and official UW resources
- For visa/immigration questions, always recommend consulting ISS (International Student Services)
- Include specific locations, prices, and practical tips when possible
- If you don't know something, say so honestly and suggest where to find the answer
- For housing/food/transport, give actionable advice with specific names and locations`;

    // 4. Call Lovable AI Gateway with streaming
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits depleted. Please add credits to continue." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI service temporarily unavailable." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("husky-chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
