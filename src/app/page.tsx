import { Header } from "@/components/header";
import "../lib/consts";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import Script from "next/script";
import { APP_URL } from "../lib/consts";

export default async function Home() {
  let isLoggedIn = false;
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  if (data?.user) isLoggedIn = true;

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main className="flex-1">
        <header>
          <Link href="/dashboard">dashboard</Link>
        </header>
        <h1>SupaChat</h1>
        <Script
          async
          defer
          src={`${APP_URL}/api/embedding?chatbotId=7003ad0e-de27-44d3-b648-c2cd3cac01b7`}
        />
      </main>
    </>
  );
}
