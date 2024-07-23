"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./_components/columns";

export default function SourcesPage() {
  const [crawlUrl, setCrawlUrl] = useState("");
  const [sitemapUrl, setSitemapUrl] = useState("");

  const handleFetchLinks = () => {
    console.log("Fetching links from:", crawlUrl);
    // Implement link fetching logic here
  };

  const handleLoadSitemap = () => {
    console.log("Loading sitemap from:", sitemapUrl);
    // Implement sitemap loading logic here
  };

  const handleSelectionChange = (newSelectedRows: string[]) => {
    // setSelectedRows(newSelectedRows);
  };

  return (
    <div>
      <Card className="p-6">
        <CardContent>
          <h1 className="text-2xl font-bold mb-6">Sources</h1>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Crawl</h2>
            <div className="flex items-center gap-2">
              <Input
                type="text"
                value={crawlUrl}
                onChange={(e) => setCrawlUrl(e.target.value)}
                placeholder="https://www.example.com"
              />
              <Button onClick={handleFetchLinks}>Fetch more links</Button>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              This will crawl all the links starting with the URL (not including
              files on the website).
            </p>
          </section>

          <div className="text-center text-gray-500 my-4">OR</div>

          <section>
            <h2 className="text-lg font-semibold mb-4">Submit Sitemap</h2>
            <div className="flex items-center gap-2">
              <Input
                type="text"
                value={sitemapUrl}
                onChange={(e) => setSitemapUrl(e.target.value)}
                placeholder="https://www.example.com/sitemap.xml"
              />
              <Button onClick={handleLoadSitemap}>
                Load additional sitemap
              </Button>
            </div>
          </section>

          <Separator className="my-12" />
          <h2 className="text-lg font-semibold mb-4">Fetched sources</h2>
          <DataTable
            columns={columns}
            data={[{ url: "example.com" }]}
            onSelectionChange={handleSelectionChange}
          />
        </CardContent>
      </Card>
    </div>
  );
}
