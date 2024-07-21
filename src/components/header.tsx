"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { logout } from "@/actions/logout";

export const Header = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return (
    <header className="border-b h-[56px]">
      <div className="max-w-7xl mx-auto flex items-center px-6 py-2">
        <h1 className="mr-auto">
          <Link href="/">SupaChat</Link>
        </h1>
        {isLoggedIn ? (
          <form>
            <Button formAction={logout}>Logout</Button>
          </form>
        ) : (
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div>
    </header>
  );
};
