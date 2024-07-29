"use client";

import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { APP_NAME } from "@/lib/consts";
import { MoveRight, Star } from "lucide-react";
import { IconGitHub } from "@/app/(chat)/chatbot-embedding/[id]/components/ui/icons";
import { cn } from "@/lib/utils";

export const Header = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return (
    <header className="border-b h-[64px]">
      <div className="max-w-7xl mx-auto flex items-center px-6 py-2 h-full">
        <h1 className="mr-auto">
          <Link href="/" className="flex items-center">
            <img
              alt={`${APP_NAME}'s logo`}
              src="/logo.webp"
              className="size-6 rounded-md mr-2"
            />
            <span className="text-lg font-semibold">{APP_NAME}</span>
          </Link>
        </h1>
        <a
          target="_blank"
          href="https://github.com/taishikato/chatsage"
          className={cn(
            buttonVariants({ variant: "secondary" }),
            "mr-4 items-center gap-x-2"
          )}
        >
          <Star className="size-4" /> on <IconGitHub />
        </a>
        {!isLoggedIn ? (
          <Button asChild>
            <Link href="/login">
              Login
              <MoveRight className="ml-2 size-4" />
            </Link>
          </Button>
        ) : (
          <Button asChild>
            <Link href="/dashboard">
              Dashboard
              <MoveRight className="ml-2 size-4" />
            </Link>
          </Button>
        )}
      </div>
    </header>
  );
};
