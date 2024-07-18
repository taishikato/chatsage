import Link from "next/link";

export default function Home() {
  return (
    <main>
      <header>
        <Link href="/dashboard">dashboard</Link>
      </header>
      <h1>SupaChat</h1>
    </main>
  );
}
