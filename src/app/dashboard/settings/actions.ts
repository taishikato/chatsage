"use server";

import { createClient } from "@/lib/supabase/server";

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
