import EditFeedbackFormWrapper from "@/components/feedback/EditFeedbackFormWrapper";

const EditFeedbackPage = async (props: { params: { id: string } }) => {
  const params = await props.params;
  const feedbackId = params.id;

  return <EditFeedbackFormWrapper feedbackId={feedbackId} />;
};

export default EditFeedbackPage;
