import FeedbackCardSkeleton from "./FeedbackCardSkeleton";
import FeedbackHeaderSkeleton from "./FeedbackHeaderSkeleton";

const FeedbackWrapperSkeleton = () => {
  return (
    <>
      <FeedbackHeaderSkeleton />
      <div className="flex flex-col gap-4 w-[95%] mx-auto mt-10 md:mt-6 md:w-full">
        <FeedbackCardSkeleton />
      </div>
    </>
  );
};

export default FeedbackWrapperSkeleton;
