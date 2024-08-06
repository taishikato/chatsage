"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    name: "Chat logs",
    path: "/dashboard",
  },
  {
    name: "Sources",
    path: "/dashboard/sources",
  },
  {
    name: "Settings",
    path: "/dashboard/settings",
  },
];

export const LayoutNav = () => {
  const path = usePathname();

  return (
    <nav className="gap-4 text-sm text-muted-foreground w-full md:w-[180px] lg:w-[250px] flex shrink-0 flex-row md:flex-col">
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
