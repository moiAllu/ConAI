"use client";
import Nav from "@/components/header/nav";
import { Square, SquareActivity } from "lucide-react";
import React, { Suspense } from "react";
import DrawerCard from "./components/drawerCard";
import { useWindowSize } from "@/lib/hooks";
import OutputCard from "./components/outputCard";

const SummarizePage = () => {
  const isPhone = useWindowSize().width < 640;
  return (
    <div className="py-5 flex flex-col w-full h-full ">
      <Nav title="Summarizer" icon={SquareActivity}>
        <DrawerCard />
      </Nav>
      <div className="p-2 sm:p-5 h-full w-full flex  items-center  space-x-4">
        {!isPhone && <DrawerCard />}
        <Suspense fallback={<div>Loading...</div>}>
          <OutputCard />
        </Suspense>
      </div>
    </div>
  );
};

export default SummarizePage;
