import React, { Children } from "react";
import ResizeableSidebar from "./components/resizeable-sidebar";

interface AIWritingLayoutProps {
  children: React.ReactNode;
}
const AIWritingLayout = (props: AIWritingLayoutProps) => {
  return (
    <ResizeableSidebar defaultLayout={[20, 440, 655]} navCollapsedSize={1}>
      {props.children}
    </ResizeableSidebar>
  );
};

export default AIWritingLayout;
