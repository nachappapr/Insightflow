import { Skeleton } from "../ui/skeleton";
import { Avatar } from "../ui/avatar";

const CommentsSkeleton = () => {
  return (
    <div className="grid grid-cols-[40px,2fr,1fr] gap-4 items-start md:gap-x-8 md:gap-y-4">
      <Avatar className="h-10 w-10">
        <Skeleton className="h-full w-full rounded-full" />
      </Avatar>
      <div>
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-4 w-16" />
      </div>
      <div className="justify-self-end">
        <Skeleton className="h-4 w-12" />
      </div>
      <div className="md:col-start-2 col-span-full">
        <Skeleton className="h-20 w-full" />
      </div>
    </div>
  );
};

export default CommentsSkeleton;
