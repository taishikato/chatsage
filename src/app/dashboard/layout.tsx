import { Toaster } from "sonner";
import { LayoutNav } from "./_components/layout-nav";
import { createClient } from "@/lib/supabase/server";
import { Header } from "@/components/header";
import { type Metadata } from "next";
import { APP_NAME } from "@/lib/consts";

export const metadata: Metadata = {
  title: `Dashboard | ${APP_NAME}`,
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let isLoggedIn = false;
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  if (data?.user) isLoggedIn = true;

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main className="flex-1">
        <div className="flex min-h-[calc(100vh-64px)] w-full flex-col bg-muted/40">
          <div className="flex w-full flex-col">
            <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-6 bg-muted/40 p-4 md:gap-8 md:py-10">
              <div className="mx-auto grid w-full max-w-6xl gap-2">
                <h1 className="text-3xl font-semibold">Dashbaord</h1>
              </div>
              <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                <LayoutNav />
                {children}
              </div>
            </main>
          </div>
        </div>
      </main>

      <Toaster position="bottom-center" />
    </>
  );
}
