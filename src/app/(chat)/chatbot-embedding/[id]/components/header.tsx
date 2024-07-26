"use client";

import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";
import { useLocalStorage } from "./localstorage-provider";
import { nanoid } from "@/lib/utils";

export const Header = ({ chatBotName }: { chatBotName: string | null }) => {
  const { setValue } = useLocalStorage();

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <div className="flex items-center w-full">
        <h1 className="font-semibold text-sm mr-auto">
          {chatBotName ?? "No name"}
        </h1>
        <Button
          size="icon"
          variant="outline"
          onClick={() => setValue(nanoid())}
        >
          <RotateCw className="size-4" />
        </Button>
      </div>
    </header>
  );
};
