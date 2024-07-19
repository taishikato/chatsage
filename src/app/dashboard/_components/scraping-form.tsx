"use client";

import { Input } from "@/components/ui/input";
import { ScrapingButton } from "./scraping-button";
// import { scrape } from "@/actions/scrape";
// import Sitemapper from "sitemapper";
import { findSites } from "@/actions/find-sites";
import { useFormState } from "react-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SiteList } from "./site-list";

const initialState = {
  sites: [],
};

export const ScrapingForm = () => {
  const [state, formAction] = useFormState(findSites, initialState);
  const [selectAll, setSelectAll] = useState(true);

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
          <form>
            <ul>
              {state.sites.map((s) => {
                return <SiteList key={s} site={s} selectAll={selectAll} />;
              })}
            </ul>
            <Button>Scrape the selected sources</Button>
          </form>
        </div>
      )}
    </div>
  );
};
