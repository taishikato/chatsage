import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { APP_NAME } from "@/lib/consts";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${APP_NAME} | 24/7 Customer Service for your website`,
  description:
    "Deploy AI-driven chatbots to handle customer inquiries instantly and efficiently, improving response times.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "min-h-screen flex flex-col")}>
        {children}
      </body>
    </html>
  );
}
