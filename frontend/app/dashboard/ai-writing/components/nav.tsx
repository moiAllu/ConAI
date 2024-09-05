import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SquarePen, UploadIcon, ReceiptText } from "lucide-react";
import { Settings, History } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerTrigger,
} from "@/components/ui/drawer";
import DrawerHistory from "./drawer-history";

interface NavProps {
  children: React.ReactNode;
}

const Nav = (props: NavProps) => {
  return (
    <div className="w-full ">
      <div className="flex items-center justify-between px-4">
        <div className=" flex space-x-2 items-center">
          <ReceiptText className="font-bold " />
          <h1 className="text-xl font-bold">AI Writing</h1>
          <Drawer direction="left">
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="">
                <History />
                <span className="sr-only">history</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="w-screen max-w-[450px]">
              <DrawerHeader>
                <DrawerTitle>History</DrawerTitle>
              </DrawerHeader>
              <DrawerHistory />
            </DrawerContent>
          </Drawer>
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Settings className="size-6" />
                <span className="sr-only">Settings</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[80vh]">
              <DrawerHeader>
                <DrawerTitle>Configuration</DrawerTitle>
                <DrawerDescription>
                  Configure the settings for the model and messages.
                </DrawerDescription>
              </DrawerHeader>
              {props.children}
            </DrawerContent>
          </Drawer>
        </div>
        <Button
          className="flex justify-start space-x-1 items-center"
          variant="ghost"
        >
          <UploadIcon />
          <span className="hidden sm:flex">Share</span>
        </Button>
      </div>
      <Separator className="my-2" />
    </div>
  );
};

export default Nav;
