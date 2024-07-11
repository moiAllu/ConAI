"use client";
import React, { Children } from "react";
import { cn } from "@/lib/utils";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Logo from "@/components/navbar/logo";
import { Nav } from "../components/nav";
import { SquarePen, ReceiptText } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Inbox, BookText, Siren, MessageSquareMore, Image } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
interface ResizeableSidebarProps {
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
  children: React.ReactNode;
}

const UserData = {
  title: "Jane Cooper",
  image: "https://images.unsplash.com/photo-1550525811-e5869dd03032",
};
const ResizeableSidebar = ({
  defaultLayout = [5, 440, 655],
  defaultCollapsed = true,
  navCollapsedSize,
  children,
}: ResizeableSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const onCollapsed = () => {
    // setIsCollapsed(collapsed);
    setIsCollapsed(true);
    // document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
    //   collapsed
    // )}`;
  };

  return (
    <div className="w-full h-full">
      <ResizablePanelGroup
        direction="horizontal"
        className="w-full h-full"
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
          minSize={12}
          maxSize={18}
          onCollapse={onCollapsed}
          className={cn(
            isCollapsed &&
              "min-w-[50px] min-h-full transition-all duration-300 ease-in-out"
          )}
          onExpand={() => setIsCollapsed(false)}
        >
          <div className="flex flex-col h-full justify-between p-2 gap-5">
            <div
              className={`${
                isCollapsed ? "flex" : "flex flex-col"
              }mb-10 items-center justify-between`}
            >
              <Logo />

              {!isCollapsed && <ThemeToggle />}
            </div>
            <div className="flex-1 sm: mt-5">
              <Nav
                isCollapsed={isCollapsed}
                links={[
                  {
                    title: "Dashboard",
                    icon: Inbox,
                    variant: "default",
                    href: "/dashboard",
                  },
                  {
                    title: "Rewrite",
                    label: "",
                    icon: SquarePen,
                    variant: "ghost",
                    href: "/dashboard/rewrite",
                  },
                  {
                    title: "AI Writing",
                    label: "",
                    icon: ReceiptText,
                    variant: "ghost",
                    href: "/dashboard/ai-writing",
                  },
                ]}
              />
              <div className="sm:mt-14 flex w-full justify-center sm:justify-start sm:px-2 ">
                <span className="text-md font-semibold ">Tools</span>
              </div>
              <Nav
                isCollapsed={isCollapsed}
                links={[
                  {
                    title: "Image Generator",
                    label: "",
                    icon: Image,
                    variant: "ghost",
                    href: "dashboard/image-generator",
                  },
                  {
                    title: "Content Detector",
                    label: "",
                    icon: Siren,
                    variant: "ghost",
                    href: "dashboard/content-detector",
                  },
                  {
                    title: "AI Chat",
                    label: "",
                    icon: MessageSquareMore,
                    variant: "ghost",
                    href: "dashboard/ai-chat",
                  },
                  {
                    title: "Summarizer",
                    label: "",
                    icon: BookText,
                    variant: "ghost",
                    href: "dashboard/summarizer",
                  },
                ]}
              />
            </div>
            {isCollapsed ? (
              <Link
                className=" w-full flex items-center justify-center mb-5"
                href="/forms"
              >
                <Avatar className="border border-violet-800">
                  <AvatarImage src={UserData.image} alt="Avatar" />
                  <AvatarFallback>
                    {!UserData.image &&
                      UserData.title.charAt(0) + UserData.title.charAt(1)}
                  </AvatarFallback>
                </Avatar>
              </Link>
            ) : (
              <Link
                className=" w-full flex items-center gap-2 p-2 border rounded-lg mb-5"
                href="/forms"
              >
                <Avatar className="border border-violet-800">
                  <AvatarImage src={UserData.image} alt="Avatar" />
                  <AvatarFallback>
                    {!UserData.image &&
                      UserData.title.charAt(0) + UserData.title.charAt(1)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold ">
                    {UserData.title}
                  </span>
                  <span className="text-xs text-gray-500">Admin</span>
                </div>
              </Link>
            )}
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>{children}</ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default ResizeableSidebar;
