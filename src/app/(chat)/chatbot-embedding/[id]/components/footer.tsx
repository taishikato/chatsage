import React from "react";

import { cn } from "@/lib/utils";

export function FooterText({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <footer
      className={cn(
        "text-center text-xs leading-normal text-muted-foreground",
        className
      )}
      {...props}
    >
      Supachat
    </footer>
  );
}
