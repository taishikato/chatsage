import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

const steps = [
  {
    title: "1. Add your data",
    subtitle: "Enter the URL of your website or the URL of your sitemap.",
    video: "/videos/how-it-works-add-data.mp4",
  },
  {
    title: "2. Embed your bot.",
    subtitle:
      "Make your chatbot public and embed your own custom bot on your website.",
    video: "/videos/how-it-works-embedding.mp4",
  },
];
export const HowItWorks = () => {
  return (
    <section className="py-24 sm:py-32 mx-auto max-w-7xl px-6">
      <h2 className="text-base font-semibold leading-7 text-indigo-600 md:text-center">
        How It Works — Supa easy!
      </h2>
      <p className="mt-6 text-lg leading-8 text-secondary-foreground/70 md:text-center">
        Fetch your data, train your bot, and embed it on your website.
      </p>

      <div className="space-y-20 mt-16 sm:mt-20 lg:mt-24">
        {steps.map((step) => {
          return (
            <div
              key={step.title}
              className="w-full max-w-6xl mx-auto flex items-center justify-between flex-col md:flex-row md:odd:flex-row-reverse gap-y-10"
            >
              <div className="max-w-[400px] space-y-3">
                <h3 className="text-2xl font-bold text-primary">
                  {step.title}
                </h3>
                <p className="text-secondary-foreground/70">{step.subtitle}</p>
              </div>

              <div className="w-full md:w-[500px] -m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl">
                <video
                  autoPlay
                  playsInline
                  loop
                  src={step.video}
                  className="w-full rounded-xl lg:rounded-2xl"
                ></video>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex md:justify-center mt-16 sm:mt-20 lg:mt-24">
        <Link
          href="/login"
          className={cn(
            buttonVariants({ size: "lg" }),
            "hover:scale-105 transition-transform"
          )}
        >
          Get started for free
        </Link>
      </div>
    </section>
  );
};
