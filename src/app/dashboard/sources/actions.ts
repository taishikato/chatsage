"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export const deleteSource = async (sourceId: number) => {
  const supabase = createClient();

  try {
    const { data } = await supabase
      .from("urls")
      .select("url, chatbot_internal_id")
      .match({
        id: sourceId,
      });

    // First, we need to delete vector data
    const { error: vectorDeletionError } = await supabase
      .from("vectors")
      .delete()
      .filter("metadata->chatbot_id", "eq", data?.[0].chatbot_internal_id)
      .filter("metadata->>url::text", "eq", data?.[0].url);

    if (vectorDeletionError) {
      throw new Error(vectorDeletionError.message);
    }

    // then, we delete the project data
    await supabase.from("urls").delete().match({
      id: sourceId,
    });

    revalidatePath("/dashboard/sources");

    return {
      success: true,
    };
  } catch (err) {
    return {
      success: false,
      message: (err as Error).message,
    };
  }
};
