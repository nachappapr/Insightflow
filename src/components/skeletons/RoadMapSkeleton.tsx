import { Card, CardContent } from "../ui/card";

const RoadMapSummarySkeleton = () => {
  return (
    <Card className="w-[15.9375rem] max-w-[15.9375rem] shadow-none">
      <CardContent className="flex flex-col gap-6 p-6">
        <div className="flex justify-between items-center">
          <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="flex flex-col items-start gap-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex items-center w-full gap-4">
              <div className="h-2 w-2 rounded-full bg-gray-200 animate-pulse" />
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-8 bg-gray-200 rounded animate-pulse ml-auto" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RoadMapSummarySkeleton;
