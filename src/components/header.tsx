"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { APP_NAME } from "@/lib/consts";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button, buttonVariants } from "./ui/button";
import { MoveRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { IconGitHub } from "@/app/(chat)/chatbot-embedding/[id]/components/ui/icons";

export const Header = () => {
  const supabase = createClient();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUserStatus = async () => {
      const { data } = await supabase.auth.getUser();

      if (data?.user) setIsLoggedIn(true);
    };

    checkUserStatus();
  }, []);

  return (
    <header className="bg-background border-b h-[64px] sticky top-0 inset-x-0 z-10 py-2 items-center flex w-full">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl w-full items-center justify-between gap-x-6 px-6"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center">
            <img
              alt={`${APP_NAME}'s logo`}
              src="/logo.webp"
              className="size-8 rounded-md mr-2"
            />
            <span className="text-lg font-semibold">{APP_NAME}</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end gap-x-6">
          <a
            target="_blank"
            href="https://github.com/taishikato/chatsage"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "items-center gap-x-2 lg:leading-6 hidden lg:flex"
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
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center gap-x-6">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center">
              <img
                className="h-8 w-auto rounded-md mr-2"
                alt={`${APP_NAME}'s logo`}
                src="/logo.webp"
              />
              <span className="text-lg font-semibold">{APP_NAME}</span>
            </Link>
            {!isLoggedIn ? (
              <Button asChild size="sm" className="ml-auto rounded-lg">
                <Link href="/login">
                  Login
                  <MoveRight className="ml-2 size-4" />
                </Link>
              </Button>
            ) : (
              <Button asChild size="sm" className="ml-auto rounded-lg">
                <Link href="/dashboard">
                  Dashboard
                  <MoveRight className="ml-2 size-4" />
                </Link>
              </Button>
            )}

            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="py-6">
                <a
                  href=""
                  className="-mx-3 flex items-center gap-x-2 rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-primary hover:bg-secondary"
                >
                  <Star className="size-4" /> on <IconGitHub />
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};
