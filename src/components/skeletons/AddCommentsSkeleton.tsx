import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const AddCommentsSkeleton = () => {
  return (
    <Card className="pt-6 pb-8 border-none card">
      <CardContent>
        <Skeleton className="h-6 w-32 mb-6" />
        <Skeleton className="h-32 w-full mb-4" />
        <div className="flex justify-between items-center mt-4">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-10 w-32" />
        </div>
      </CardContent>
    </Card>
  );
};

export default AddCommentsSkeleton;
