import { auth } from "@/auth";
import BrandCard from "@/components/common/BrandCard";
import LayoutContainer from "@/components/common/LayoutContainer";
import FeedbackWrapper from "@/components/dashboard/FeedbackWrapper";
import CatagoriesCard from "@/components/feedback/CatagoriesCard";
import RoadMapSummary from "@/components/feedback/RoadMapSummary";
import CategoriesCardSkeleton from "@/components/skeletons/CatagoriesCardSkeleton";
import FeedbackWrapperSkeleton from "@/components/skeletons/FeedbackWrapperSkeleton";
import RoadMapSummarySkeleton from "@/components/skeletons/RoadMapSkeleton";
import { Suspense } from "react";

export default async function Dashboard(props: {
  searchParams?: Promise<{
    sort?: string;
  }>;
}) {
  const session = await auth();

  const user = session?.user ?? null;
  const userId = user?.id;
  const searchParams = await props.searchParams;
  const query = searchParams?.sort;

  return (
    <LayoutContainer className="relative">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="hidden md:flex md:flex-row gap-2 lg:flex-col lg:gap-6 sticky top-28 md:justify-start lg:self-start">
          <BrandCard />
          <Suspense fallback={<CategoriesCardSkeleton />}>
            <CatagoriesCard />
          </Suspense>
          <Suspense fallback={<RoadMapSummarySkeleton />}>
            <RoadMapSummary />
          </Suspense>
        </div>
        <div className="flex-grow">
          <Suspense key={query} fallback={<FeedbackWrapperSkeleton />}>
            <FeedbackWrapper userId={userId} query={query} />
          </Suspense>
        </div>
      </div>
    </LayoutContainer>
  );
}
