"use client";

import { cn, nanoid } from "@/lib/utils";
import { ChatList } from "./chat-list";
import { ChatPanel } from "./chat-panel";
import { EmptyScreen } from "./empty-screen";
import { useEffect, useState } from "react";
import { useUIState, useAIState, useActions } from "ai/rsc";
import { Message } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useScrollAnchor } from "../lib/hooks/use-scroll-anchor";
import { toast } from "sonner";
import { BotMessage, UserMessage } from "./stocks/message";
import { AI } from "../lib/chat/actions";
import { Loader } from "lucide-react";
import { useLocalStorage } from "./localstorage-provider";

export type ChatProps = {
  initialMessages?: Message[];
  id: string;
  missingKeys: string[];
  chatbotId: string;
} & React.ComponentProps<"div">;

export const Chat = ({ id, className, missingKeys, chatbotId }: ChatProps) => {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useUIState<typeof AI>();
  const [aiState] = useAIState();
  const { getChat } = useActions();
  const { value: conversationId } = useLocalStorage();

  const [loadingInitialChatHistory, setLoadingInitialChatHistory] =
    useState(true);

  useEffect(() => {
    const messagesLength = aiState.messages?.length;
    if (messagesLength === 2) {
      router.refresh();
    }
  }, [aiState.messages, router]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    missingKeys.map((key) => {
      toast.error(`Missing ${key} environment variable!`);
    });
  }, [missingKeys]);

  const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom } =
    useScrollAnchor();

  useEffect(() => {
    const fetchChat = async () => {
      setLoadingInitialChatHistory(true);

      try {
        const initialChat = await getChat(chatbotId, conversationId);

        if (!initialChat) return;

        const messagesNode = initialChat.map((chat: any) => {
          return {
            id: nanoid(),
            display:
              chat.role === "user" ? (
                <UserMessage>{chat.message}</UserMessage>
              ) : (
                <BotMessage content={chat.message} />
              ),
          };
        });

        setMessages(messagesNode);

        scrollToBottom();
      } catch (error) {
        console.error("Error fetching chat:", error);
      } finally {
        setLoadingInitialChatHistory(false);
      }
    };

    fetchChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatbotId, conversationId]);

  return (
    <div
      className="group w-full overflow-auto pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]"
      ref={scrollRef}
    >
      {loadingInitialChatHistory ? (
        <div className="w-full h-full flex items-center justify-center">
          <Loader className="size-6 animate-spin" />
        </div>
      ) : (
        <>
          <div
            className={cn("pb-[200px] pt-4 md:pt-10", className)}
            ref={messagesRef}
          >
            {messages.length ? (
              <ChatList messages={messages} />
            ) : (
              <EmptyScreen />
            )}
            <div className="w-full h-px" ref={visibilityRef} />
          </div>
          <ChatPanel
            id={id}
            input={input}
            setInput={setInput}
            isAtBottom={isAtBottom}
            scrollToBottom={scrollToBottom}
            chatbotId={chatbotId}
          />
        </>
      )}
    </div>
  );
};
