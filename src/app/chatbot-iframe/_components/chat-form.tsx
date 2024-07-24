"use client";

import { Textarea } from "@/components/ui/textarea";
import { ChatButton } from "./chat-button";
import { useEnterSubmit } from "@/lib/hooks/use-enter-submit";

export const ChatForm = () => {
  const { formRef, onKeyDown } = useEnterSubmit();

  return (
    <form ref={formRef} className="border-t py-2 flex items-center">
      <Textarea
        placeholder="Your Message"
        className="resize-none items-center min-h-[40px] border-none focus-visible:outline-none focus-visible:ring-0"
        rows={1}
        onKeyDown={onKeyDown}
      />
      <ChatButton />
    </form>
  );
};
