"use client";
import React from "react";
import ResizeableSidebar from "./components/resizeable-sidebar";
import { useWindowSize } from "@/lib/hooks";

interface AIWritingLayoutProps {
  children: React.ReactNode;
}
const AIWritingLayout = (props: AIWritingLayoutProps) => {
  const isPhone = useWindowSize().width < 640;
  return (
    // <div className="w-full h-full">
    //   <div className="w-full h-full md:flex">
    //     <ResizeableSidebar defaultLayout={[20, 440, 655]} navCollapsedSize={1}>
    //       {props.children}
    //     </ResizeableSidebar>
    //   </div>
    //   <div className="md:hidden flex">{props.children}</div>
    // </div>
    <>
      {isPhone ? (
        <div className="h-full w-full">{props.children}</div>
      ) : (
        <ResizeableSidebar defaultLayout={[20, 440, 655]} navCollapsedSize={1}>
          {props.children}
        </ResizeableSidebar>
      )}
    </>
  );
};

export default AIWritingLayout;
