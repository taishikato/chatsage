import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  type Source,
  FetchedSourcesSection,
} from "./_components/fetched-sources-section";
import { createClient } from "@/lib/supabase/server";
import { CrawlForm } from "./_components/crawl-form";

export default async function SourcesPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: projectAndUrls } = await supabase
    .from("projects")
    .select("id, urls(id, url, status)")
    .match({
      user_auth_id: user!.id,
    });

  // const [crawlUrl, setCrawlUrl] = useState("");
  // const [sitemapUrl, setSitemapUrl] = useState("");

  // const handleFetchLinks = () => {
  //   console.log("Fetching links from:", crawlUrl);
  //   // Implement link fetching logic here
  // };

  // const handleLoadSitemap = () => {
  //   console.log("Loading sitemap from:", sitemapUrl);
  //   // Implement sitemap loading logic here
  // };

  return (
    <div>
      <Card className="p-6">
        <CardContent>
          <h1 className="text-2xl font-bold mb-6">Sources</h1>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Crawl</h2>
            <CrawlForm />
          </section>

          {/* <div className="text-center text-muted-foreground my-4">OR</div>

          <section>
            <h2 className="text-lg font-semibold mb-4">Submit Sitemap</h2>
            <div className="flex items-center gap-2">
              <Input
                type="text"
                // value={sitemapUrl}
                // onChange={(e) => setSitemapUrl(e.target.value)}
                placeholder="https://www.example.com/sitemap.xml"
              />
              <Button>Load additional sitemap</Button>
            </div>
          </section> */}

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
