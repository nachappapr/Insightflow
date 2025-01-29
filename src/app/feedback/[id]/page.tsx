import LayoutContainer from "@/components/common/LayoutContainer";
import CommentsListWrapper from "@/components/feedback/CommentsListWrapper";
import FeedbackDetailWrapper from "@/components/feedback/FeedbackDetailWrapper";
import AddComments from "@/components/forms/AddComments";
import CommentListSkeleton from "@/components/skeletons/CommentListSkeleton";
import FeedbackCardSkeleton from "@/components/skeletons/FeedbackCardSkeleton";
import { Button } from "@/components/ui/button";
import { APP_ROUTES } from "@/constants/endpoint";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

const FeedbackDetailPage = async (props: {
  params: Promise<{ id: string }>;
}) => {
  const params = await props.params;
  const feedbackId = params.id;

  return (
    <LayoutContainer className="form-width">
      <div className="flex justify-between items-center">
        <Button
          variant="link"
          className="h4-bold text-text-primary hover:text-text-secondary transition-fast"
        >
          <ChevronLeft size={24} stroke="#4661E6" />
          <Link href={APP_ROUTES.DASHBOARD}> Go back</Link>
        </Button>
        <Button variant="edit-action" className="h4-bold text-white">
          <Link href={`/feedback/${feedbackId}/edit`}>Edit Feedback</Link>
        </Button>
      </div>
      <div className="mt-6 flex flex-col gap-6">
        <Suspense fallback={<FeedbackCardSkeleton />}>
          <FeedbackDetailWrapper feedbackId={feedbackId} />
        </Suspense>
        <Suspense fallback={<CommentListSkeleton />}>
          <CommentsListWrapper feedbackId={feedbackId} />
        </Suspense>
        <AddComments feedbackId={feedbackId} />
      </div>
    </LayoutContainer>
  );
};

export default FeedbackDetailPage;
