import LayoutContainer from "@/components/common/LayoutContainer";
import CreateFeedbackFormSkeleton from "@/components/skeletons/CreateFeedbackFormSkeleton";
import { Button } from "@/components/ui/button";
import { APP_ROUTES } from "@/constants/endpoint";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const loading = () => {
  return (
    <LayoutContainer className="form-width">
      <Button variant="link" className="h4-bold text-text-primary">
        <ChevronLeft size={24} stroke="#4661E6" />
        <Link href={APP_ROUTES.DASHBOARD}> Go back</Link>
      </Button>
      <CreateFeedbackFormSkeleton />
    </LayoutContainer>
  );
};

export default loading;
