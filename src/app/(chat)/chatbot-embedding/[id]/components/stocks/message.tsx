"use client";

// import { IconOpenAI } from "../ui/icons";
import { cn } from "@/lib/utils";
import { CodeBlock } from "../ui/codeblock";
import { MemoizedReactMarkdown } from "../markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { StreamableValue } from "ai/rsc";
import { useStreamableText } from "../../lib/hooks/use-streamable-text";
import { Loader } from "lucide-react";

// Different types of message bubbles.

export const UserMessage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-2 py-6 md:py-12">
      <div className="flex justify-end">
        <div className="text-sm bg-blue-400 text-white rounded-xl p-3">
          {children}
        </div>
      </div>
    </div>
  );
};

export function BotMessage({
  content,
  className,
}: {
  content: string | StreamableValue<string>;
  className?: string;
}) {
  const text = useStreamableText(content);

  return (
    <div className={cn("group relative flex items-start", className)}>
      {/* <div className="flex size-[24px] shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground shadow-sm">
        <IconOpenAI />
      </div> */}
      <div className="flex-1 space-y-2 overflow-hidden flex flex-start">
        <MemoizedReactMarkdown
          className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 bg-secondary p-3 rounded-xl"
          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            p({ children }) {
              return <p className="mb-2 last:mb-0">{children}</p>;
            },
            // @ts-ignore
            code({ node, inline, className, children, ...props }) {
              // @ts-ignore
              if (children.length) {
                // @ts-ignore
                if (children[0] == "▍") {
                  return (
                    <span className="mt-1 animate-pulse cursor-default">▍</span>
                  );
                }

                // @ts-ignore
                children[0] = (children[0] as string).replace("`▍`", "▍");
              }

              const match = /language-(\w+)/.exec(className || "");

              if (inline) {
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }

              return (
                <CodeBlock
                  key={Math.random()}
                  language={(match && match[1]) || ""}
                  value={String(children).replace(/\n$/, "")}
                  {...props}
                />
              );
            },
          }}
        >
          {text}
        </MemoizedReactMarkdown>
      </div>
    </div>
  );
}

export function SpinnerMessage() {
  return (
    <div className="flex justify-start py-6 md:py-12">
      <Loader className="animate-spin size-5" />
    </div>
  );
}
