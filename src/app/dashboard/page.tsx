import BrandCard from "@/components/common/BrandCard";
import LayoutContainer from "@/components/common/LayoutContainer";
import CatagoriesCard from "@/components/feedback/CatagoriesCard";
import FeedbackCard from "@/components/feedback/FeedbackCard";
import FeedbackHeader from "@/components/feedback/FeedbackHeader";
import RoadMapSummary from "@/components/feedback/RoadMapSummary";
import { getAllFeedback } from "@/data/feedback.data";
import { auth } from "../../../auth";

export async function Dashboard() {
  const session = await auth();
  const user = session?.user ?? null;
  const userId = user?.id;

  const feedbackList = userId ? await getAllFeedback(userId) : [];

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
            {feedbackList.map((item) => (
              <FeedbackCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </LayoutContainer>
  );
}

export default Dashboard;
