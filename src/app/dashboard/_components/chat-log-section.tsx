"use client";

import type { Tables } from "@/types/supabase";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { SkeletonLoading } from "./skeleton-loading";

export const ChatLogSection = () => {
  const supabase = createClient();

  const [chatLogs, setChatLogs] = useState<Tables<"chat_logs">[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchChatLogs = async () => {
      setLoading(true);

      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) {
          console.error("Error fetching user:", userError);
          setLoading(false);
          return;
        }

        // Get the project ID for the logged-in user
        const { data: projectData, error: projectError } = await supabase
          .from("chatbots")
          .select("id")
          .eq("user_auth_id", user!.id)
          .single();

        if (projectError) {
          console.error("Error fetching project:", projectError);
          setLoading(false);
          return;
        }

        // Fetch chat logs for the user's project
        const { data, error } = await supabase
          .from("chat_logs")
          .select("*")
          .match({ chatbot_id: projectData.id })
          .order("created_at", { ascending: true });

        if (error) {
          console.error("Error fetching chat logs:", error);
          setLoading(false);
          return;
        }

        setChatLogs(data);

        console.log("Fetched chat logs:", data);
        setLoading(false);
        // TODO: Update state with fetched data
      } catch (error) {
        console.error("Error in fetchChatLogs:", error);
        setLoading(false);
      }
    };

    fetchChatLogs();
  }, []);

  if (loading) return <SkeletonLoading />;

  if (chatLogs.length === 0)
    return (
      <div className="flex items-center justify-center h-20">No chats yet</div>
    );

  return (
    <>
      <div className="text-sm">
        {chatLogs.map((log) => {
          return (
            <div
              key={log.internal_id}
              className="space-y-3 p-4 rounded-xl cursor-pointer hover:bg-secondary"
            >
              {log.role === "user" ? (
                <div className="text-secondary-foreground/50 flex items-center justify-between">
                  <span>{log.message}</span>
                  <time>
                    {new Date(log.created_at).toLocaleString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </time>
                </div>
              ) : (
                <div>{log.message}</div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};
