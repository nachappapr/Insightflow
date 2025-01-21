import clsx from "clsx";
import React from "react";

interface VoteArrowProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const ArrowUpIcon = ({ className }: VoteArrowProps) => {
  return (
    <svg
      className={clsx("transition-hover duration-250 ease-smooth", className)}
      width="10"
      height="7"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 6l4-4 4 4"
        stroke="#4661E6"
        strokeWidth="2"
        fill="none"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default ArrowUpIcon;
