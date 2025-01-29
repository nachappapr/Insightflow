import { getAllFeedbackDetails } from "@/data/feedback.data";
import { isEmpty } from "lodash";
import EmptyFeedback from "../common/EmptyFeedback";
import FeedbackCard from "../feedback/FeedbackCard";
import FeedbackHeader from "../feedback/FeedbackHeader";

const FeedbackWrapper = async ({
  userId,
  query,
}: {
  userId: string | undefined;
  query?: string;
}) => {
  const feedbackList = userId ? await getAllFeedbackDetails(userId, query) : [];
  const feedbackCount = feedbackList?.length ?? 0;

  const renderFeedbackList = () => {
    if (isEmpty(feedbackList)) return <EmptyFeedback />;
    return feedbackList.map((item) => (
      <FeedbackCard key={item.id} item={item} />
    ));
  };
  return (
    <div>
      <div className="top-16 sticky md:top-80 lg:top-28 z-10">
        <FeedbackHeader feedbackCount={feedbackCount} />
      </div>
      <div className="flex flex-col gap-4 w-[95%] mx-auto mt-10 md:mt-6 md:w-full">
        {renderFeedbackList()}
      </div>
    </div>
  );
};

export default FeedbackWrapper;
