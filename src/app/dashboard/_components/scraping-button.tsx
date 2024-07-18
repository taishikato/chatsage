"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export const ScrapingButton = () => {
  const { pending } = useFormStatus();

  return <Button type="submit">Get sources</Button>;
};
