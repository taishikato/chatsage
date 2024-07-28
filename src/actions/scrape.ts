"use server";

import { APP_URL } from "@/lib/consts";
import { createClient } from "@/lib/supabase/server";

import axios from "redaxios";

export const scrape = async (url: string) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: project } = await supabase
    .from("chatbots")
    .select("internal_id")
    .match({
      user_auth_id: user!.id,
    });

  await axios.post(`${APP_URL}/api/scrape`, {
    url,
    chatbotInternalId: project![0].internal_id,
  });

  return {
    success: true,
  };
};
