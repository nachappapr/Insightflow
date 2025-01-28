import { APP_ROUTES } from "@/constants/endpoint";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import LayoutContainer from "../common/LayoutContainer";
import { Button } from "../ui/button";
import CreateFeedbackFormSkeleton from "./CreateFeedbackFormSkeleton";

const CreateFeedbackFormWrapperSkeleton = () => {
  return (
    <LayoutContainer className="form-width">
      <Button variant="link" className="h4-bold text-text-primary mb-4">
        <ChevronLeft size={24} stroke="#4661E6" />
        <Link href={APP_ROUTES.DASHBOARD}> Go back</Link>
      </Button>
      <CreateFeedbackFormSkeleton />
    </LayoutContainer>
  );
};

export default CreateFeedbackFormWrapperSkeleton;
