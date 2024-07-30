import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export const useChatbotInternalId = () => {
  const supabase = createClient();

  const [chatbotInternalId, setChatbotInternalId] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchProjectId = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (user) {
        const { data: chatbot, error: chatbotFetchError } = await supabase
          .from("chatbots")
          .select("internal_id")
          .match({ user_auth_id: user.id })
          .single();

        if (!chatbot || chatbotFetchError) {
          console.error(
            "Error fetching chatbot ID:",
            chatbotFetchError.message ?? "No detail"
          );
        } else {
          const chatbotInternalId = chatbot.internal_id;
          setChatbotInternalId(chatbotInternalId);
        }
      }
    };

    fetchProjectId();
  }, [supabase]);

  return chatbotInternalId;
};
