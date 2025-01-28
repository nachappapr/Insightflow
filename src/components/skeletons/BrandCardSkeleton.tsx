import { Card, CardHeader } from "../ui/card";

const BrandCardSkeleton = () => {
  return (
    <Card className="bg-gradient-to-r from-purple-500 to-pink-500 w-[15.9375rem] max-w-[15.9375rem] px-6 pt-14 pb-6 shadow-none">
      <CardHeader className="p-0 space-y-4">
        <div className="w-[30px] h-[30px] rounded-full bg-white/20 animate-pulse" />
        <div className="h-7 w-3/4 bg-white/20 rounded animate-pulse" />
        <div className="h-5 w-1/2 bg-white/20 rounded animate-pulse" />
      </CardHeader>
    </Card>
  );
};

export default BrandCardSkeleton;
