"use client";
import React, { useEffect } from "react";
import { useMeStore } from "../../store";
import { get, orderBy, sortBy } from "lodash";
import {
  getUserAiWritings,
  getUserContentDetections,
} from "@/lib/apicalls/auth";
import { DrawerDescription, DrawerTitle } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { categorizeChatMessages } from "@/lib/utils";

const ContentDetectorHistory = () => {
  const [history, setHistory] = React.useState({
    aiDetection: [],
    plagrismDetection: [],
  });
  const [documentId, setDocumentId] = React.useState("");
  const [mouseEnter, setMouseEnter] = React.useState("");

  const { _id: userId } = useMeStore();
  const router = useRouter();

  useEffect(() => {
    const getAiResponse = async () => {
      const response = await getUserContentDetections(userId);
      setHistory(response.data);
    };
    getAiResponse();
  }, []);

  const HistoryCard = ({ doc, title }: any) => {
    return (
      <div className="overflow-y-auto overflow-x-hidden p-2 flex-col max-h-[200px] space-y-2">
        <DrawerTitle>{title}</DrawerTitle>
        <DrawerDescription className="">
          {doc.map((item: any, index: number) => (
            <div
              className="flex items-center w-full  my-1 rounded-md"
              key={item?._id}
              onMouseEnter={() => setMouseEnter(item?._id)}
            >
              <Button
                className="py-1 w-full justify-start rounded-r-none"
                size="sm"
                variant="secondary"
                key={item?._id}
                onClick={() =>
                  router.push(
                    `/dashboard/content-detector?documentId=${item?._id}`
                  )
                }
              >
                <p className="text-sm dark:text-gray-400">
                  {item.prompt.length > 50
                    ? item?.prompt.substring(0, 50) + "..."
                    : item?.prompt}
                </p>
              </Button>
              {mouseEnter === item?._id && (
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
        </DrawerDescription>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <HistoryCard doc={history.aiDetection} title="AI Detection" />
      <HistoryCard doc={history.plagrismDetection} title="Plagrism Detection" />
    </div>
  );
};

export default ContentDetectorHistory;
