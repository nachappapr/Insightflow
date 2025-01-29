import { Skeleton } from "../ui/skeleton";

const FeedbackHeaderSkeleton = () => {
  return (
    <div>
      <div className="w-full flex items-center justify-between px-3 gap-2 min-h-[5rem] max-h-[5rem] bg-navy md:p-6 md:rounded-lg">
        <div className="flex gap-4 items-center">
          <div className="hidden md:flex gap-9 items-center">
            <Skeleton className="w-8 h-8 bg-white/20 rounded-full" />
            <Skeleton className="h-8 w-40 bg-white/20 rounded-md hidden md:block" />
          </div>
          <Skeleton className="w-32 h-10 bg-white/20 rounded" />
        </div>
        <Skeleton className="w-32 h-10 bg-white/20 rounded" />
      </div>
    </div>
  );
};

export default FeedbackHeaderSkeleton;
