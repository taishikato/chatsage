import React from "react";

import { cn } from "@/lib/utils";
import { APP_NAME } from "@/lib/consts";

export function FooterText({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <footer
      className={cn(
        "text-center text-xs leading-normal text-muted-foreground",
        className
      )}
      {...props}
    >
      Powered by {APP_NAME}
    </footer>
  );
}
