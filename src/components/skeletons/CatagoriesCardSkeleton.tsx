import clsx from "clsx";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const CategoriesCardSkeleton = () => {
  // Generate a random number of skeleton badges between 5 and 8
  const skeletonCount = Math.floor(Math.random() * 4) + 5;

  return (
    <Card className="w-[15.9375rem] max-w-[15.9375rem] shadow-none">
      <CardContent className="flex flex-wrap gap-2 p-6">
        {[...Array(skeletonCount)].map((_, index) => (
          <Skeleton
            key={index}
            className={clsx("min-h-4 w-16 rounded-md", {
              "w-12": index <= 3,
              "w-28": index === 4,
            })}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default CategoriesCardSkeleton;
