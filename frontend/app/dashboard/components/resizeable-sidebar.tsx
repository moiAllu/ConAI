"use client";
import React from "react";
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
import { useWindowSize } from "@/lib/hooks";
import { usePathname } from "next/navigation";
import { useMeStore } from "../store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { BadgeCheck, Bell, CreditCard, LogOut, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logOutUser } from "@/lib/apicalls/user";

interface ResizeableSidebarProps {
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
  children: React.ReactNode;
}

const ResizeableSidebar = ({
  defaultLayout = [5, 440, 655],
  defaultCollapsed = true,
  navCollapsedSize,
  children,
}: ResizeableSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const { name, avatar } = useMeStore();
  const onCollapsed = () => {
    // setIsCollapsed(collapsed);
    setIsCollapsed(true);
    // document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
    //   collapsed
    // )}`;
  };
  const pathname = usePathname();
  const isPhone = useWindowSize().width < 640;

  const logOutHandler = async () => {
    const response = await logOutUser();
    if (response.status === 200) {
      window.location.href = "/login";
      localStorage.removeItem("accessToken");
      localStorage.removeItem("aiChatStore");
      localStorage.removeItem("aiWritingStore");
      localStorage.removeItem("rewriteStore");
      localStorage.removeItem("summarizerStore");
      localStorage.removeItem("imageStore");
      localStorage.removeItem("content-detector");
      localStorage.removeItem("meStore");
      return;
    }
  };
  return (
    <div className="w-full h-full ">
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
              className={` ${
                isCollapsed && "h-16"
              } flex items-center justify-between w-full `}
            >
              {isCollapsed ? (
                <div className="flex items-center justify-center w-full">
                  <span className="text-4xl font-bold ">C</span>
                </div>
              ) : (
                <Logo />
              )}
              {!isCollapsed && <ThemeToggle />}
            </div>
            <div className="flex-1 sm: mt-5">
              <Nav
                isCollapsed={isCollapsed}
                links={[
                  {
                    title: "Dashboard",
                    icon: Inbox,
                    variant: pathname === "/dashboard" ? "default" : "ghost",
                    href: "/dashboard",
                  },
                  {
                    title: "Rewrite",
                    label: "",
                    icon: SquarePen,
                    variant:
                      pathname === "/dashboard/rewrite" ? "default" : "ghost",

                    href: "/dashboard/rewrite",
                  },
                  {
                    title: "AI Writing",
                    label: "",
                    icon: ReceiptText,
                    variant:
                      pathname === "/dashboard/ai-writing"
                        ? "default"
                        : "ghost",
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
                    variant:
                      pathname === "/dashboard/image-generator"
                        ? "default"
                        : "ghost",
                    href: "/dashboard/image-generator",
                  },
                  {
                    title: "Content Detector",
                    label: "",
                    icon: Siren,
                    variant:
                      pathname === "/dashboard/content-detector"
                        ? "default"
                        : "ghost",
                    href: "/dashboard/content-detector",
                  },
                  {
                    title: "AI Chat",
                    label: "",
                    icon: MessageSquareMore,
                    variant:
                      pathname === "/dashboard/ai-chat" ? "default" : "ghost",
                    href: "/dashboard/ai-chat",
                  },
                  {
                    title: "Summarizer",
                    label: "",
                    icon: BookText,
                    variant:
                      pathname === "/dashboard/summarizer"
                        ? "default"
                        : "ghost",
                    href: "/dashboard/summarizer",
                  },
                ]}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`w-full flex   ${
                    !isCollapsed ? "border gap-2 p-2 rounded-lg" : "lg:ml-2"
                  }  mb-5`}
                >
                  <Avatar className="border border-violet-800">
                    <AvatarImage src={avatar} alt="Avatar" />
                    <AvatarFallback>
                      {!avatar && name.charAt(0) + name.charAt(1)}
                    </AvatarFallback>
                  </Avatar>
                  {!isCollapsed && (
                    <div className="flex flex-col w-full text-start ">
                      <span className="text-sm font-semibold ">{name}</span>
                      <span className="text-xs text-gray-500">Admin</span>
                    </div>
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal"></DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link
                      href="/forms/subscription"
                      className="flex items-center space-x-1"
                    >
                      <Sparkles />
                      <span>Upgrade to Pro</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link
                      href="/forms/account"
                      className="flex items-center space-x-1"
                    >
                      <BadgeCheck />
                      <span>Account</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href="/forms/subscription"
                      className="flex items-center space-x-1"
                    >
                      <CreditCard />
                      <span>Billing</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href="/forms/notifications"
                      className="flex items-center space-x-1"
                    >
                      <Bell />
                      <span>Notifications</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logOutHandler}>
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>{children}</ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default ResizeableSidebar;
