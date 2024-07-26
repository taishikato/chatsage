"use client";

import { useEffect, useRef } from "react";

import Textarea from "react-textarea-autosize";

import { useActions, useUIState } from "ai/rsc";

import { BotMessage, UserMessage } from "./stocks/message";
import { type AI } from "../lib/chat/actions";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { useEnterSubmit } from "../lib/hooks/use-enter-submit";
import { nanoid } from "nanoid";

import { Send } from "lucide-react";

export function PromptForm({
  input,
  setInput,
}: {
  input: string;
  setInput: (value: string) => void;
}) {
  const { formRef, onKeyDown } = useEnterSubmit();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { getChat, submitUserMessage } = useActions();
  const [_, setMessages] = useUIState<typeof AI>();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    const fetchChat = async () => {
      try {
        const initialChat = await getChat(1); // Assuming default values, adjust as needed

        initialChat.forEach((chat: any) => {
          setMessages((currentMessages) => [
            ...currentMessages,
            {
              id: nanoid(),
              display:
                chat.role === "user" ? (
                  <UserMessage>{chat.message}</UserMessage>
                ) : (
                  <BotMessage content={chat.message} />
                ),
            },
          ]);
        });
      } catch (error) {
        console.error("Error fetching chat:", error);
      }
    };

    fetchChat();
  }, []);

  return (
    <form
      ref={formRef}
      onSubmit={async (e: any) => {
        e.preventDefault();

        // Blur focus on mobile
        if (window.innerWidth < 600) {
          e.target["message"]?.blur();
        }

        const value = input.trim();
        setInput("");
        if (!value) return;

        // Optimistically add user message UI
        setMessages((currentMessages) => [
          ...currentMessages,
          {
            id: nanoid(),
            display: <UserMessage>{value}</UserMessage>,
          },
        ]);

        // Submit and get response message
        const responseMessage = await submitUserMessage(value);

        console.log({ responseMessage });

        setMessages((currentMessages) => [...currentMessages, responseMessage]);
      }}
    >
      <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background">
        <Textarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          placeholder="Send a message."
          className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
          autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          name="message"
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="absolute top-[12px] right-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="submit"
                size="icon"
                disabled={input === ""}
                variant="outline"
              >
                <Send className="size-5" />
                <span className="sr-only">Send message</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Send message</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </form>
  );
}
