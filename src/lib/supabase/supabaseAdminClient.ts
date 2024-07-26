import { getEnvVariable } from "@/app/(chat)/chatbot-embedding/[id]/lib/get-env-variable";
import { type Database } from "@/types/supabase";
import { createClient } from "@supabase/supabase-js";

export const createAdminClient = () => {
  return createClient<Database>(
    getEnvVariable("NEXT_PUBLIC_SUPABASE_URL"),
    getEnvVariable("SUPABASE_SERVICE_TOKEN")
  );
};
