"use client";

import { Input } from "@/components/ui/input";
import { CrawlButton } from "./crawl-button";
import { scrape } from "@/actions/scrape";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const CrawlForm = () => {
  const router = useRouter();
  const supabase = createClient();

  const [projectId, setProjectId] = useState<number | null>(null);

  useEffect(() => {
    const fetchProjectId = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (user) {
        const { data: projects, error: projectError } = await supabase
          .from("chatbots")
          .select("id")
          .match({ user_auth_id: user.id });

        if (projectError) {
          console.error("Error fetching project ID:", projectError);
        } else if (projects.length > 0) {
          const projectId = projects[0].id;
          console.log("Fetched project ID:", projectId);
          setProjectId(projectId || null);
        } else {
          console.log("No projects found for the user.");
        }
      }
    };

    fetchProjectId();
  }, [supabase]);

  return (
    <form
      className="flex items-center gap-2"
      action={async (formData) => {
        const url = formData.get("url") as string;

        if (!url || !url.replace(/\s+/g, "")) {
          return toast.error("URL can't be empty.");
        }

        toast.success("We're adding a new source...hang tight!");

        await scrape(url);
        await supabase
          .from("urls")
          .update({
            status: "done",
          })
          .match({ url, project_id: projectId });

        router.refresh();

        toast.success("A new source has been added!");
      }}
    >
      <Input type="text" name="url" placeholder="https://www.example.com" />
      <CrawlButton />
    </form>
  );
};
