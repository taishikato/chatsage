"use client";

import { Input } from "@/components/ui/input";
import { SitemapButton } from "./sitemap-button";
import { useFormState } from "react-dom";
import { findSites } from "@/actions/find-sites";
import { DataTable } from "./data-table";
import { columns } from "./columns";

const initialState = {
  sites: [],
};

export const SitemapForm = () => {
  const [state, formAction] = useFormState(findSites, initialState);

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
          <DataTable
            columns={columns}
            data={state.sites.map((site) => ({ url: site }))}
          />
        </div>
      )}
    </>
  );
};
