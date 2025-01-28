import { getAllFeedback } from "@/data/feedback.data";
import { isEmpty } from "lodash";
import { Fragment } from "react";
import EmptyFeedback from "../common/EmptyFeedback";
import FeedbackCard from "../feedback/FeedbackCard";
import FeedbackHeader from "../feedback/FeedbackHeader";

const FeedbackWrapper = async ({ userId }: { userId: string | undefined }) => {
  const feedbackList = userId ? await getAllFeedback(userId) : [];
  const feedbackCount = feedbackList?.length ?? 0;

  const renderFeedbackList = () => {
    if (isEmpty(feedbackList)) return <EmptyFeedback />;
    return feedbackList.map((item) => (
      <FeedbackCard key={item.id} item={item} />
    ));
  };
  return (
    <Fragment>
      <FeedbackHeader feedbackCount={feedbackCount} />
      <div className="flex flex-col gap-4 w-[95%] mx-auto mt-10 md:mt-6 md:w-full">
        {renderFeedbackList()}
      </div>
    </Fragment>
  );
};

export default FeedbackWrapper;
