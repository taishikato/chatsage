"use client";

import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { DeleteButton } from "./delete-button";
import { deleteSource } from "../actions";
import { toast } from "sonner";

export type Scraping = {
  id: number;
  status: string | null;
  url: string;
};

export const columns: ColumnDef<Scraping>[] = [
  {
    accessorKey: "id",
    header: "Id",
    enableHiding: false,
  },
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
      const id = row.getValue("id") as number;

      return (
        <form
          action={async () => {
            const result = await deleteSource(id);

            if (result.success) {
              toast.success("Successfully deleted.");
            } else {
              toast.error(`Error: ${result.message}`);
            }
          }}
        >
          <DeleteButton />
        </form>
      );
    },
  },
];
