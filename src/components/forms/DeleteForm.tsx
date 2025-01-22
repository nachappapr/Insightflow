import { deleteFeedback } from "@/actions/feedback.action";
import { Button } from "../ui/button";

const DeleteForm = ({ feedbackId }: { feedbackId: string }) => {
  const deleteFeedbackAction = deleteFeedback.bind(null, feedbackId);

  return (
    <form action={deleteFeedbackAction}>
      <Button variant="danger">Delete</Button>
    </form>
  );
};

export default DeleteForm;
