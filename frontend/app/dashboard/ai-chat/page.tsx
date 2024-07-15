import React from "react";
import ReactivateSubscription from "../components/reactivate-subscription";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { SendHorizontal, Paperclip, FileSearch, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SelectModel } from "./components/select-model";

const AIWritingPage = () => {
  return (
    <div className="p-2 flex flex-col w-full h-full max-h-[1440px] ">
      <div className="flex justify-between w-full items-center justify-items-center mt-6">
        <SelectModel />
        <ReactivateSubscription />
      </div>
      <Separator className="my-4" />
      <div className="w-full h-full justify-between flex-col flex">
        <div className="w-full h-full flex-col">
          <div className="justify-center flex flex-grow flex-col sm:p-6 p-2 items-center">
            <h1 className="text-3xl font-semibold">AI Chat</h1>
            <p className="text-gray-500 dark:text-gray-700 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
          </div>
          <div className="w-full justify-center flex min-w-lg ">
            <Card className="grid grid-cols-2 gap-2 sm:p-5 p-2 items-center w-[90%]  border-none ">
              <Card>
                <CardHeader>
                  <CardTitle className="text-md">AI Writing</CardTitle>
                </CardHeader>
                <CardContent>
                  <span>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  </span>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-md">AI Writing</CardTitle>
                </CardHeader>
                <CardContent>
                  <span>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  </span>
                </CardContent>
              </Card>
            </Card>
          </div>
        </div>
        <div className="w-full justify-center flex min-w-lg">
          <Card className="flex flex-col p-2 sm:p-4 items-center w-full  sm:w-[90%] space-y-2 ">
            <div className="space-x-2 flex w-full">
              <Input type="email" placeholder="wirte" className="py-1" />
              <Button type="submit">
                <SendHorizontal />
              </Button>
            </div>
            <div className="flex justify-between w-full items-center">
              <div className=" flex items-start w-full text-gray-600 sm:space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center sm:space-x-1"
                >
                  <Paperclip size={18} />
                  <span>Attach</span>
                </Button>
                <Separator orientation="vertical" />
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-1"
                >
                  <FileSearch size={18} />
                  <span>Browse Propmts</span>
                </Button>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-700 sm:text-sm text-xs">
                  20/3000
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIWritingPage;
