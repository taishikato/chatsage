import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";
import { IconGitHub } from "@/app/(chat)/chatbot-embedding/[id]/components/ui/icons";
import { APP_URL } from "@/lib/consts";
import { Input } from "./ui/input";

export const Hero = () => {
  return (
    <div className="relative isolate overflow-hidden bg-white">
      <svg
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
      >
        <defs>
          <pattern
            x="50%"
            y={-1}
            id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
            width={200}
            height={200}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <rect
          fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
          width="100%"
          height="100%"
          strokeWidth={0}
        />
      </svg>
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 grid grid-cols-1 items-center gap-y-12 lg:grid-cols-2 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
          <div className="mt-24 sm:mt-32 lg:mt-16 space-y-3">
            <span className="rounded-full bg-indigo-600/10 px-3 py-1 text-sm font-semibold leading-6 text-indigo-600 ring-1 ring-inset ring-indigo-600/10">
              Cloud version is coming soon!
            </span>
            <div className="flex items-center">
              <Input className="rounded-xl py-1 h-9" placeholder="elon@x.com" />
              <Button size="sm" variant="secondary" className="ml-2 rounded-xl">
                Get notifided
              </Button>
            </div>
          </div>
          <h1 className="mt-10 text-4xl font-bold tracking-tight text-primary sm:text-6xl">
            24/7 Customer Service for your website
          </h1>
          <p className="mt-6 text-lg leading-8 text-secondary-foreground">
            Deploy AI-driven chatbots to handle customer inquiries instantly and
            efficiently, improving response times.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <a
              target="_blank"
              href="https://github.com/taishikato/chatsage"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "mr-8 items-center"
              )}
            >
              <IconGitHub className="mr-2" />
              <span>Star on GitHub</span>
            </a>
          </div>
        </div>
        <div className="aspect-[1/2] sm:aspect-[3/4] mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32 flex-1">
          <iframe
            src={`${APP_URL}/chatbot-embedding/7003ad0e-de27-44d3-b648-c2cd3cac01b7`}
            className="rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};
