import clsx from "clsx";
import React from "react";

type LayoutContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const LayoutContainer = ({ children, className }: LayoutContainerProps) => {
  return (
    <div
      className={clsx("max-w-6xl mx-auto my-8 md:my-14 lg:my-24", className)}
    >
      {children}
    </div>
  );
};

export default LayoutContainer;
