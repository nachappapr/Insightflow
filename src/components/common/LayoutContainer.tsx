import clsx from "clsx";
import React from "react";

type LayoutContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const LayoutContainer = ({ children, className }: LayoutContainerProps) => {
  return (
    <div className={clsx("centered-layout md:my-14", className)}>
      {children}
    </div>
  );
};

export default LayoutContainer;
