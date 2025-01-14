import { Lightbulb, PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import FeedbackSort from "./FeedbackSort";

const FeedbackHeader = () => {
  return (
    <div className="w-full flex items-center justify-between px-3 gap-2 min-h-[5rem] max-h-[5rem] bg-navy md:p-6 md:rounded-lg">
      <div className="flex gap-4 items-center">
        <Lightbulb size={32} color="white" />
        <h2 className="h2-bold text-white hidden md:inline-block">{`${6} Suggestions`}</h2>
        <div className="md:ml-[38px]">
          <FeedbackSort />
        </div>
      </div>
      <Button variant="primaryAction">
        <PlusIcon size={16} />
        Add Feedback
      </Button>
    </div>
  );
};

export default FeedbackHeader;
