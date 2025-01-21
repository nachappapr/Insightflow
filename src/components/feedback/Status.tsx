import type { FeedbackStatus } from "@/types/feedback.types";
import clsx from "clsx";

const Status = ({ name, color, numberOfFeedback }: FeedbackStatus) => {
  return (
    <div className="flex justify-between w-full body-one-text text-text-secondary capitalize">
      <div className="flex gap-4 justify-center items-center">
        <div
          className={clsx(`h-2 w-2 rounded-full `)}
          style={{ backgroundColor: `${color}` }}
        ></div>
        <div>{name}</div>
      </div>

      <div className="font-bold text">{numberOfFeedback ?? 0}</div>
    </div>
  );
};

export default Status;
