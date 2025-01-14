import React from "react";

type LayoutContainerProps = {
  children: React.ReactNode;
};

const LayoutContainer = ({ children }: LayoutContainerProps) => {
  return <div className="max-w-6xl mx-auto md:mt-14 lg:mt-24">{children}</div>;
};

export default LayoutContainer;
