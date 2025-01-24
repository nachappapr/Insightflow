import LayoutContainer from "@/components/common/LayoutContainer";
import CommentList from "@/components/feedback/CommentList";
import FeedbackCard from "@/components/feedback/FeedbackCard";
import AddComments from "@/components/forms/AddComments";
import { Button } from "@/components/ui/button";
import { APP_ROUTES } from "@/constants/endpoint";
import { getFeedbackById } from "@/data/feedback.data";
import { isEmpty } from "lodash";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const FeedbackDetailPage = async (props: {
  params: Promise<{ id: string }>;
}) => {
  const params = await props.params;
  const feedbackId = params.id;
  const feedback = await getFeedbackById(feedbackId);

  if (!feedback) {
    notFound();
  }

  const renderComments = () => {
    if (isEmpty(feedback.comments)) return null;
    return (
      <CommentList
        key={feedback["numberOfComments"]}
        comments={feedback["comments"]}
        feedbackId={feedbackId}
        numberOfComments={feedback["numberOfComments"]}
      />
    );
  };

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
        <FeedbackCard item={feedback} disableLink={true} />
        {renderComments()}
        <AddComments feedbackId={feedbackId} />
      </div>
    </LayoutContainer>
  );
};

export default FeedbackDetailPage;
