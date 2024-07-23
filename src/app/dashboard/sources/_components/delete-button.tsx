"use client";

import { Button } from "@/components/ui/button";
import { Loader, Trash } from "lucide-react";
import { useFormStatus } from "react-dom";

export const DeleteButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button variant="ghost" size="icon" disabled={pending} type="submit">
      {pending ? (
        <Loader className="size-4 animate-spin" />
      ) : (
        <Trash className="size-4 text-red-400" />
      )}
    </Button>
  );
};
