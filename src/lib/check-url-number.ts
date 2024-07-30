import { createClient } from "./supabase/server";

const sourceLimit = 10;

export const checkUrlNumber = async (chatbotInternalId: string) => {
  const supabase = createClient();

  const { count } = await supabase
    .from("urls")
    .select("id", { count: "exact" })
    .match({
      chatbot_internal_id: chatbotInternalId,
    });

  if (count && count >= sourceLimit) {
    throw new Error(
      `You have reached the maximum limit of ${sourceLimit} sources. Sorry Chatsage is still in beta and we're working on it!`
    );
  }

  return;
};
