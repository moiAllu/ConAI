"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ReceiptText, Settings, History } from "lucide-react";
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
    <div className="w-full">
      <div className="flex items-center justify-between gap-2 px-3 sm:px-4">
        {/* On desktop: title + icon. On mobile: hidden (feature name is in top navbar). */}
        <div className="hidden min-w-0 flex-1 items-center gap-2 md:flex">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted/50">
            <ReceiptText className="h-4 w-4 text-muted-foreground sm:h-5 sm:w-5" />
          </div>
          <h1 className="truncate text-lg font-semibold sm:text-2xl sm:font-bold">
            AI Writing
          </h1>
        </div>
        {/* On mobile: actions take full width. */}
        <div className="flex min-w-0 flex-1 flex-wrap items-center justify-end gap-2 md:flex-initial md:flex-shrink-0">
          <Drawer direction="left">
            <DrawerTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-10 min-w-0 flex-1 gap-2 rounded-xl border border-border/40 bg-muted/20 px-3 text-sm font-medium md:flex-initial md:h-9 md:min-w-0 md:rounded-lg md:border-0 md:bg-transparent md:px-2.5 md:text-xs [&_svg]:shrink-0"
              >
                <History className="h-4 w-4 md:h-5 md:w-5" />
                <span>History</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="w-screen sm:max-w-[450px] max-w-[270px] h-full">
              <DrawerHeader className="flex flex-col">
                <DrawerTitle className="text-center mb-0">History</DrawerTitle>
              </DrawerHeader>
              <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden p-2">
                <DrawerHistory />
              </div>
            </DrawerContent>
          </Drawer>
          <Drawer>
            <DrawerTrigger asChild>
              <Button
                variant="default"
                size="sm"
                className="h-10 min-w-0 flex-1 gap-2 rounded-xl bg-foreground px-3 text-sm font-medium text-background hover:bg-foreground/90 md:hidden [&_svg]:shrink-0"
              >
                <Settings className="h-4 w-4" />
                <span>Write</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="h-full w-full max-h-[85vh] md:max-h-none">
              <DrawerHeader>
                <DrawerTitle>Write</DrawerTitle>
                <DrawerDescription>
                  Choose format, tone, and prompt to generate content.
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
