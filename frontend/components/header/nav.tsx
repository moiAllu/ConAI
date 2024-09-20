import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UploadIcon, ReceiptText, IconNode, LucideIcon } from "lucide-react";
import { Settings, History } from "lucide-react";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface NavProps {
  children: React.ReactNode;
  history?: React.ReactNode;
  title: string;
  icon: LucideIcon;
}

const Nav = (props: NavProps) => {
  return (
    <div className="w-full ">
      <div className="flex items-center justify-between px-4">
        <div className=" flex space-x-2 items-center">
          <ReceiptText className="font-bold " />
          <h1 className="sm:text-2xl font-bold text-xl">{props.title}</h1>
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
              <DrawerDescription>{props.history}</DrawerDescription>
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
