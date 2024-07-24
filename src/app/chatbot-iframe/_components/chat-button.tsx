"use client";

import { Button } from "@/components/ui/button";
import { Loader, Send } from "lucide-react";
import { useFormStatus } from "react-dom";

export const ChatButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      size="icon"
      variant="ghost"
      type="submit"
      disabled={pending}
      className="mr-2"
    >
      {pending ? (
        <Loader className="size-4 animate-spin" />
      ) : (
        <Send className="size-4" />
      )}
    </Button>
  );
};
