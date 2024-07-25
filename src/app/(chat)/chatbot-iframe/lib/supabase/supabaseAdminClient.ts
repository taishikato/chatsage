import { type Database } from "@/types/supabase";
import { createClient } from "@supabase/supabase-js";

export const createAdminClient = () => {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.SUPABASE_SERVICE_TOKEN as string
  );
};
