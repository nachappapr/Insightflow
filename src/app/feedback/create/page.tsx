import LayoutContainer from "@/components/common/LayoutContainer";
import CreateFeedbackForm from "@/components/forms/CreateFeedbackForm";
import { Button } from "@/components/ui/button";
import { APP_ROUTES } from "@/constants/endpoint";
import { getAllCategories, getAllStatuses } from "@/data/feedback.data";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const CreateFeedbackPage = async () => {
  const categories = await getAllCategories();
  const statuses = await getAllStatuses();
  return (
    <LayoutContainer className="max-w-4xl">
      <Button variant="link" className="h4-bold text-text-primary">
        <ChevronLeft size={24} stroke="#4661E6" />
        <Link href={APP_ROUTES.DASHBOARD}> Go back</Link>
      </Button>
      <CreateFeedbackForm
        title="Create New Feedback"
        categories={categories}
        statuses={statuses}
      />
    </LayoutContainer>
  );
};

export default CreateFeedbackPage;
