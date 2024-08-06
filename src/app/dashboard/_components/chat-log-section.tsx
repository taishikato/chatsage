"use client";

import type { Database, Tables } from "@/types/supabase";
import { Fragment } from "react";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { SkeletonLoading } from "./skeleton-loading";
import { useChatbotInternalId } from "@/lib/hooks/use-chatbot-internal-id";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { BotMessage } from "@/app/(chat)/chatbot-embedding/[id]/components/stocks";
import { UserMessage } from "@/app/(chat)/chatbot-embedding/[id]/components/stocks/message";

type GetChatLogsFunctionReturnType = Omit<
  Database["public"]["Functions"]["get_chat_logs_by_chatbot"]["Returns"],
  "messages"
> & { messages: Tables<"chat_logs">[] };
[];

export const ChatLogSection = () => {
  const supabase = createClient();
  const chatbotInternalId = useChatbotInternalId();
  const [conversations, setConversations] = useState<
    GetChatLogsFunctionReturnType | []
  >([]);

  const [selectedConversationId, setSelectedConversationId] = useState<
    GetChatLogsFunctionReturnType[number]["conversation_id"] | null
  >(null);
  const [selectedConversationMessages, setSelectedConversationMessages] =
    useState<
      {
        id: string;
        internal_id: string;
        message: string;
        role: string;
        created_at: string;
      }[]
    >([]);
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

      setConversations(data as GetChatLogsFunctionReturnType);
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
      selectedConversation
        ? (selectedConversation.messages as {
            id: string;
            internal_id: string;
            message: string;
            role: string;
            created_at: string;
          }[])
        : []
    );
  }, [selectedConversationId]);

  if (loading) return <SkeletonLoading />;

  if (conversations.length === 0)
    return (
      <div className="flex items-center justify-center h-20">No chats yet</div>
    );

  return (
    <>
      <div className="flex flex-col md:flex-row gap-y-6 md:gap-y-0 md:gap-x-5 w-full">
        <div className="w-full md:max-w-sm border rounded-lg divide-y overflow-auto max-h-[46rem] shrink-0">
          {conversations.map((conversation) => {
            const messages = conversation.messages as {
              id: string;
              internal_id: string;
              message: string;
              role: string;
              created_at: string;
            }[];

            const userMessage =
              messages[messages.length - 2]?.message ||
              "No second latest message";

            const messageCreated = formatDistanceToNow(
              new Date(messages[messages.length - 2].created_at),
              { addSuffix: true }
            );

            const lastMessage =
              messages[messages.length - 1]?.message ||
              "No second latest message";

            return (
              <div
                key={conversation.conversation_id}
                onClick={() =>
                  setSelectedConversationId(conversation.conversation_id)
                }
                className={cn(
                  "w-full min-w-full p-4 space-y-2 text-sm hover:cursor-pointer hover:bg-secondary",
                  conversation.conversation_id === selectedConversationId
                    ? "bg-secondary"
                    : null
                )}
              >
                <div className="flex text-muted-foreground justify-between">
                  <div className="truncate">{userMessage}</div>
                  <time
                    className="ml-3 shrink-0"
                    dateTime={messages[messages.length - 1].created_at}
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

        <div className="w-full border rounded-lg h-[46rem] overflow-auto p-4">
          {selectedConversationMessages?.map((messageData) => {
            return (
              <Fragment key={messageData.id}>
                {messageData.role === "user" ? (
                  <UserMessage>{messageData.message}</UserMessage>
                ) : (
                  <BotMessage content={messageData.message} />
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
};
