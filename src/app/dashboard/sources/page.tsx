import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  type Source,
  FetchedSourcesSection,
} from "./_components/fetched-sources-section";
import { createClient } from "@/lib/supabase/server";
import { CrawlForm } from "./_components/crawl-form";
import { SitemapForm } from "./_components/sitemap-form";

export default async function SourcesPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: projectAndUrls } = await supabase
    .from("chatbots")
    .select("internal_id, urls(id, url, status)")
    .match({
      user_auth_id: user!.id,
    });

  console.log({ projectAndUrls });

  return (
    <div>
      <Card className="p-6">
        <CardContent>
          <h1 className="text-2xl font-bold mb-6">Sources</h1>

          <section>
            <h2 className="text-lg font-semibold mb-4">Crawl</h2>
            <CrawlForm />
          </section>

          <div className="w-full my-8 text-center text-muted-foreground">
            OR
          </div>

          <section>
            <h2 className="text-lg font-semibold mb-4">Sitemap</h2>
            <SitemapForm />
          </section>

          <Separator className="my-12" />

          <FetchedSourcesSection
            sources={
              projectAndUrls ? (projectAndUrls[0].urls as Source[]) : null
            }
          />
        </CardContent>
      </Card>
    </div>
  );
}
