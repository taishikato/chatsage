import { Header } from "@/components/header";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import Script from "next/script";

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
          src={`${process.env.NEXT_PUBLIC_APP_URL}/api/embedding?chatbotId=58312165-6173-413b-8b41-3ef8e5047880`}
          // src={`http://localhost:3000/api/embedding?chatbotId=58312165-6173-413b-8b41-3ef8e5047880`}
        />
      </main>
    </>
  );
}
