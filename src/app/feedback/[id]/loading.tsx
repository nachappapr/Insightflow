import LayoutContainer from "@/components/common/LayoutContainer";
import AddCommentsSkeleton from "@/components/skeletons/AddCommentsSkeleton";
import CommentListSkeleton from "@/components/skeletons/CommentListSkeleton";
import FeedbackCardSkeleton from "@/components/skeletons/FeedbackCardSkeleton";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <LayoutContainer className="form-width">
      <div className="flex justify-between items-center">
        <Button
          variant="link"
          className="h4-bold text-text-primary hover:text-text-secondary transition-fast"
          disabled
        >
          <Skeleton className="w-6 h-6 mr-2" />
          <Skeleton className="w-20 h-4" />
        </Button>
        <Button variant="edit-action" className="h4-bold text-white" disabled>
          <Skeleton className="w-24 h-4" />
        </Button>
      </div>
      <div className="mt-6 flex flex-col gap-6">
        <FeedbackCardSkeleton />
        <CommentListSkeleton />
        <AddCommentsSkeleton />
      </div>
    </LayoutContainer>
  );
};

export default loading;
