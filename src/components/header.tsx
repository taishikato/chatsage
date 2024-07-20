"use client";

import { createClient } from "@/lib/supabase/createClientSupabaseClient";
import { Button } from "./ui/button";

export const Header = () => {
  const supabase = createClient();

  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <header>
      <Button onClick={loginWithGoogle}>Login</Button>
    </header>
  );
};
