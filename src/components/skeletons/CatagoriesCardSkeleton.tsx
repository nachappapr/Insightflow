import { Card, CardContent } from "../ui/card";

const CategoriesCardSkeleton = () => {
  // Generate a random number of skeleton badges between 5 and 8
  const skeletonCount = Math.floor(Math.random() * 4) + 5;

  return (
    <Card className="w-[15.9375rem] max-w-[15.9375rem] shadow-none">
      <CardContent className="flex flex-wrap gap-2 p-6">
        {[...Array(skeletonCount)].map((_, index) => (
          <div
            key={index}
            className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default CategoriesCardSkeleton;
