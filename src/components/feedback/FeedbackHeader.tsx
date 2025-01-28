import { APP_ROUTES } from "@/constants/endpoint";
import { Lightbulb, PlusIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import FeedbackSort from "./FeedbackSort";

type FeedbackHeaderProps = {
  feedbackCount: number;
};
const FeedbackHeader = ({ feedbackCount }: FeedbackHeaderProps) => {
  return (
    <div>
      <div className="w-full flex items-center justify-between px-3 gap-2 min-h-[5rem] max-h-[5rem] bg-navy md:p-6 md:rounded-lg">
        <div className="flex gap-4 items-center">
          <div className="hidden md:flex gap-9 items-center">
            <Lightbulb size={32} color="white" />
            <h2 className="h2-bold text-white hidden md:inline-block">{`${feedbackCount} Suggestions`}</h2>
          </div>
          <div>
            <FeedbackSort />
          </div>
        </div>
        <Button variant="primaryAction">
          <PlusIcon size={16} />
          <Link href={APP_ROUTES.CREATE_FEEDBACK}>Add Feedback</Link>
        </Button>
      </div>
    </div>
  );
};

export default FeedbackHeader;
