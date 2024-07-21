"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export const SitemapButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      Find sources
    </Button>
  );
};
