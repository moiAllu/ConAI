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
              <Button variant="ghost" size="icon">
                <History size={22} />
                <span className="sr-only">history</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="max-w-[270px] sm:max-w-[450px]">
              <DrawerHeader>
                <DrawerTitle>History</DrawerTitle>
              </DrawerHeader>
              <DrawerHistory />
            </DrawerContent>
          </Drawer>
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Settings size="20px" />
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
      </div>
      <Separator className="my-2" />
    </div>
  );
};

export default Nav;
