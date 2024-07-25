"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const saveProjectName = async (formData: FormData) => {
  const name = formData.get("project-name") as string;

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  await supabase.from("chatbots").insert({
    name,
    user_auth_id: user.id,
  });

  redirect("/create-project/data-sources");
};
