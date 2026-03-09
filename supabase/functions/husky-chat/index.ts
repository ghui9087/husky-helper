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
    // Split on whitespace AND extract CJK character bigrams for Chinese/Japanese/Korean
    const lowerMsg = userMessage.toLowerCase();
    const wordTerms = lowerMsg.split(/[\s，。！？、；：""''（）《》【】\-,.!?;:()\[\]{}]+/).filter((w: string) => w.length > 1);
    // Extract CJK bigrams (sliding window of 2 chars) for better matching
    const cjkChars = lowerMsg.replace(/[^\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff\uac00-\ud7af]/g, '');
    const cjkBigrams: string[] = [];
    for (let i = 0; i < cjkChars.length - 1; i++) {
      cjkBigrams.push(cjkChars.slice(i, i + 2));
    }
    // Also add individual CJK chars for single-char keyword matching
    const cjkSingleChars = cjkChars.split('').filter((c: string) => c.length > 0);
    const searchTerms = [...new Set([...wordTerms, ...cjkBigrams, ...cjkSingleChars])];

    let knowledgeContext = "";
    let knowledgeFound = false;

    // Fetch knowledge rows matching user's language (fallback to 'en')
    const userLang = language || "en";
    const { data: knowledgeRows } = await supabase
      .from("husky_knowledge")
      .select("category, title, content, keywords, language, source_url")
      .eq("language", userLang);

    // If no rows found for user language, fallback to English
    let rows = knowledgeRows;
    if (!rows || rows.length === 0) {
      const { data: enRows } = await supabase
        .from("husky_knowledge")
        .select("category, title, content, keywords, language, source_url")
        .eq("language", "en");
      rows = enRows;
    }

    console.log(`[husky-chat] Language: ${userLang}, Rows fetched: ${rows?.length ?? 0}, Search terms: ${searchTerms.slice(0, 15).join(', ')}`);

    if (rows && rows.length > 0 && searchTerms.length > 0) {
      const scored = rows.map((row: any) => {
        const text = `${row.category} ${row.title} ${row.content} ${row.keywords || ""}`.toLowerCase();
        const score = searchTerms.reduce((s: number, term: string) => {
          const keywordMatch = (row.keywords || "").toLowerCase().includes(term) ? 3 : 0;
          const categoryMatch = row.category.toLowerCase().includes(term) ? 2 : 0;
          const titleMatch = row.title.toLowerCase().includes(term) ? 1.5 : 0;
          const contentMatch = text.includes(term) ? 1 : 0;
          return s + keywordMatch + categoryMatch + titleMatch + contentMatch;
        }, 0);
        return { ...row, score };
      }).filter((r: any) => r.score > 0)
        .sort((a: any, b: any) => b.score - a.score)
        .slice(0, 5);

      console.log(`[husky-chat] Top scored articles: ${scored.map((r: any) => `${r.title}(${r.score})`).join(', ')}`);

      if (scored.length > 0) {
        knowledgeFound = true;
        knowledgeContext = "\n\n## Relevant UW Knowledge Base Articles:\n" +
          scored.map((r: any) => `### [${r.category}] ${r.title}${r.source_url ? ` (source_url: ${r.source_url})` : ''}\n${r.content}`).join("\n\n");
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

    const knowledgeSourceNote = knowledgeFound
      ? "The following articles are from our verified UW knowledge base. Prioritize this information in your answer and cite it naturally (e.g. 'According to our UW guide...'). IMPORTANT: At the end of your response, list every knowledge base article you used in this format on separate lines:\n\nSource: [category] > [title] | [source_url]\n\nList ALL sources used, one per line. Include the source_url from the article if available."
      : "No articles from our knowledge base matched this query. You may use your general knowledge about UW Seattle, but you MUST end your response with exactly this line:\n\nBased on general knowledge. For the most accurate information, please verify at uw.edu or other online resources.";

    const systemPrompt = `You are HuskyGuide 🐾, an expert University of Washington (UW) International Student Advisor and AI assistant.

## Your Identity & Tone
- Warm, encouraging, and knowledgeable about UW Seattle campus life
- You use the Husky mascot 🐺 emoji occasionally
- You speak like a friendly senior student who knows everything about UW
- Keep responses concise but thorough (2-4 paragraphs max unless asked for detail)

## Response Formatting Rules (MANDATORY - apply to ALL languages including English)
- Use **bold text** liberally for key terms, names, prices, and important phrases in EVERY language. Do NOT skip bold formatting in English.
- Use these emoji icons as visual section headers before each major topic:
  ✅ for action items and checklists
  📋 for requirements and documents
  🏠 for housing topics
  🏦 for banking and financial services
  🚌 for transportation
  📚 for academic topics
  💰 for budget and finance advice
  🛂 for visa and immigration
  ⚠️ for important warnings
  💡 for tips and recommendations
  🍽️ for food and dining
- For longer responses with multiple sections, insert a markdown horizontal rule (---) between major sections
- Use bullet points (- ) for lists, never dense paragraph text for multiple items
- Always use **bold** for: restaurant names, locations, prices, deadlines, important terms — in ALL languages

## ${languageInstruction}

## Knowledge Source Instructions
${knowledgeSourceNote}
${knowledgeContext}
${profileContext}

## Source Citation Rules (MANDATORY)
- When you use information from the Knowledge Base Articles above, you MUST end your response with source citations in this exact format:
  Source: [category] > [title] | [source_url]
  (one line per source used, include the source_url from the article metadata)
- Example: Source: Banking > Best Banks for Chinese Students | https://finance.uw.edu/example
- When you do NOT use any knowledge base article (i.e. answering from general knowledge), you MUST end your response with:
  Based on general knowledge. For the most accurate information, please verify at uw.edu or other online resources.
- NEVER skip the source citation footer.

## Personalization Rules
- If user profile data is available, ALWAYS tailor your answer to their specific situation
- For budget "Low": emphasize affordable/free options, student discounts, and cost-saving tips
- For budget "Medium": balance quality and cost
- For budget "High": include premium options alongside standard recommendations
- Reference their program when relevant (e.g. engineering students → specific building locations)
- If they're international, proactively mention visa-relevant info, cultural tips, and ISS resources

## Guidelines
- Always prioritize safety and official UW resources
- For visa/immigration questions, always recommend consulting ISS (International Student Services)
- Include specific locations, prices, and practical tips when possible
- If you don't know something, say so honestly and suggest where to find the answer
- For housing/food/transport, give actionable advice with specific names and locations

## STRICT Topic & Accuracy Rules
- NEVER mix unrelated topics in a single response. If the user asks about restaurants, ONLY talk about food and dining. If they ask about housing, ONLY talk about housing. Stay laser-focused on the topic asked.
- NEVER fabricate specific restaurant names, prices, menu items, or other details that are not in the knowledge base articles provided above.
- If a question is outside the knowledge base and you lack verified details, say: "I don't have specific details on this in my knowledge base. For restaurants, I recommend checking Yelp or Google Maps for University District Seattle." Adapt the recommendation resource to the topic (e.g. for housing: "I recommend checking Zillow or Apartments.com for University District Seattle").`;

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
