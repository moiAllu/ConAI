"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { History } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { categorizeChatMessages } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useMeStore } from "../../store";
import { useRouter } from "next/navigation";
import { Ellipsis } from "lucide-react";
import { getChatHistory } from "@/lib/apicalls/chat-assisstance";

const DrawerChatHistory = () => {
  const [filterChatHistory, setChatHistory] = React.useState(
    categorizeChatMessages([])
  );
  const [mouseEnter, setMouseEnter] = React.useState("");
  const router = useRouter();
  const { _id } = useMeStore();

  const handleChatChange = (chat: any) => {
    if (chat?.chatId) {
      return router.push(`/dashboard/ai-chat?chatId=${chat.chatId}`);
    }

    return router.push(`/dashboard/ai-chat`);
  };
  React.useEffect(() => {
    // fetch Chat History
    async function fetchChatHistory(userId: string) {
      const resp = await getChatHistory(userId);
      if (resp?.data?.length) {
        setChatHistory(() => categorizeChatMessages(resp.data.reverse()));
      }
    }
    fetchChatHistory(_id);
  }, [_id]);
  return (
    <div className="sm:hidden">
      <Drawer direction="right">
        <DrawerTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <History className="size-6" />
            <span className="sr-only">Settings</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="jusitfy-start">
            <DrawerTitle className="text-left">History</DrawerTitle>
            <DrawerDescription className="text-left h-full ">
              {filterChatHistory.map((grp, index) => (
                <div
                  className="w-full overflow-y-auto h-full min-h-[150px]"
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
            </DrawerDescription>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default DrawerChatHistory;
