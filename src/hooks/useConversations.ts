import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface Conversation {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface ConversationGroup {
  label: string;
  conversations: Conversation[];
}

function groupConversationsByDate(conversations: Conversation[]): ConversationGroup[] {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
  const last7Days = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const last30Days = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

  const groups: Record<string, Conversation[]> = {
    Today: [],
    Yesterday: [],
    "Last 7 days": [],
    "Last 30 days": [],
    Older: [],
  };

  for (const conv of conversations) {
    const date = new Date(conv.updated_at);
    if (date >= today) {
      groups["Today"].push(conv);
    } else if (date >= yesterday) {
      groups["Yesterday"].push(conv);
    } else if (date >= last7Days) {
      groups["Last 7 days"].push(conv);
    } else if (date >= last30Days) {
      groups["Last 30 days"].push(conv);
    } else {
      groups["Older"].push(conv);
    }
  }

  return Object.entries(groups)
    .filter(([, convs]) => convs.length > 0)
    .map(([label, conversations]) => ({ label, conversations }));
}

export function useConversations() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchConversations = useCallback(async () => {
    if (!user) {
      setConversations([]);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("conversations")
        .select("id, title, created_at, updated_at")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false });

      if (error) throw error;
      setConversations(data || []);
    } catch (err) {
      console.error("Error fetching conversations:", err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  const createConversation = useCallback(
    async (title: string): Promise<string | null> => {
      if (!user) return null;

      try {
        const { data, error } = await supabase
          .from("conversations")
          .insert({ user_id: user.id, title })
          .select("id")
          .single();

        if (error) throw error;
        await fetchConversations();
        return data.id;
      } catch (err) {
        console.error("Error creating conversation:", err);
        return null;
      }
    },
    [user, fetchConversations]
  );

  const deleteConversation = useCallback(
    async (id: string) => {
      if (!user) return;

      try {
        const { error } = await supabase
          .from("conversations")
          .delete()
          .eq("id", id);

        if (error) throw error;
        setConversations((prev) => prev.filter((c) => c.id !== id));
      } catch (err) {
        console.error("Error deleting conversation:", err);
      }
    },
    [user]
  );

  const updateConversationTitle = useCallback(
    async (id: string, title: string) => {
      if (!user) return;

      try {
        const { error } = await supabase
          .from("conversations")
          .update({ title })
          .eq("id", id);

        if (error) throw error;
        setConversations((prev) =>
          prev.map((c) => (c.id === id ? { ...c, title } : c))
        );
      } catch (err) {
        console.error("Error updating conversation:", err);
      }
    },
    [user]
  );

  const groupedConversations = groupConversationsByDate(conversations);

  return {
    conversations,
    groupedConversations,
    loading,
    fetchConversations,
    createConversation,
    deleteConversation,
    updateConversationTitle,
  };
}
