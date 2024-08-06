import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="bg-muted/40 min-h-[calc(100vh-64px)] flex items-center justify-center w-full">
      <Loader className="animate-spin size-8" />
    </div>
  );
}
