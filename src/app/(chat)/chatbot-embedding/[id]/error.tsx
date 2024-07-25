"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="w-full h-ful flex flex-col items-center justify-center space-y-3">
      <h2 className="text-xl font-semibold text-secondary-foreground">
        Something went wrong!
      </h2>
      <Button onClick={() => reset()}>Try again</Button>
    </main>
  );
}
