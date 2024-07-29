"use server";

import { APP_URL } from "@/lib/consts";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

import axios from "redaxios";

export const scrape = async (url: string) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const cookieStore = cookies();

  const { data: project } = await supabase
    .from("chatbots")
    .select("internal_id")
    .match({
      user_auth_id: user!.id,
    });

  try {
    await axios.post(
      `${APP_URL}/api/protected/scrape`,
      {
        url,
        chatbotInternalId: project![0].internal_id,
      },
      {
        headers: {
          Cookie: cookieStore.toString(),
        },
      }
    );
  } catch (err) {
    console.error(err);
  }

  return {
    success: true,
  };
};
