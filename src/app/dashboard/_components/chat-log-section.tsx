"use client";

import type { Database } from "@/types/supabase";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { SkeletonLoading } from "./skeleton-loading";
import { useChatbotInternalId } from "@/lib/hooks/use-chatbot-internal-id";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

type GetChatLogsFunctionType =
  Database["public"]["Functions"]["get_chat_logs_by_chatbot"];

export const ChatLogSection = () => {
  const supabase = createClient();
  const chatbotInternalId = useChatbotInternalId();

  const [conversations, setConversations] = useState<
    GetChatLogsFunctionType["Returns"]
  >([]);

  const [selectedConversationId, setSelectedConversationId] = useState<
    GetChatLogsFunctionType["Returns"][number]["conversation_id"] | null
  >(null);
  const [selectedConversationMessages, setSelectedConversationMessages] =
    useState<GetChatLogsFunctionType["Returns"][number]["messages"]>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchChatLogs = async (chatbotInternalId: string) => {
      setLoading(true);

      const { data, error } = await supabase.rpc("get_chat_logs_by_chatbot", {
        chatbot_id: chatbotInternalId,
      });

      if (error) {
        console.error("Error fetching chat logs:", error);
        return null;
      }

      setConversations(data);
      setSelectedConversationId(
        data.length > 0 ? data[0].conversation_id : null
      );

      setLoading(false);
    };

    if (chatbotInternalId) fetchChatLogs(chatbotInternalId);
  }, [chatbotInternalId]);

  useEffect(() => {
    const selectedConversation = conversations.find(
      (conversation) => conversation.conversation_id === selectedConversationId
    );
    setSelectedConversationMessages(
      selectedConversation ? selectedConversation.messages : null
    );
  }, [selectedConversationId]);

  if (loading) return <SkeletonLoading />;

  if (conversations.length === 0)
    return (
      <div className="flex items-center justify-center h-20">No chats yet</div>
    );

  return (
    <>
      <div className="flex gap-x-5">
        <div className="w-full max-w-sm border rounded-lg divide-y overflow-auto max-h-96">
          {conversations.map((conversation) => {
            const userMessage =
              conversation.messages[conversation.messages.length - 2]
                ?.message || "No second latest message";

            const messageCreated = formatDistanceToNow(
              new Date(
                conversation.messages[
                  conversation.messages.length - 2
                ].created_at
              ),
              { addSuffix: true }
            );

            const lastMessage =
              conversation.messages[conversation.messages.length - 1]
                ?.message || "No second latest message";

            return (
              <div
                key={conversation.conversation_id}
                onClick={() =>
                  setSelectedConversationId(conversation.conversation_id)
                }
                className={cn(
                  "p-4 space-y-2 text-sm hover:cursor-pointer hover:bg-secondary",
                  conversation.conversation_id === selectedConversationId
                    ? "bg-secondary"
                    : null
                )}
              >
                <div className="flex text-muted-foreground justify-between">
                  <div className="truncate">{userMessage}</div>
                  <time
                    className="ml-3 shrink-0"
                    datatime={
                      conversation.messages[conversation.messages.length - 2]
                        .created_at
                    }
                  >
                    {messageCreated}
                  </time>
                </div>
                <div className="text-secondary-foreground/90 line-clamp-2">
                  Bot: {lastMessage}
                </div>
              </div>
            );
          })}
        </div>

        <div className="w-full border rounded-lg">
          {JSON.stringify(selectedConversationMessages)}
        </div>
      </div>
    </>
  );
};
