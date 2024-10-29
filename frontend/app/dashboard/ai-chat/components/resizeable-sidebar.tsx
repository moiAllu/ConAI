"use client";
import React, { Children, use } from "react";
import { cn } from "@/lib/utils";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { categorizeChatMessages } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useMeStore } from "../../store";
import { Ellipsis } from "lucide-react";
import { useAIChatStore } from "../store";
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
  const chats = useAIChatStore((state) => state.chats);
  const [filterChatHistory, setChatHistory] = React.useState(
    categorizeChatMessages([])
  );
  const router = useRouter();
  const { _id } = useMeStore();
  const [mouseEnter, setMouseEnter] = React.useState("");

  const onCollapsed = (collapsed: any) => {
    setIsCollapsed(true);
    document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
      collapsed
    )}`;
  };

  React.useEffect(() => {
    // fetch Chat History
    async function fetchChatHistory(userId: string) {
      const res = await fetch(
        "http://localhost:8000/api/chat/ai-assistant/chats/" + userId,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("accessToken") || "",
          },
          method: "GET",
          credentials: "include",
        }
      );
      const resp = await res.json();
      if (resp?.data?.length) {
        setChatHistory(() => categorizeChatMessages(resp.data.reverse()));
      }
    }

    fetchChatHistory(_id);
  }, [_id]);

  const handleChatChange = (chat: any) => {
    if (chat?.chatId) {
      return router.push(`/dashboard/ai-chat?chatId=${chat.chatId}`);
    }

    return router.push(`/dashboard/ai-chat`);
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
        <div className="flex flex-col px-2 py-5  m-2 rounded-lg gap-5 h-full ">
          <div className=" flex justify-between items-center">
            <h1 className="font-bold text-2xl">Chats</h1>
            {
              // Chat add button
            }
            <CirclePlus
              onClick={() => handleChatChange(null)}
              className="cursor-pointer"
            />
          </div>
          {filterChatHistory.map((grp, index) => (
            <div
              className="w-full overflow-y-auto min-h-[150px] h-fulls"
              key={index}
            >
              <h3 className="text-sm font-semibold">{grp.category}</h3>
              <Separator className="my-1" />
              {grp.chats.map((message, index) => (
                <div
                  className="flex items-center w-full  my-1"
                  onMouseEnter={() => setMouseEnter(message.chatId || "")}
                  onMouseLeave={() => setMouseEnter("")}
                  key={index}
                >
                  <Button
                    className="py-1 w-full justify-start rounded-r-none"
                    size="sm"
                    variant="secondary"
                    key={index}
                    onClick={() => handleChatChange(message)}
                  >
                    <p className="text-xs dark:text-gray-400">
                      {message?.title.slice(0, 25) + "..."}
                    </p>
                  </Button>
                  {mouseEnter === message.chatId && (
                    <Button
                      className="py-1 justify-start rounded-l-none"
                      size="sm"
                      variant="secondary"
                    >
                      <Ellipsis />
                    </Button>
                  )}
                </div>
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
