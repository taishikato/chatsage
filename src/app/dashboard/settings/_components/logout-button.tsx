"use client";

import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useFormStatus } from "react-dom";

export const LogoutButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button variant="secondary" disabled={pending}>
      {pending && <Loader className="animate-spin mr-2 size-4" />}
      Logout
    </Button>
  );
};
