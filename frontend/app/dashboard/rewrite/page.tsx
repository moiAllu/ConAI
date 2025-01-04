"use client";
import DynamicCard from "./components/dynamicCard";
import OutputCard from "./components/outputCard";
import Nav from "@/components/header/nav";
import { useWindowSize } from "@/lib/hooks";
import { Suspense } from "react";
import { SquarePen } from "lucide-react";

const RewritePage = () => {
  const isPhone = useWindowSize().width < 640;
  return (
    <div className="sm:py-5 py-2 flex flex-col w-full h-full justify-between ">
      <Nav title="Rewrite" icon={SquarePen}>
        <DynamicCard />
      </Nav>
      <div className="px-2 sm:p-5 sm:h-full h-[calc(100vh-140px)] w-full flex  items-center  sm:space-x-4">
        {!isPhone && <DynamicCard />}
        <Suspense fallback={<div>Loading...</div>}>
          <OutputCard />
        </Suspense>
      </div>
    </div>
  );
};

export default RewritePage;
