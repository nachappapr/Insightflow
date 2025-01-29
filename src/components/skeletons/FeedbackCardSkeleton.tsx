import { Card } from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";

const FeedbackCardSkeleton = () => {
  return (
    <Card className="w-full card overflow-hidden shadow-none">
      <div className="flex flex-col-reverse md:flex-row gap-4 p-4">
        {/* Vote Column */}
        <Skeleton className="w-16 h-16 rounded-md animate-pulse self-start" />

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* User Info */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Skeleton className="w-6 h-6 bg-gray-200 rounded-full" />
              <Skeleton className="w-24 h-4 bg-gray-200 rounded" />
            </div>
            <Skeleton className="w-20 h-4 bg-gray-200 rounded" />
          </div>

          {/* Title and Description */}
          <Skeleton className="w-3/4 h-6 bg-gray-200 rounded mb-2" />
          <Skeleton className="w-full h-16 bg-gray-200 rounded  mb-4" />

          {/* Footer */}
          <div className="flex items-center justify-between">
            <Skeleton className="w-20 h-6 bg-gray-200 rounded" />
            <Skeleton className="w-12 h-6 bg-gray-200 rounded" />
          </div>
        </div>
      </div>

      {/* Engagement Progress Bar */}
      <div className="h-1 bg-slate-100">
        <div className="h-full w-1/2 bg-gray-200 animate-pulse" />
      </div>
    </Card>
  );
};

export default FeedbackCardSkeleton;
