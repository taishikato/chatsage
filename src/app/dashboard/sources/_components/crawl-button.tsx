"use client";

import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useFormStatus } from "react-dom";

export const CrawlButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit">
      {pending && <Loader className="size-4 mr-2 animate-spin" />}
      Fetch more links
    </Button>
  );
};
