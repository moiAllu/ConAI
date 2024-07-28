import React from "react";
import { Info, CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReactivateSubscription from "./reactivate-subscription";
const Head = () => {
  return (
    <div className="w-full">
      <div className="mt-8 sm:mr-10">
        <ReactivateSubscription />
      </div>
      <div className="flex flex-col justify-center items-center w-full sm:mt-2 md:space-y-14 space-y-5">
        <h1 className="font-bold sm:text-4xl text-2xl">Apps</h1>
        <div className="flex flex-col w-full  items-center space-y-1">
          <div className="flex space-x-1">
            <p className="sm:text-sm text-xs text-blue-800 underline">
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
