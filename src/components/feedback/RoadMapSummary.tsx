import { APP_ROUTES } from "@/constants/endpoint";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import Status from "./Status";
import { Statuses } from "@/constants/feedback";

const RoadMapSummary = () => {
  const renderStatus = () => {
    return Statuses?.map((status, index) => (
      <Status key={index} name={status} count={0} />
    ));
  };

  return (
    <Card className="w-[15.9375rem] max-w-[15.9375rem] shadow-none">
      <CardContent className="flex flex-col gap-6 p-6">
        <div className="flex justify-between items-center">
          <h3 className="h3-bold text-text-primary">Roadmap</h3>
          <Link
            href={APP_ROUTES.ROADMAP}
            className="body1-regular text-brand-primary link-underline hover:text-brand-light"
          >
            View
          </Link>
        </div>
        <div className="flex flex-col items-start capitalize">
          {renderStatus()}
        </div>
      </CardContent>
    </Card>
  );
};

export default RoadMapSummary;
