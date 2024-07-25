"use client";
import React, { Children } from "react";
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
interface ResizeableSidebarProps {
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
  children: React.ReactNode;
}

// const chatHistory: IChat[] = [
//   {
//     title: 'Morning Coffee Plans',
//     dateTime: new Date('2024-07-11T07:30:00'), // Example date and time (YYYY-MM-DDTHH:mm:ss)
//     content:
//       'Alice and Bob discuss plans to meet for coffee later in the day. 🍵☕️',
//   },
//   {
//     title: 'Morning Coffee Plans',
//     dateTime: new Date('2024-07-11T07:30:00'), // Example date and time (YYYY-MM-DDTHH:mm:ss)
//     content:
//       'Alice and Bob discuss plans to meet for coffee later in the day. 🍵☕️',
//   },
//   {
//     title: 'Morning Coffee Plans',
//     dateTime: new Date('2024-07-11T07:30:00'), // Example date and time (YYYY-MM-DDTHH:mm:ss)
//     content:
//       'Alice and Bob discuss plans to meet for coffee later in the day. 🍵☕️',
//   },
//   {
//     title: 'Project Update',
//     dateTime: new Date('2024-07-10T10:15:00'),
//     content:
//       'Team A shares progress updates and assigns tasks for the day. 📈📋',
//   },
//   {
//     title: 'Lunch Break Ideas',
//     dateTime: new Date('2024-07-09T12:00:00'),
//     content:
//       'Alice and Bob brainstorm lunch options and decide on a nearby restaurant. 🍔🥗',
//   },
//   {
//     title: 'Client Meeting Prep',
//     dateTime: new Date('2024-07-04T14:30:00'),
//     content:
//       'Alice and Emily discuss strategies and preparations for an upcoming client meeting. 📊📅',
//   },
//   {
//     title: 'Technical Discussion',
//     dateTime: new Date('2024-06-27T16:45:00'),
//     content:
//       'Alice and Charlie troubleshoot technical issues and brainstorm solutions. 💻🔧',
//   },
// ];

const ResizeableSidebar = ({
  defaultLayout = [5, 440, 655],
  defaultCollapsed = true,
  navCollapsedSize,
  children,
}: ResizeableSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const [filterChatHistory, setChatHistory] = React.useState(
    categorizeChatMessages([])
  );
  const router = useRouter();
  const { _id } = useMeStore();
  console.log(_id);

  const onCollapsed = (collapsed: any) => {
    // setIsCollapsed(collapsed);
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
        setChatHistory(() => categorizeChatMessages(resp.data));
      }
    }

    fetchChatHistory(_id);
  }, []);

  const handleChatChange = (chat: any) => {
    if (chat?._id) {
      return router.push(`/dashboard/ai-chat?chatId=${chat._id}`);
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
        <div className="flex flex-col px-2 py-5  m-2 rounded-lg gap-5 ">
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
            <div className="w-full" key={index}>
              <h3 className="text-sm font-semibold">{grp.category}</h3>
              <Separator className="my-1" />
              {grp.chats.map((message, index) => (
                <Button
                  className="py-1 w-full justify-start my-1"
                  size="sm"
                  variant="secondary"
                  key={index}
                  onClick={() => handleChatChange(message)}
                >
                  <p className="text-xs dark:text-gray-400">
                    {message?.title ||
                      message?.messages[0]?.message?.slice(0, 10) + "..."}
                  </p>
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
