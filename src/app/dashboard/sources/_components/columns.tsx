"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Scraping = {
  status: string | null;
  url: string;
};

export const columns: ColumnDef<Scraping>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "url",
    header: "URL",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      // const payment = row.original;

      return (
        <Button variant="ghost" size="icon">
          <Trash className="size-4 text-red-400" />
        </Button>
      );
    },
  },
];
