import { Header } from "@/components/header";
import Script from "next/script";
import { APP_URL } from "../lib/consts";
import { Hero } from "@/components/hero";
import { Footer } from "@/components/footer";
import { HowItWorks } from "@/components/how-it-works";
import { CloudNotification } from "@/components/cloud-notification";

export default async function Home() {
  return (
    <>
      <Header />
      <CloudNotification />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <Script
          async
          defer
          src={`${APP_URL}/api/embedding?chatbotId=fe0b09fa-b4b3-4461-a9d5-5e256b87aa83`}
        />
      </main>
      <Footer />
    </>
  );
}
