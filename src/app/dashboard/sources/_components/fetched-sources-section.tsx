"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { Tables } from "@/types/supabase";

export type Source = Tables<"urls">;

export const FetchedSourcesSection = ({
  sources,
}: {
  sources: Source[] | null;
}) => {
  const handleSelectionChange = (newSelectedRows: string[]) => {
    // setSelectedRows(newSelectedRows);
  };
  return (
    <>
      <h2 className="text-lg font-semibold mb-4">Fetched sources</h2>

      {sources ? (
        <DataTable
          columns={columns}
          data={sources.map((source) => {
            return {
              url: source.url,
              status: source.status ?? "waiting",
            };
          })}
          onSelectionChange={handleSelectionChange}
        />
      ) : (
        <div>No sources yet</div>
      )}
    </>
  );
};
