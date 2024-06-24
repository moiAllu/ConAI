import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const ResizeableSidebar = () => {
  return (
    <div className="w-full h-full">
      <ResizablePanelGroup
        direction="horizontal"
        className=" min-h-screen rounded-lg border"
      >
        <ResizablePanel defaultSize={15} maxSize={20} minSize={5}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Sidebar</span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Content</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default ResizeableSidebar;
