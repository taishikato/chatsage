import { getEnvVariable } from "@/app/(chat)/chatbot-embedding/[id]/lib/get-env-variable";
import { type Database } from "@/types/supabase";
import { createBrowserClient } from "@supabase/ssr";

export const createClient = () =>
  createBrowserClient<Database>(
    getEnvVariable("NEXT_PUBLIC_SUPABASE_URL"),
    getEnvVariable("NEXT_PUBLIC_SUPABASE_ANON_KEY")
  );
