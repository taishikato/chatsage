"use client";

import { Input } from "@/components/ui/input";
import { ScrapingButton } from "./scraping-button";
import { scrape } from "@/actions/scrape";
import { findSites } from "@/actions/find-sites";
import { useFormState } from "react-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SiteList } from "./site-list";
import { Loader } from "lucide-react";

const initialState = {
  sites: [],
};

export const ScrapingForm = () => {
  const [state, formAction] = useFormState(findSites, initialState);
  const [selectAll, setSelectAll] = useState(true);
  const [scraping, setScraping] = useState(false);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
  };

  return (
    <div>
      <form
        className="flex w-full max-w-sm items-center space-x-2"
        action={formAction}
      >
        <Input
          type="url"
          name="url"
          id="url"
          placeholder="URL"
          defaultValue="https://www.onseninsider.com"
        />
        <ScrapingButton />
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

                await scrape(site);
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
    </div>
  );
};
