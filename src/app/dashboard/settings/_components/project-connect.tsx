"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { APP_URL } from "@/lib/consts";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

export const ProjectConnect = ({ chatbotId }: { chatbotId: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const scriptText = `<script
  async
  defer
  src="${APP_URL}/api/embedding?chatbotId=${chatbotId}"
/>`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(scriptText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <>
      <CardContent>
        <pre className="text-xs w-full overflow-auto rounded-lg bg-muted p-3">
          {scriptText}
        </pre>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button onClick={handleCopy}>
          {isCopied ? (
            <Check className="size-4 mr-2" />
          ) : (
            <Copy className="size-4 mr-2" />
          )}
          {isCopied ? "Copied!" : "Copy"}
        </Button>
      </CardFooter>
    </>
  );
};
