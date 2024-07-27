"use server";

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

  // await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/scrape`, {
  await axios.post(`http://localhost:3000/api/scrape`, {
    url,
    chatbotInternalId: project![0].internal_id,
  });

  return {
    success: true,
  };
};
