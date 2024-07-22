import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="bg-muted/40 min-h-[calc(100vh-56px)] flex items-center justify-center">
      <Loader className="animate-spin size-8" />
    </div>
  );
}
