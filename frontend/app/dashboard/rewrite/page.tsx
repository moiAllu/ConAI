"use client";
import DynamicCard from "./components/dynamicCard";
import OutputCard from "./components/outputCard";
import Nav from "./components/nav";
import { useWindowSize } from "@/lib/hooks";
const RewritePage = () => {
  const isPhone = useWindowSize().width < 640;
  return (
    <div className="py-5 flex flex-col w-full h-full ">
      <Nav>
        <DynamicCard />
      </Nav>
      <div className="p-2 sm:p-5 h-full w-full flex  items-center  space-x-4">
        {!isPhone && <DynamicCard />}
        <OutputCard />
      </div>
    </div>
  );
};

export default RewritePage;
