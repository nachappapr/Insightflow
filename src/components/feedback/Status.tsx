import { isEqual, isUndefined } from "lodash";
import clsx from "clsx";

type StatusProps = {
  name: "planned" | "in-progress" | "live";
  count?: number;
  children?: React.ReactElement;
};

const Status = ({ name, count }: StatusProps) => {
  console.log(name, count);
  return (
    <div className="flex justify-between w-full body-one-text text-text-secondary capitalize">
      <div className="flex gap-4 justify-center items-center">
        <div
          className={clsx(`h-2 w-2 rounded-full `, {
            "bg-status-planned": isEqual(name, "planned"),
            "bg-status-inProgress": isEqual(name, "in-progress"),
            "bg-status-live": isEqual(name, "live"),
          })}
        ></div>
        <div>{name}</div>
      </div>
      {!isUndefined(count) && (
        <div className="font-bold text">{count ?? 0}</div>
      )}
    </div>
  );
};

export default Status;
