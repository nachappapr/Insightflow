import CreateFeedbackFormWrapper from "@/components/feedback/CreateFeedbackFormWrapper";
import CreateFeedbackFormWrapperSkeleton from "@/components/skeletons/CreateFeedbackFormWrapperSkeleton";
import { Suspense } from "react";

const CreateFeedbackPage = async () => {
  return (
    <Suspense fallback={<CreateFeedbackFormWrapperSkeleton />}>
      <CreateFeedbackFormWrapper />
    </Suspense>
  );
};

export default CreateFeedbackPage;
