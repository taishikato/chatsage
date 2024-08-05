"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export const updateChatbotName = async (projectName: string) => {
  const supabase = createClient();
  const {
    data: { user },
    error: userFetchError,
  } = await supabase.auth.getUser();

  if (!user || userFetchError) {
    return {
      success: false,
      needLogin: true,
      message: "Failed to fetch user data. Please login again.",
    };
  }

  const { error } = await supabase
    .from("chatbots")
    .update({ name: projectName })
    .match({ user_auth_id: user.id });

  if (error) {
    return {
      success: false,
      needLogin: false,
      message: error.message,
    };
  }

  return {
    success: true,
  };
};

export const updateChatbotVisibility = async (chatbotVisibility: string) => {
  const supabase = createClient();
  const {
    data: { user },
    error: userFetchError,
  } = await supabase.auth.getUser();

  if (!user || userFetchError) {
    return {
      success: false,
      needLogin: true,
      message: "Failed to fetch user data. Please login again.",
    };
  }

  const { error } = await supabase
    .from("chatbots")
    .update({ is_public: chatbotVisibility === "public" })
    .match({ user_auth_id: user.id });

  if (error) {
    return {
      success: false,
      needLogin: false,
      message: error.message,
    };
  }

  return {
    success: true,
  };
};

export const updateAISettings = async (formData: FormData) => {
  const temperature = formData.get("temperature") as number | null;

  if (!temperature) {
    return {
      success: false,
      message: "temperature can't be empty",
    };
  }

  const numberedTemperature = Number(temperature);

  const supabase = createClient();
  const {
    data: { user },
    error: userFetchError,
  } = await supabase.auth.getUser();

  if (!user || userFetchError) {
    return {
      success: false,
      needLogin: true,
      message: "Failed to fetch user data. Please login again.",
    };
  }

  const { error } = await supabase
    .from("chatbots")
    .update({ temperature: numberedTemperature })
    .match({ user_auth_id: user.id });

  if (error) {
    return {
      success: false,
      needLogin: false,
      message: error.message,
    };
  }

  revalidatePath("/dashboard/settings");

  return {
    success: true,
  };
};
