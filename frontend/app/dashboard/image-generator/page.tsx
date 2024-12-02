"use client";
import Nav from "@/components/header/nav";
import React, { Suspense } from "react";
import { Image } from "lucide-react";
import InputCard from "./components/inputCard";
import OutputCard from "./components/outputCard";
import { useWindowSize } from "@/lib/hooks";

const ImageGenerationPage = () => {
  const isPhone = useWindowSize().width < 640;
  return (
    <div className="sm:py-5 py-2 flex flex-col w-full h-full">
      <Nav title="Image-Generator" icon={Image}>
        <InputCard />
      </Nav>
      <div className=" sm:p-3 p-2 h-full w-full flex  items-center  space-x-4">
        {!isPhone && <InputCard />}
        <Suspense fallback={<div>Loading...</div>}>
          <OutputCard />
        </Suspense>
      </div>
    </div>
  );
};

export default ImageGenerationPage;
