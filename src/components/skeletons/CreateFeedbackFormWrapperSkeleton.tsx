import LayoutContainer from "../common/LayoutContainer";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import CreateFeedbackFormSkeleton from "./CreateFeedbackFormSkeleton";

const CreateFeedbackFormWrapperSkeleton = () => {
  return (
    <LayoutContainer className="form-width">
      <Button
        variant="link"
        className="h4-bold text-text-primary hover:text-text-secondary transition-fast"
        disabled
      >
        <Skeleton className="w-6 h-6 mr-2" />
        <Skeleton className="w-20 h-4" />
      </Button>
      <CreateFeedbackFormSkeleton />
    </LayoutContainer>
  );
};

export default CreateFeedbackFormWrapperSkeleton;
