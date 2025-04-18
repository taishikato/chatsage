import { Loader } from "lucide-react";

export default async function Loading() {
  return (
    <div className="w-full h-dvh flex items-center justify-center">
      <Loader className="size-6 animate-spin" />
    </div>
  );
}
