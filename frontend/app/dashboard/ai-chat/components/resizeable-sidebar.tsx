"use client";
import React, { Children } from "react";
import { cn } from "@/lib/utils";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import Logo from "@/components/navbar/logo";
import { SquarePen, ReceiptText } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Inbox,
  BookText,
  Siren,
  MessageSquareMore,
  Image,
  CirclePlus,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { categorizeChatMessages } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
interface ResizeableSidebarProps {
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
  children: React.ReactNode;
}

const chatHistory: ChatMessage[] = [
  {
    title: "Morning Coffee Plans",
    dateTime: new Date("2024-07-11T07:30:00"), // Example date and time (YYYY-MM-DDTHH:mm:ss)
    content:
      "Alice and Bob discuss plans to meet for coffee later in the day. 🍵☕️",
  },
  {
    title: "Morning Coffee Plans",
    dateTime: new Date("2024-07-11T07:30:00"), // Example date and time (YYYY-MM-DDTHH:mm:ss)
    content:
      "Alice and Bob discuss plans to meet for coffee later in the day. 🍵☕️",
  },
  {
    title: "Morning Coffee Plans",
    dateTime: new Date("2024-07-11T07:30:00"), // Example date and time (YYYY-MM-DDTHH:mm:ss)
    content:
      "Alice and Bob discuss plans to meet for coffee later in the day. 🍵☕️",
  },
  {
    title: "Project Update",
    dateTime: new Date("2024-07-10T10:15:00"),
    content:
      "Team A shares progress updates and assigns tasks for the day. 📈📋",
  },
  {
    title: "Lunch Break Ideas",
    dateTime: new Date("2024-07-09T12:00:00"),
    content:
      "Alice and Bob brainstorm lunch options and decide on a nearby restaurant. 🍔🥗",
  },
  {
    title: "Client Meeting Prep",
    dateTime: new Date("2024-07-04T14:30:00"),
    content:
      "Alice and Emily discuss strategies and preparations for an upcoming client meeting. 📊📅",
  },
  {
    title: "Technical Discussion",
    dateTime: new Date("2024-06-27T16:45:00"),
    content:
      "Alice and Charlie troubleshoot technical issues and brainstorm solutions. 💻🔧",
  },
];

const ResizeableSidebar = ({
  defaultLayout = [5, 440, 655],
  defaultCollapsed = true,
  navCollapsedSize,
  children,
}: ResizeableSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const filterChatHistory = categorizeChatMessages(chatHistory);
  console.log(filterChatHistory);
  const onCollapsed = (collapsed: any) => {
    // setIsCollapsed(collapsed);
    setIsCollapsed(true);
    document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
      collapsed
    )}`;
  };

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className=" min-h-screen"
      // onLayout={(sizes: number[]) => {
      //   document.cookie = `react-resizable-panels:layout=${JSON.stringify(
      //     sizes
      //   )}`;
      // }}
    >
      <ResizablePanel
        defaultSize={defaultLayout[0]}
        collapsedSize={navCollapsedSize}
        collapsible={true}
        minSize={0}
        maxSize={20}
        // onCollapse={onCollapsed}
        className={cn(
          isCollapsed &&
            "min-w-[50px] transition-all duration-300 ease-in-out w-full"
        )}
        onExpand={() => setIsCollapsed(false)}
      >
        <div className="flex flex-col px-2 py-5  m-2 rounded-lg gap-5 ">
          <div className=" flex justify-between items-center">
            <h1 className="font-bold text-2xl">Chats</h1>
            {
              // Chat add button
            }
            <CirclePlus onClick={() => {}} className="cursor-pointer" />
          </div>
          {filterChatHistory.map((chat, index) => (
            <div className="w-full" key={index}>
              <h3 className="text-sm font-semibold">{chat.category}</h3>
              <Separator className="my-1" />
              {chat.messages.map((message, index) => (
                <Button
                  className="py-1 w-full justify-start my-1"
                  size="sm"
                  variant="secondary"
                  key={index}
                >
                  <p className="text-xs dark:text-gray-400">{message.title}</p>
                </Button>
              ))}
              <Separator className="my-1" />
            </div>
          ))}
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>{children}</ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default ResizeableSidebar;
