"use client";
import React, { useEffect } from "react";
import { useMeStore } from "../../store";
import { get, orderBy, sortBy } from "lodash";
import { getUserAiWritings } from "@/lib/apicalls/ai-writing";
import { DrawerDescription } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { categorizeChatMessages } from "@/lib/utils";

interface HistoryProps {
  _id: string;
  title: string;
  createdAt: string;
}
const DrawerHistory = () => {
  const [history, setHistory] = React.useState([] as HistoryProps[]);
  const [documentId, setDocumentId] = React.useState("");
  const [mouseEnter, setMouseEnter] = React.useState("");

  const { _id: userId } = useMeStore();
  const router = useRouter();

  useEffect(() => {
    const getAiResponse = async () => {
      const response = await getUserAiWritings(userId);
      setHistory(response.data);
    };
    getAiResponse();
  }, []);
  return (
    <div className="overflow-y-auto overflow-x-hidden p-2">
      <DrawerDescription className="text-left">
        {orderBy(history, ["createdAt"], ["desc"]).map((doc: HistoryProps) => (
          <div
            className="flex items-center w-full  my-1 rounded-md"
            key={doc?._id}
            onMouseEnter={() => setMouseEnter(doc?._id)}
          >
            <Button
              className="py-1 w-full justify-start rounded-r-none"
              size="sm"
              variant="secondary"
              key={doc?._id}
              // onClick={() => setDocumentId(doc?._id)}
              onClick={() =>
                router.push(`/dashboard/ai-writing?documentId=${doc?._id}`)
              }
            >
              <p className="text-xs dark:text-gray-400">
                {doc?.title.slice(0, 30)}...
              </p>
            </Button>
            {mouseEnter === doc?._id && (
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
export default DrawerHistory;
