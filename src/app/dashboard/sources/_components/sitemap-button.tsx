"use client";

import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useFormStatus } from "react-dom";

export const SitemapButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loader className="size-4 mr-2 animate-spin" />}Find sources
    </Button>
  );
};
