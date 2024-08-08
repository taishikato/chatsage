import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  type Source,
  FetchedSourcesSection,
} from "./_components/fetched-sources-section";
import { createClient } from "@/lib/supabase/server";
import { CrawlForm } from "./_components/crawl-form";
import { SitemapForm } from "./_components/sitemap-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// to handle scraping server actions
export const maxDuration = 30;

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

  return (
    <div className="w-full">
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="website" className="flex-1">
            Website
          </TabsTrigger>
          <TabsTrigger value="qanda" className="flex-1">
            Q&A
          </TabsTrigger>
        </TabsList>
        <TabsContent value="website">
          <Card className="">
            <CardHeader>
              <CardTitle>Website</CardTitle>
            </CardHeader>
            <CardContent>
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
        </TabsContent>
        <TabsContent value="qanda">
          <Card className="">
            <CardHeader>
              <CardTitle>Q&A</CardTitle>
            </CardHeader>
            <CardContent>
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
