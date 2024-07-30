"use client";

import { Input } from "@/components/ui/input";
import { CrawlButton } from "./crawl-button";
import { scrape } from "@/actions/scrape";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useChatbotInternalId } from "@/lib/hooks/use-chatbot-internal-id";

export const CrawlForm = () => {
  const router = useRouter();
  const supabase = createClient();

  const chatbotInternalId = useChatbotInternalId();

  return (
    <form
      className="flex items-center gap-2"
      action={async (formData) => {
        const url = formData.get("url") as string;

        if (!url || !url.replace(/\s+/g, "")) {
          return toast.error("URL can't be empty.");
        }

        toast.success("We're adding a new source...hang tight!");

        const result = await scrape(url);
        if (!result.success) {
          toast.error(result.message, { duration: 7000 });
          return;
        }

        await supabase
          .from("urls")
          .update({
            status: "done",
          })
          .match({ url, chatbot_internal_id: chatbotInternalId });

        router.refresh();

        toast.success("A new source has been added!");
      }}
    >
      <Input type="text" name="url" placeholder="https://www.example.com" />
      <CrawlButton />
    </form>
  );
};
