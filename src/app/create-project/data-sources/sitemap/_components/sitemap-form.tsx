"use client";

import { Input } from "@/components/ui/input";
import { SitemapButton } from "./sitemap-button";
import { useFormState } from "react-dom";
import { findSites } from "@/actions/find-sites";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useState } from "react";
import { scrape } from "@/actions/scrape";
import { Button } from "@/components/ui/button";

const initialState = {
  sites: [],
};

export const SitemapForm = () => {
  const [scraping, setScraping] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [state, formAction] = useFormState(findSites, initialState);

  const handleSelectionChange = (newSelectedRows: string[]) => {
    setSelectedRows(newSelectedRows);
  };

  return (
    <>
      <form className="flex w-full items-center space-x-2" action={formAction}>
        <Input
          type="url"
          name="url"
          id="url"
          className="flex-1"
          placeholder="htttps://www.yourdomain.com/sitemap.xml"
          defaultValue="https://www.onseninsider.com/sitemap.xml"
        />
        <SitemapButton />
      </form>
      {state.sites.length > 0 && (
        <div className="mt-10">
          <div className="mb-4 flex items-center gap-x-4">
            <div className="text-xl font-bold">Found sources</div>
            <form
              action={async () => {
                setScraping(true);

                for (const site of selectedRows) {
                  console.log(`scraping ${site}...`);

                  await scrape(site);
                }

                setScraping(false);
              }}
            >
              <Button
                size="sm"
                type="submit"
                disabled={scraping || selectedRows.length === 0}
              >
                Scrape the selected sources
              </Button>
            </form>
          </div>
          <DataTable
            columns={columns}
            data={state.sites.map((site) => ({ url: site }))}
            onSelectionChange={handleSelectionChange}
          />
        </div>
      )}
    </>
  );
};
