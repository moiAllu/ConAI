import React from "react";
import { BellRing, Info, CirclePlus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Head = () => {
  return (
    <div className="w-full">
      <Link
        className="flex justify-end items-end cursor-pointer"
        href="/forms/account"
      >
        <div className="flex px-2 py-1 items-end mr-20 mt-8 gap-2 justify-center rounded outline outline-gray-400 shadow-sm">
          <BellRing size={18} />
          <h1 className="font-medium text-sm font-sans">
            {"Reactivate your subscription"}
          </h1>
        </div>
      </Link>
      <div className="flex flex-col justify-center items-center w-full sm:mt-2 md:space-y-14 space-y-5">
        <h1 className="font-bold text-4xl">Apps</h1>
        <div className="flex flex-col w-full  items-center space-y-1">
          <div className="flex space-x-1">
            <p className="text-sm text-blue-800 underline">
              Select an app from below or create your own using AI.
            </p>
            <Info size={16} color="rgb(30 64 175)" />
          </div>
          <div className="flex w-full items-center max-w-lg space-x-2">
            <Input
              type="email"
              placeholder="Enter any description of your app you want to create"
              className="py-1"
            />
            <Button type="submit">
              <div className=" flex items-center justify-items-center space-x-1">
                <CirclePlus />
                <span>Create</span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Head;
