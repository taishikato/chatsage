"use client";

import { Input } from "@/components/ui/input";
import { SitemapButton } from "./sitemap-button";
import { useFormState } from "react-dom";
import { findSites } from "@/actions/find-sites";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SiteList } from "./site-list";
import { Loader } from "lucide-react";

const initialState = {
  sites: [],
};

export const SitemapForm = () => {
  const [state, formAction] = useFormState(findSites, initialState);
  const [selectAll, setSelectAll] = useState(true);
  const [scraping, setScraping] = useState(false);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
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
      <h2 className="font-bold">Found sources</h2>
      {state.sites.length > 0 && (
        <div>
          <Button onClick={handleSelectAll}>
            {selectAll ? "Deselect All" : "Select All"}
          </Button>
          <form
            action={async (formData) => {
              const selectedSites = formData.getAll("sites") as string[];
              setScraping(true);

              for (const site of selectedSites) {
                console.log(`scraping ${site}...`);

                // await scrape(site);
              }

              setScraping(false);
            }}
          >
            <ul>
              {state.sites.map((s) => {
                return <SiteList key={s} site={s} selectAll={selectAll} />;
              })}
            </ul>
            <Button type="submit" disabled={scraping}>
              {scraping && <Loader className="size-4 mr-2 animate-spin" />}
              Scrape the selected sources
            </Button>
          </form>
        </div>
      )}
    </>
  );
};
