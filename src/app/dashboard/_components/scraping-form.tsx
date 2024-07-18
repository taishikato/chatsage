"use client";

import { Input } from "@/components/ui/input";
import { ScrapingButton } from "./scraping-button";
import { scrape } from "@/actions/scrape";

export const ScrapingForm = () => {
  return (
    <form
      action={scrape}
      className="flex w-full max-w-sm items-center space-x-2"
    >
      <Input type="url" placeholder="URL" />
      <ScrapingButton />
    </form>
  );
};
