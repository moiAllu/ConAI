"use client";
import React, { useEffect } from "react";
import { useMeStore } from "../../store";
import { get, orderBy, sortBy } from "lodash";
import { getUserAiWritings } from "@/lib/apicalls/ai-writing";
import { DrawerDescription } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Ellipsis, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { categorizeChatMessages } from "@/lib/utils";
import DeleteAlert from "@/components/custom/deleteAlert";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface HistoryProps {
  _id: string;
  title: string;
  createdAt: string;
}
const DrawerHistory = () => {
  const [history, setHistory] = React.useState([] as HistoryProps[]);
  const [documentId, setDocumentId] = React.useState("");
  const [mouseEnter, setMouseEnter] = React.useState("");
  const [deleteAlert, setDeleteAlert] = React.useState(false);
  const [clickedId, SetClickedId] = React.useState("");

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
    <div className="h-full w-full overflow-y-auto overflow-x-hidden p-2">
      <DrawerDescription className="text-left">
        {orderBy(history, ["createdAt"], ["desc"]).map((doc: HistoryProps) => (
          <div
            className="h-full flex items-center w-full  my-1 rounded-md"
            key={doc?._id}
            onMouseEnter={() => setMouseEnter(doc?._id)}
            onMouseLeave={() => setMouseEnter("")}
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
              <DeleteAlert
                _id={doc?._id}
                mode="aiwriting"
                userId={userId}
                history={history}
                setHistory={setHistory}
              />
            )}
            {/* {(mouseEnter === doc?._id || clickedId === doc?._id) && (
              <Popover>
                <PopoverTrigger
                  onClick={() => SetClickedId(doc?._id)}
                  onChange={() => SetClickedId("")}
                >
                  <Button
                    className={`px-2 py-1.5 bg-inherit  `}
                    variant="secondary"
                  >
                    <Ellipsis />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="flex flex-col max-w-36 ">
                  <span className="z-[10000]">
                    Asdlasda sdasdas dasd asdas da
                  </span>
                  <DeleteAlert
                    _id={doc?._id}
                    mode="aiwriting"
                    userId={userId}
                    history={history}
                    setHistory={setHistory}
                  />
                </PopoverContent>
              </Popover>
            )} */}
          </div>
        ))}
      </DrawerDescription>
    </div>
  );
};
export default DrawerHistory;
