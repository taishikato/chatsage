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

export interface ChatProps extends React.ComponentProps<"div"> {
  initialMessages?: Message[];
  id: string;
  missingKeys: string[];
}

export function Chat({ id, className, missingKeys }: ChatProps) {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useUIState<typeof AI>();
  const [aiState] = useAIState();
  const { getChat } = useActions();
  const { value: conversationId } = useLocalStorage();

  console.log({ conversationId });

  const [loadingInitialChatHistory, setLoadingInitialChatHistory] =
    useState(true);

  useEffect(() => {
    const messagesLength = aiState.messages?.length;
    if (messagesLength === 2) {
      router.refresh();
    }
  }, [aiState.messages, router]);

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
        const initialChat = await getChat(1, conversationId);

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
      } catch (error) {
        console.error("Error fetching chat:", error);
      } finally {
        setLoadingInitialChatHistory(false);
      }
    };

    fetchChat();
  }, []);

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
            conversationId={conversationId}
          />
        </>
      )}
    </div>
  );
}
