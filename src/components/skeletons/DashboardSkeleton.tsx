import LayoutContainer from "../common/LayoutContainer";
import BrandCardSkeleton from "./BrandCardSkeleton";
import CategoriesCardSkeleton from "./CatagoriesCardSkeleton";
import FeedbackCardSkeleton from "./FeedbackCardSkeleton";
import FeedbackHeaderSkeleton from "./FeedbackHeaderSkeleton";
import RoadMapSummarySkeleton from "./RoadMapSkeleton";

const DashboardSkeleton = () => {
  return (
    <LayoutContainer className="relative">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="hidden md:flex md:flex-row gap-2 lg:flex-col lg:gap-6 items-start">
          <BrandCardSkeleton />
          <CategoriesCardSkeleton />
          <RoadMapSummarySkeleton />
        </div>
        <div className="flex-grow">
          <FeedbackHeaderSkeleton />
          <div className="flex flex-col gap-4 w-[95%] mx-auto mt-10 md:mt-6 md:w-full">
            <FeedbackCardSkeleton />
          </div>
        </div>
      </div>
    </LayoutContainer>
  );
};

export default DashboardSkeleton;
