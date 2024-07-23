"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { cn } from "@/lib/utils";

export type Scraping = {
  status: string | null;
  url: string;
};

export const columns: ColumnDef<Scraping>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;

      return (
        <span
          className={cn(
            "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium",
            status === "done" && "bg-green-100 text-green-700",
            status === "waiting" && "bg-yellow-100 text-yellow-800",
            status === "processing" && "bg-blue-100 text-blue-700"
          )}
        >
          {status}
        </span>
      );
    },
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
