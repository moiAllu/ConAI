"use client";
import React, { useEffect, useRef } from "react";
import { useMeStore } from "../../store";
import { getUserContentDetections } from "@/lib/apicalls/content-detection";
import { DrawerDescription, DrawerTitle } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";

const ContentDetectorHistory = () => {
  const [history, setHistory] = React.useState({
    aiDetection: [],
    plagrismDetection: [],
  });
  const [mouseEnter, setMouseEnter] = React.useState("");

  const { _id: userId } = useMeStore();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const getAiResponse = async () => {
      const response = await getUserContentDetections(userId);
      setHistory(response.data);
    };
    getAiResponse();
  }, []);

  const HistoryCard = ({ doc, title }: any) => {
    const reversedDoc = [...doc].reverse();

    return (
      <div className=" p-2 flex-col h-full space-y-2">
        <DrawerTitle>{title}</DrawerTitle>
        <DrawerDescription className="overflow-y-scroll flex-col max-h-[400px]">
          {reversedDoc.map((item: any) => (
            <div
              className="flex items-center w-full my-1 rounded-md"
              key={item?._id}
              // onMouseEnter={() => setMouseEnter(item?._id)}
              onMouseLeave={() => setMouseEnter("")}
            >
              <Button
                className="py-1 w-full justify-start rounded-r-none"
                size="sm"
                variant="secondary"
                onClick={() =>
                  router.push(
                    `/dashboard/content-detector?documentId=${item?._id}`
                  )
                }
              >
                <p className="text-xs dark:text-gray-400 sm:flex hidden ">
                  {item.prompt.length > 50
                    ? item?.prompt.substring(0, 50) + "..."
                    : item?.prompt}
                </p>
                <p className="text-xs dark:text-gray-400 sm:hidden">
                  {item.prompt.length > 50
                    ? item?.prompt.substring(0, 20) + "..."
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
    <div className="flex flex-col overflow-hidden h-[90vh]">
      <HistoryCard
        key="aiDetection"
        doc={history.aiDetection}
        title="AI Detection"
      />
      <Separator className="my-2" />
      <HistoryCard
        key="plagiarismDetection"
        doc={history.plagrismDetection}
        title="Plagiarism Detection"
      />
    </div>
  );
};

export default ContentDetectorHistory;
