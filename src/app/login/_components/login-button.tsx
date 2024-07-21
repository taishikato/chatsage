"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useFormStatus } from "react-dom";

export const LoginButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      variant="outline"
      type="submit"
      className="w-full"
      disabled={pending}
    >
      {pending ? (
        <Loader className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.google className="mr-2 h-4 w-4" />
      )}{" "}
      Login in with Google
    </Button>
  );
};
