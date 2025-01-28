import BrandCard from "@/components/common/BrandCard";
import LayoutContainer from "@/components/common/LayoutContainer";
import FeedbackWrapper from "@/components/dashboard/FeedbackWrapper";
import CatagoriesCard from "@/components/feedback/CatagoriesCard";
import RoadMapSummary from "@/components/feedback/RoadMapSummary";
import CategoriesCardSkeleton from "@/components/skeletons/CatagoriesCardSkeleton";
import FeedbackWrapperSkeleton from "@/components/skeletons/FeedbackWrapperSkeleton";
import RoadMapSummarySkeleton from "@/components/skeletons/RoadMapSkeleton";
import { Suspense } from "react";
import { auth } from "../../../../auth";

export async function Dashboard() {
  const session = await auth();
  const user = session?.user ?? null;
  const userId = user?.id;

  return (
    <LayoutContainer className="relative">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="hidden md:flex md:flex-row gap-2 lg:flex-col lg:gap-6">
          <BrandCard />
          <Suspense fallback={<CategoriesCardSkeleton />}>
            <CatagoriesCard />
          </Suspense>
          <Suspense fallback={<RoadMapSummarySkeleton />}>
            <RoadMapSummary />
          </Suspense>
        </div>
        <div className="flex-grow">
          <Suspense fallback={<FeedbackWrapperSkeleton />}>
            <FeedbackWrapper userId={userId} />
          </Suspense>
        </div>
      </div>
    </LayoutContainer>
  );
}

export default Dashboard;
