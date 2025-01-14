import BrandCard from "@/components/common/BrandCard";
import LayoutContainer from "@/components/common/LayoutContainer";
import CatagoriesCard from "@/components/feedback/CatagoriesCard";
import FeedbackCard from "@/components/feedback/FeedbackCard";
import FeedbackHeader from "@/components/feedback/FeedbackHeader";
import RoadMapSummary from "@/components/feedback/RoadMapSummary";
import { mockFeedback } from "@/constants/feedback";

export function Dashboard() {
  return (
    <LayoutContainer>
      <div className="flex gap-8">
        <div className="flex flex-col gap-6">
          <BrandCard />
          <CatagoriesCard />
          <RoadMapSummary />
        </div>
        <div className="flex-grow">
          <FeedbackHeader />
          <div className="mt-6 flex flex-col gap-4">
            <FeedbackCard item={mockFeedback[0]} />
            <FeedbackCard item={mockFeedback[0]} />
            <FeedbackCard item={mockFeedback[0]} />
          </div>
        </div>
      </div>
    </LayoutContainer>
  );
}

export default Dashboard;
