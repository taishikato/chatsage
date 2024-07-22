"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    name: "Log",
    path: "/dashboard",
  },
  {
    name: "Data sources",
    path: "/dashboard/data-sources",
  },
  {
    name: "Settings",
    path: "/dashboard/settings",
  },
];

export const LayoutNav = () => {
  const path = usePathname();

  return (
    <nav
      className="grid gap-4 text-sm text-muted-foreground"
      x-chunk="dashboard-04-chunk-0"
    >
      {links.map((link) => {
        return (
          <Link
            key={link.path}
            href={link.path}
            className={cn(
              link.path === path ? "font-semibold text-primary" : null
            )}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
};
