"use client";

import { createClient } from "@/lib/supabase/client";
import { Tables } from "@/types/supabase";
import { useEffect, useState } from "react";

export const ChatLogSection = () => {
  const supabase = createClient();

  const [chatLogs, setChatLogs] = useState<Tables<"chat_logs">[]>([]);

  useEffect(() => {
    const fetchChatLogs = async () => {
      try {
        // Get the logged-in user
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) {
          console.error("Error fetching user:", userError);
          return;
        }

        // Get the project ID for the logged-in user
        const { data: projectData, error: projectError } = await supabase
          .from("projects")
          .select("id")
          .eq("user_auth_id", user!.id)
          .single();

        if (projectError) {
          console.error("Error fetching project:", projectError);
          return;
        }

        // Fetch chat logs for the user's project
        const { data, error } = await supabase
          .from("chat_logs")
          .select("*")
          .eq("project_id", projectData.id)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching chat logs:", error);
          return;
        }

        setChatLogs(data);

        console.log("Fetched chat logs:", data);
        // TODO: Update state with fetched data
      } catch (error) {
        console.error("Error in fetchChatLogs:", error);
      }
    };

    fetchChatLogs();
  }, []);

  return (
    <div className="text-sm">
      <div className="space-y-3 p-4 rounded-xl cursor-pointer hover:bg-secondary">
        <div className="text-secondary-foreground/50 flex items-center justify-between">
          <span>Hi, what is the price?</span>
          <span>4 hours ago</span>
        </div>
        <div>Here is our pricing.</div>
      </div>

      <div className="space-y-3 p-4 rounded-xl cursor-pointer hover:bg-secondary">
        <div className="text-secondary-foreground/50 flex items-center justify-between">
          <span>Hi, what is the price?</span>
          <span>4 hours ago</span>
        </div>
        <div>Here is our pricing.</div>
      </div>
    </div>
  );
};
