import LayoutContainer from "@/components/common/LayoutContainer";
import { Button } from "@/components/ui/button";
import { APP_ROUTES } from "@/constants/endpoint";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const FeedbackDetailPage = async (props: {
  params: Promise<{ id: string }>;
}) => {
  const params = await props.params;
  const feedbackId = params.id;
  return (
    <LayoutContainer className="max-w-4xl">
      <div className="flex justify-between items-center">
        <Button variant="link" className="h4-bold text-text-primary">
          <ChevronLeft size={24} stroke="#4661E6" />
          <Link href={APP_ROUTES.DASHBOARD}> Go back</Link>
        </Button>
        <Button variant="edit-action" className="h4-bold text-white">
          <Link href={`/feedback/${feedbackId}/edit`}>Edit Feedback</Link>
        </Button>
      </div>
    </LayoutContainer>
  );
};

export default FeedbackDetailPage;
