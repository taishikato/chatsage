"use client";

import { Button } from "@/components/ui/button";
import { Loader, MoveRight } from "lucide-react";
import { useFormStatus } from "react-dom";

export const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button className="group" type="submit" disabled={pending}>
      Next
      {pending ? (
        <Loader className="size-4 animate-spin ml-2" />
      ) : (
        <MoveRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
      )}
    </Button>
  );
};
