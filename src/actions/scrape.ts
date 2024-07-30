"use server";

import { type AxiosError } from "@/lib/types";
import { checkUrlNumber } from "@/lib/check-url-number";
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
    await checkUrlNumber(project![0].internal_id);

    const cookieStore = cookies();
    await axios.post(
      `${APP_URL}/api/protected/scrape`,
      {
        url,
        chatbotInternalId: project![0].internal_id,
      },
      {
        headers: {
          // i need this to pass supabase cookies for auth inside the scrape endpoint
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
      ? (err as AxiosError).data.message
      : (err as Error).message;

    return {
      success: false,
      message: errorMessage,
    };
  }
};
