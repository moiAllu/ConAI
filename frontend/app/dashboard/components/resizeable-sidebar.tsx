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
  const onCollapsed = () => setIsCollapsed(true);
  const pathname = usePathname();
  useWindowSize().width;

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
      localStorage.removeItem("subscriptionStore");
      localStorage.removeItem("chatStore");
      localStorage.removeItem("planStore");
      return;
    }
  };

  return (
    <div className="flex h-full min-h-0 w-full flex-1 flex-col overflow-hidden bg-muted/30">
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full min-h-0 w-full"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={12}
          maxSize={18}
          onCollapse={onCollapsed}
          className={cn(
            "relative flex flex-col rounded-r-2xl border border-l-0 border-border/30 bg-card/80 shadow-lg shadow-black/5 backdrop-blur-xl dark:shadow-black/20",
            isCollapsed && "min-w-[64px] transition-all duration-300 ease-out",
          )}
          onExpand={() => setIsCollapsed(false)}
        >
          <div className="flex h-full min-h-0 flex-col">
            {/* Header */}
            <div
              className={cn(
                "flex shrink-0 items-center px-3",
                isCollapsed
                  ? "h-16 justify-center"
                  : "h-16 justify-between gap-2 px-4",
              )}
            >
              {isCollapsed ? (
                <Logo width={36} height={36} className="shrink-0" />
              ) : (
                <>
                  <Logo className="h-9 shrink-0" />
                  <ThemeToggle />
                </>
              )}
            </div>

            {/* Nav + Tools */}
            <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-3 pb-4 pt-1">
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
                    icon: SquarePen,
                    variant:
                      pathname === "/dashboard/rewrite" ? "default" : "ghost",
                    href: "/dashboard/rewrite",
                  },
                  {
                    title: "AI Writing",
                    icon: ReceiptText,
                    variant:
                      pathname === "/dashboard/ai-writing"
                        ? "default"
                        : "ghost",
                    href: "/dashboard/ai-writing",
                  },
                ]}
              />

              <div
                className={cn(
                  "flex flex-col gap-2",
                  isCollapsed && "items-center",
                )}
              >
                {!isCollapsed && (
                  <span className="px-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/70">
                    Tools
                  </span>
                )}
                <Nav
                  isCollapsed={isCollapsed}
                  links={[
                    {
                      title: "Image Generator",
                      icon: Image,
                      variant:
                        pathname === "/dashboard/image-generator"
                          ? "default"
                          : "ghost",
                      href: "/dashboard/image-generator",
                    },
                    {
                      title: "Content Detector",
                      icon: Siren,
                      variant:
                        pathname === "/dashboard/content-detector"
                          ? "default"
                          : "ghost",
                      href: "/dashboard/content-detector",
                    },
                    {
                      title: "AI Chat",
                      icon: MessageSquareMore,
                      variant:
                        pathname === "/dashboard/ai-chat" ? "default" : "ghost",
                      href: "/dashboard/ai-chat",
                    },
                    {
                      title: "Summarizer",
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
            </div>

            {/* User block */}
            <div className="shrink-0 p-3 pt-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className={cn(
                      "flex w-full items-center gap-3 rounded-2xl bg-muted/50 px-3 py-2.5 transition-all duration-200 hover:bg-muted/80",
                      isCollapsed && "justify-center px-2 py-3",
                    )}
                  >
                    <Avatar className="h-9 w-9 shrink-0 ring-2 ring-background shadow-sm">
                      <AvatarImage src={avatar} alt="Avatar" />
                      <AvatarFallback className="text-sm font-semibold bg-primary/15 text-primary">
                        {!avatar && name
                          ? name.charAt(0) + name.charAt(1)
                          : "?"}
                      </AvatarFallback>
                    </Avatar>
                    {!isCollapsed && (
                      <div className="flex min-w-0 flex-1 flex-col items-start text-left">
                        <span className="truncate text-sm font-semibold">
                          {name || "Account"}
                        </span>
                        <span className="text-[11px] text-muted-foreground">
                          Manage account
                        </span>
                      </div>
                    )}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="min-w-56 rounded-2xl border-border/50 shadow-xl"
                  side="right"
                  align="end"
                  sideOffset={12}
                >
                  <DropdownMenuLabel className="p-0 font-normal" />
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/forms/subscription"
                        className="flex cursor-pointer items-center gap-2.5"
                      >
                        <Sparkles className="h-4 w-4" />
                        <span>Upgrade to Pro</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/forms"
                        className="flex cursor-pointer items-center gap-2.5"
                      >
                        <BadgeCheck className="h-4 w-4" />
                        <span>Account</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/forms/billing"
                        className="flex cursor-pointer items-center gap-2.5"
                      >
                        <CreditCard className="h-4 w-4" />
                        <span>Billing</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/forms/notifications"
                        className="flex cursor-pointer items-center gap-2.5"
                      >
                        <Bell className="h-4 w-4" />
                        <span>Notifications</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logOutHandler}
                    className="text-destructive focus:text-destructive"
                  >
                    <LogOut className="h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle
          withHandle
          className="bg-border/40 hover:bg-border/70"
        />

        <ResizablePanel className="min-h-0 overflow-auto bg-background">
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default ResizeableSidebar;
