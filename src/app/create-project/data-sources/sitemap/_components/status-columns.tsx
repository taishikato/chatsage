"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  url: string;
  status: string;
};

export const statusColumns: ColumnDef<Payment>[] = [
  {
    accessorKey: "url",
    header: "URL",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
