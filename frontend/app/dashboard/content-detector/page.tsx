"use client";
import Nav from "@/components/header/nav";
import { Square, SquareActivity } from "lucide-react";
import React, { Suspense } from "react";
import DrawerCard from "./components/drawerCard";
import { useWindowSize } from "@/lib/hooks";
import OutputCard from "./components/outputCard";
import ContentDetectorHistory from "./components/content-detector-history";
const ContentDetectionPage = () => {
  const isPhone = useWindowSize().width < 640;
  return (
    <div className="sm:py-5 py-2 flex flex-col w-full h-full ">
      <Nav
        title="Content-Detector"
        icon={SquareActivity}
        history={
          <>
            <ContentDetectorHistory />
          </>
        }
      >
        <DrawerCard />
      </Nav>
      <div className="p-2 sm:p-5 h-full w-full flex  items-center  space-x-4 ">
        {!isPhone && <DrawerCard />}
        <Suspense fallback={<div>Loading...</div>}>
          <OutputCard />
        </Suspense>
      </div>
    </div>
  );
};

export default ContentDetectionPage;
