import EditFeedbackFormWrapper from "@/components/feedback/EditFeedbackFormWrapper";
import CreateFeedbackFormWrapperSkeleton from "@/components/skeletons/CreateFeedbackFormWrapperSkeleton";
import { Suspense } from "react";

const EditFeedbackPage = async (props: { params: { id: string } }) => {
  const params = await props.params;
  const feedbackId = params.id;

  return (
    <Suspense fallback={<CreateFeedbackFormWrapperSkeleton />}>
      <EditFeedbackFormWrapper feedbackId={feedbackId} />
    </Suspense>
  );
};

export default EditFeedbackPage;
