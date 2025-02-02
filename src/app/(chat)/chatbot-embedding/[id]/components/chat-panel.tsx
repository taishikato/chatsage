import * as React from "react";

import { PromptForm } from "./prompt-form";
import { ButtonScrollToBottom } from "./button-scroll-to-bottom";
import { FooterText } from "./footer";
// import { useAIState, useActions, useUIState } from "ai/rsc";
// import type { AI } from "../lib/chat/actions";
// import { nanoid } from "nanoid";
// import { UserMessage } from "./stocks/message";

export type ChatPanelProps = {
  id?: string;
  title?: string;
  input: string;
  setInput: (value: string) => void;
  isAtBottom: boolean;
  scrollToBottom: () => void;
  chatbotId: string;
  temperature: number;
};

export const ChatPanel = ({
  id,
  title,
  input,
  setInput,
  isAtBottom,
  scrollToBottom,
  chatbotId,
  temperature,
}: ChatPanelProps) => {
  // const [aiState] = useAIState();
  // const [messages, setMessages] = useUIState<typeof AI>();
  // const { submitUserMessage } = useActions();
  // const [shareDialogOpen, setShareDialogOpen] = React.useState(false);

  // const exampleMessages = [
  //   {
  //     heading: "What are the",
  //     subheading: "trending memecoins today?",
  //     message: `What are the trending memecoins today?`,
  //   },
  //   {
  //     heading: "What is the price of",
  //     subheading: "$DOGE right now?",
  //     message: "What is the price of $DOGE right now?",
  //   },
  //   {
  //     heading: "I would like to buy",
  //     subheading: "42 $DOGE",
  //     message: `I would like to buy 42 $DOGE`,
  //   },
  //   {
  //     heading: "What are some",
  //     subheading: `recent events about $DOGE?`,
  //     message: `What are some recent events about $DOGE?`,
  //   },
  // ];

  return (
    <div className="fixed inset-x-0 bottom-0 w-full bg-gradient-to-b from-muted/30 from-0% to-muted/30 to-50% duration-300 ease-in-out animate-in dark:from-background/10 dark:from-10% dark:to-background/80 peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]">
      <ButtonScrollToBottom
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
      />

      <div>
        {/* <div className="mb-4 grid grid-cols-2 gap-2 px-4 sm:px-0">
          {messages.length === 0 &&
            exampleMessages.map((example, index) => (
              <div
                key={example.heading}
                className={`cursor-pointer rounded-lg border bg-white p-4 hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900 ${
                  index > 1 && "hidden md:block"
                }`}
                onClick={async () => {
                  setMessages((currentMessages) => [
                    ...currentMessages,
                    {
                      id: nanoid(),
                      display: <UserMessage>{example.message}</UserMessage>,
                    },
                  ]);

                  const responseMessage = await submitUserMessage(
                    example.message
                  );

                  setMessages((currentMessages) => [
                    ...currentMessages,
                    responseMessage,
                  ]);
                }}
              >
                <div className="text-sm font-semibold">{example.heading}</div>
                <div className="text-sm text-zinc-600">
                  {example.subheading}
                </div>
              </div>
            ))}
        </div> */}

        <div className="border-t bg-background shadow-lg">
          <PromptForm
            input={input}
            setInput={setInput}
            temperature={temperature}
          />
          <FooterText className="h-10 flex items-center justify-center text-xs bg-muted/70" />
        </div>
      </div>
    </div>
  );
};
