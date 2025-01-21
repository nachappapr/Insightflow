import clsx from "clsx";
import React from "react";

type LayoutContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const LayoutContainer = ({ children, className }: LayoutContainerProps) => {
  return (
    <div className={clsx("max-w-6xl mx-auto md:mt-14 lg:mt-24", className)}>
      {children}
    </div>
  );
};

export default LayoutContainer;
