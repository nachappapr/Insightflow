import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import CommentsSkeleton from "./CommentsSkeleton";

const CommentListSkeleton = () => {
  return (
    <Card className="border-none my-6 card">
      <CardHeader>
        <CardTitle className="h3-bold text-text-primary">
          <Skeleton className="h-6 w-32" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        {[1].map((index) => (
          <div
            key={index}
            className="border-b border-text-light/25 last:border-b-0 mb-4"
          >
            <CommentsSkeleton />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default CommentListSkeleton;
