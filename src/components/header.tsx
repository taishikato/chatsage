"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { logout } from "@/actions/logout";

export const Header = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return (
    <header>
      {isLoggedIn ? (
        <form>
          <Button formAction={logout}>Logout</Button>
        </form>
      ) : (
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
      )}
    </header>
  );
};
