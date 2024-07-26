"use client";

import { cn } from "@/lib/utils";
import { ChatList } from "./chat-list";
import { ChatPanel } from "./chat-panel";
import { EmptyScreen } from "./empty-screen";
import { useEffect, useState } from "react";
import { useUIState, useAIState } from "ai/rsc";
import { Message } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useScrollAnchor } from "../lib/hooks/use-scroll-anchor";
import { toast } from "sonner";

export interface ChatProps extends React.ComponentProps<"div"> {
  initialMessages?: Message[];
  id: string;
  chatbotId: string;
  missingKeys: string[];
}

const conversationLocalStorageKeyPrefix = "sp_chatbodId_";

export function Chat({ id, chatbotId, className, missingKeys }: ChatProps) {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [messages] = useUIState();
  const [aiState] = useAIState();

  const localStorageKeyForConversationId = `${conversationLocalStorageKeyPrefix}${chatbotId}`;
  const [conversationId, setConversationId] = useState(() => {
    if (typeof window !== "undefined") {
      const storedValue = localStorage.getItem(
        localStorageKeyForConversationId
      );
      return storedValue ?? id;
    }

    return id;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(localStorageKeyForConversationId, conversationId);
    }
  }, [localStorageKeyForConversationId, conversationId]);

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

  return (
    <div
      className="group w-full overflow-auto pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]"
      ref={scrollRef}
    >
      <div
        className={cn("pb-[200px] pt-4 md:pt-10", className)}
        ref={messagesRef}
      >
        {messages.length ? <ChatList messages={messages} /> : <EmptyScreen />}
        <div className="w-full h-px" ref={visibilityRef} />
      </div>
      <ChatPanel
        id={id}
        input={input}
        setInput={setInput}
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
      />
    </div>
  );
}
