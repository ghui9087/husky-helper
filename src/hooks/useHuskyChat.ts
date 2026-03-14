import { useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type Msg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/husky-chat`;

interface UseHuskyChatOptions {
  onConversationCreated?: (id: string, title: string) => void;
}

export function useHuskyChat(options?: UseHuskyChatOptions) {
  const { i18n, t } = useTranslation();
  const { user } = useAuth();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);

  // Load a specific conversation
  const loadConversation = useCallback(async (id: string) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("messages")
        .select("role, content")
        .eq("conversation_id", id)
        .order("created_at", { ascending: true });

      if (error) throw error;

      setMessages((data as Msg[]) || []);
      setConversationId(id);
    } catch (err) {
      console.error("Error loading conversation:", err);
      toast.error("Failed to load conversation");
    }
  }, [user]);

  // Save a message to the database
  const saveMessage = useCallback(async (convId: string, msg: Msg) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("messages")
        .insert({
          conversation_id: convId,
          role: msg.role,
          content: msg.content,
        });

      if (error) throw error;
    } catch (err) {
      console.error("Error saving message:", err);
    }
  }, [user]);

  // Create a new conversation
  const createConversation = useCallback(async (firstMessage: string): Promise<string | null> => {
    if (!user) return null;

    const title = firstMessage.slice(0, 40) + (firstMessage.length > 40 ? "..." : "");

    try {
      const { data, error } = await supabase
        .from("conversations")
        .insert({ user_id: user.id, title })
        .select("id")
        .single();

      if (error) throw error;
      
      options?.onConversationCreated?.(data.id, title);
      return data.id;
    } catch (err) {
      console.error("Error creating conversation:", err);
      return null;
    }
  }, [user, options]);

  const send = useCallback(async (input: string) => {
    const userMsg: Msg = { role: "user", content: input };
    const allMessages = [...messages, userMsg];
    setMessages(allMessages);
    setIsLoading(true);

    // For logged-in users, handle conversation persistence
    let currentConvId = conversationId;
    if (user) {
      // If no conversation exists, create one
      if (!currentConvId) {
        currentConvId = await createConversation(input);
        if (currentConvId) {
          setConversationId(currentConvId);
        }
      }
      
      // Save user message
      if (currentConvId) {
        await saveMessage(currentConvId, userMsg);
      }
    }

    let assistantSoFar = "";

    const upsertAssistant = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: allMessages,
          language: i18n.language,
          userId: user?.id ?? null,
        }),
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({ error: "Request failed" }));
        if (resp.status === 429) toast.error(err.error || "Too many requests. Please slow down.");
        else if (resp.status === 402) toast.error(err.error || "AI credits depleted.");
        else toast.error(err.error || "Something went wrong.");
        setIsLoading(false);
        return;
      }

      if (!resp.body) throw new Error("No response body");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) upsertAssistant(content);
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      // Final flush
      if (textBuffer.trim()) {
        for (let raw of textBuffer.split("\n")) {
          if (!raw) continue;
          if (raw.endsWith("\r")) raw = raw.slice(0, -1);
          if (raw.startsWith(":") || raw.trim() === "") continue;
          if (!raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) upsertAssistant(content);
          } catch { /* ignore */ }
        }
      }

      // Save assistant response after streaming is complete
      if (user && currentConvId && assistantSoFar) {
        await saveMessage(currentConvId, { role: "assistant", content: assistantSoFar });
      }
    } catch (e) {
      console.error("Chat error:", e);
      toast.error("Failed to get a response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [messages, i18n.language, user, conversationId, createConversation, saveMessage, guestMessageCount]);

  const reset = useCallback(() => {
    setMessages([]);
    setConversationId(null);
  }, []);

  const startNewChat = useCallback(() => {
    setMessages([]);
    setConversationId(null);
  }, []);

  return { 
    messages, 
    isLoading, 
    send, 
    reset, 
    startNewChat,
    conversationId,
    loadConversation,
    showSignInPrompt,
    setShowSignInPrompt,
    guestMessageCount,
  };
}
