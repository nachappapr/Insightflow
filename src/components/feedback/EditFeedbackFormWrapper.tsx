import LayoutContainer from "@/components/common/LayoutContainer";
import EditFeedbackForm from "@/components/forms/EditFeedbackForm";
import { Button } from "@/components/ui/button";
import { APP_ROUTES } from "@/constants/endpoint";
import {
  getAllCategories,
  getAllStatuses,
  getFeedbackDetailsById,
} from "@/data/feedback.data";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const EditFeedbackFormWrapper = async ({
  feedbackId,
}: {
  feedbackId: string;
}) => {
  const feedback = await getFeedbackDetailsById(feedbackId);
  const categories = await getAllCategories();
  const statuses = await getAllStatuses();

  if (!feedback) {
    notFound();
  }

  return (
    <LayoutContainer className="form-width">
      <Button variant="link" className="h4-bold text-text-primary">
        <ChevronLeft size={24} stroke="#4661E6" />
        <Link href={`${APP_ROUTES.FEEDBACK}/${feedbackId}`}> Go back</Link>
      </Button>
      <EditFeedbackForm
        categories={categories}
        statuses={statuses}
        feedback={feedback}
      />
    </LayoutContainer>
  );
};

export default EditFeedbackFormWrapper;
