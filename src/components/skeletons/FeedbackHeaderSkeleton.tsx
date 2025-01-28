import { Button } from "../ui/button";

const FeedbackHeaderSkeleton = () => {
  return (
    <div>
      <div className="w-full flex items-center justify-between px-3 gap-2 min-h-[5rem] max-h-[5rem] bg-navy md:p-6 md:rounded-lg">
        <div className="flex gap-4 items-center">
          <div className="hidden md:flex gap-9 items-center">
            <div className="w-8 h-8 bg-white/20 rounded-full animate-pulse" />
            <div className="h-8 w-40 bg-white/20 rounded animate-pulse hidden md:block" />
          </div>
          <div className="w-32 h-10 bg-white/20 rounded animate-pulse" />
        </div>
        <Button variant="primaryAction" disabled className="opacity-50">
          Add Feedback
        </Button>
      </div>
    </div>
  );
};

export default FeedbackHeaderSkeleton;
