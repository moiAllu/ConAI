"use client";
import DynamicCard from "./components/dynamicCard";
import OutputCard from "./components/outputCard";
import Nav from "./components/nav";
import { useWindowSize } from "@/lib/hooks";
const RewritePage = () => {
  const isPhone = useWindowSize().width < 640;
  return (
    <div className="sm:py-5 py-2 flex flex-col w-full h-full justify-between ">
      <Nav>
        <DynamicCard />
      </Nav>
      <div className="px-2 sm:p-5 h-full w-full flex  items-center  sm:space-x-4">
        {!isPhone && <DynamicCard />}
        <OutputCard />
      </div>
    </div>
  );
};

export default RewritePage;
