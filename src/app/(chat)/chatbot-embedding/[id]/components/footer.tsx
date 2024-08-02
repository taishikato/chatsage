import React from "react";

import { cn } from "@/lib/utils";
import { APP_NAME, APP_URL } from "@/lib/consts";

export function FooterText({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <footer
      className={cn(
        "text-center text-xs leading-normal text-muted-foreground",
        className
      )}
      {...props}
    >
      <img
        src="/chatsage-chat-footer-logo.svg"
        className="size-4 grayscale rounded-md mr-1 opacity-50"
      />
      <a target="_blank" href={APP_URL}>
        Powered by {APP_NAME}
      </a>
    </footer>
  );
}
