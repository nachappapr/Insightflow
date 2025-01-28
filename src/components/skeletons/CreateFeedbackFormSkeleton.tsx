import { Skeleton } from "@/components/ui/skeleton";
import NewFeedbackIcon from "../icons/NewFeedbackIcon";

const CreateFeedbackFormSkeleton = () => {
  return (
    <div className="bg-white rounded-lg relative mt-10">
      <div className="absolute top-[-26px] left-6">
        <NewFeedbackIcon />
      </div>
      <div className="p-10">
        <Skeleton className="h-8 w-3/4 mb-6" />
        <div className="flex flex-col justify-center gap-6">
          {/* Title Input */}
          <div className="flex flex-col gap-2">
            <Skeleton className="h-6 w-1/4 mb-1" />
            <Skeleton className="h-4 w-1/2 mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Category Select */}
          <div className="flex flex-col gap-2">
            <Skeleton className="h-6 w-1/4 mb-1" />
            <Skeleton className="h-4 w-1/2 mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Status Select */}
          <div className="flex flex-col gap-2">
            <Skeleton className="h-6 w-1/4 mb-1" />
            <Skeleton className="h-4 w-1/2 mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Description Textarea */}
          <div className="flex flex-col gap-2">
            <Skeleton className="h-6 w-1/4 mb-1" />
            <Skeleton className="h-4 w-1/2 mb-2" />
            <Skeleton className="h-32 w-full" />
          </div>

          {/* Buttons */}
          <div className="flex flex-col-reverse justify-center gap-4 mt-4 md:flex-row md:justify-end">
            <Skeleton className="h-10 w-full md:w-32" />
            <Skeleton className="h-10 w-full md:w-32" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFeedbackFormSkeleton;
