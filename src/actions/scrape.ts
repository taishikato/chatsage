"use server";

import { APP_URL } from "@/lib/consts";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

import axios from "redaxios";

export const scrape = async (url: string | null) => {
  if (!url) {
    return {
      success: false,
      error: "URL is required",
    };
  }

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

  try {
    const cookieStore = cookies();
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

    return {
      success: true,
    };
  } catch (err) {
    console.error(err);

    const errorMessage = (err as any).data
      ? // redaxiso error type
        (err as { data: { message: string } }).data.message
      : (err as Error).message;

    return {
      success: false,
      message: errorMessage,
    };
  }
};
