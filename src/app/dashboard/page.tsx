import { createAdminClient } from "@/lib/supabase/supabaseAdminClient";
import { ScrapingForm } from "./_components/scraping-form";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const supabase = createAdminClient();

  const { data, error } = await supabase.from("urls").select("url");

  console.log({ data });
  if (error) console.error(error.message);

  return (
    <main className="max-w-xl mx-auto">
      <h1>Dashboard</h1>
      <ScrapingForm />
      <h2 className="font-bold">Scraped sources</h2>
      {data?.map((d) => {
        return <div key={d.url}>{d.url}</div>;
      })}
    </main>
  );
}
