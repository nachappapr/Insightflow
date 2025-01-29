import { getFeedbackDetailsById } from "@/data/feedback.data";
import { notFound } from "next/navigation";
import FeedbackCard from "./FeedbackCard";

type FeedbackDetailWrapperProps = {
  feedbackId: string;
};
const FeedbackDetailWrapper = async ({
  feedbackId,
}: FeedbackDetailWrapperProps) => {
  const feedback = await getFeedbackDetailsById(feedbackId);

  if (!feedback) {
    notFound();
  }

  return <FeedbackCard item={feedback} disableLink={true} />;
};

export default FeedbackDetailWrapper;
