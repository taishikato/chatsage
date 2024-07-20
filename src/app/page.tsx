import Link from "next/link";
import Script from "next/script";

export default function Home() {
  return (
    <main>
      <header>
        <Link href="/dashboard">dashboard</Link>
      </header>
      <h1>SupaChat</h1>
      <Script async defer src="/widget.js" />
    </main>
  );
}
