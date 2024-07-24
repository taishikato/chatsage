import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonLoading = () => {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
      </div>
    </div>
  );
};
