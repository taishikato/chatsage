"use client";

import Link from "next/link";
import { Button } from "./ui/button";

export const Header = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return (
    <header className="border-b h-[56px]">
      <div className="max-w-7xl mx-auto flex items-center px-6 py-2">
        <h1 className="mr-auto">
          <Link href="/">SupaChat</Link>
        </h1>
        {!isLoggedIn && (
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div>
    </header>
  );
};
