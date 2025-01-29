import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const RoadMapSummarySkeleton = () => {
  return (
    <Card className="w-[15.9375rem] max-w-[15.9375rem] shadow-none">
      <CardContent className="flex flex-col gap-6 p-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-20 rounded-md" />
          <Skeleton className="h-4 w-12 rounded-md" />
        </div>
        <div className="flex flex-col items-start gap-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex items-center w-full gap-4">
              <Skeleton className="h-2 w-2 rounded-full" />
              <Skeleton className="h-4 w-24  rounded-md" />
              <Skeleton className="h-4 w-8  rounded-md ml-auto" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RoadMapSummarySkeleton;
