import { Toaster } from "sonner";
import { LayoutNav } from "./_components/layout-nav";
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
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="flex min-h-[calc(100vh-64px)] w-full flex-col bg-muted/40">
          <div className="flex w-full flex-col">
            <main className="flex w-full min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-6 bg-muted/40 p-4 md:gap-8 md:py-10">
              <div className="mx-auto grid w-full max-w-7xl md:px-6">
                <h1 className="text-3xl font-semibold">Dashboard</h1>
              </div>
              <div className="mx-auto w-full md:max-w-7xl md:px-6 items-start gap-6 flex flex-col md:flex-row">
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
