import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UploadIcon, ReceiptText, IconNode, LucideIcon } from "lucide-react";
import { Settings, History } from "lucide-react";
import { useMeStore } from "../../app/dashboard/store";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { getUserImages } from "@/lib/apicalls/image-generation";
import { useImageStore } from "@/app/dashboard/image-generator/store";
import { useRouter } from "next/navigation";
import { orderBy } from "lodash";
import { Ellipsis } from "lucide-react";
import { useState } from "react";
import { useRewriteStore } from "../../app/dashboard/rewrite/store";
import { getUserRewritesHistory } from "@/lib/apicalls/rewrite";
import { getUserSummarizesHistory } from "@/lib/apicalls/summarize";
import { useSummarizerStore } from "@/app/dashboard/summarizer/store";

interface NavProps {
  children: React.ReactNode;
  history?: React.ReactNode;
  title: string;
  icon: LucideIcon;
}

const Nav = (props: NavProps) => {
  const router = useRouter();
  const { setRewrites, rewrites } = useRewriteStore();
  const { setSummarizers, summarizers } = useSummarizerStore();
  const { setImagesIds, images } = useImageStore();
  const [mouseEnter, setMouseEnter] = useState("");
  const userId = useMeStore((state) => state._id);
  React.useEffect(() => {
    const fetchImages = async () => {
      const response = await getUserImages(userId);
      if (response.status === 200) {
        setImagesIds(response.data.data);
      }
    };
    const fetchRewrites = async () => {
      const response = await getUserRewritesHistory(userId);
      if (response.status === 200) {
        setRewrites(response.data[0].rewrites.reverse());
      }
    };
    const fetchSummarizes = async () => {
      console.log("fetching", summarizers);
      const response = await getUserSummarizesHistory(userId);
      if (response.status === 200) {
        setSummarizers(response.data[0].summarizes.reverse());
      }
    };

    if (props.title === "Image-Generator") {
      fetchImages();
    } else if (props.title === "Rewrite") {
      fetchRewrites();
    } else if (props.title === "Summarizer") {
      fetchSummarizes();
    }
  }, [userId]);
  return (
    <div className="w-full">
      <div className="flex items-center justify-between px-4">
        <div className=" flex space-x-2 items-center">
          <ReceiptText className="font-bold " />
          <h1 className="sm:text-2xl font-bold text-lg">{props.title}</h1>
          <Drawer direction="left">
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="">
                <History />
                <span className="sr-only">history</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="w-screen max-w-[450px]">
              <DrawerHeader>
                <DrawerTitle>History</DrawerTitle>
                <div className="overflow-y-auto overflow-x-hidden p-2">
                  <DrawerDescription className="text-left">
                    {props.title === "Image-Generator" &&
                      orderBy(images, ["createdAt"], ["desc"]).map(
                        (img: any) => (
                          <div
                            className="flex items-center w-full  my-1 rounded-md"
                            key={img?._id}
                            onMouseEnter={() => setMouseEnter(img?._id)}
                          >
                            <Button
                              className="py-1 w-full justify-start rounded-r-none"
                              size="sm"
                              variant="secondary"
                              key={img?._id}
                              // onClick={() => setDocumentId(doc?._id)}
                              onClick={() =>
                                router.push(
                                  `/dashboard/image-generator?imageId=${img?._id}`
                                )
                              }
                            >
                              <span className="text-xs dark:text-gray-400">
                                {img?.prompt?.lenght === 40
                                  ? img?.prompt.slice(0, 40) + "..."
                                  : img?.prompt}
                              </span>
                            </Button>
                            {mouseEnter === img?._id && (
                              <Button
                                className="py-1 justify-start rounded-l-none"
                                size="sm"
                                variant="secondary"
                              >
                                <Ellipsis />
                              </Button>
                            )}
                          </div>
                        )
                      )}
                    {props.title === "Rewrite" &&
                      orderBy(rewrites, ["createdAt"], ["desc"]).map(
                        (rewrite: any) => (
                          <div
                            className="flex items-center w-full  my-1 rounded-md"
                            key={rewrite?._id}
                            onMouseEnter={() => setMouseEnter(rewrite?._id)}
                          >
                            <Button
                              className="py-1 w-full justify-start rounded-r-none"
                              size="sm"
                              variant="secondary"
                              key={rewrite?._id}
                              // onClick={() => setDocumentId(doc?._id)}
                              onClick={() =>
                                router.push(
                                  `/dashboard/rewrite?rewriteId=${rewrite?._id}`
                                )
                              }
                            >
                              <span className="text-xs dark:text-gray-400">
                                {rewrite?.input.slice(0, 40) + "..."}
                              </span>
                            </Button>
                            {mouseEnter === rewrite?._id && (
                              <Button
                                className="py-1 justify-start rounded-l-none"
                                size="sm"
                                variant="secondary"
                              >
                                <Ellipsis />
                              </Button>
                            )}
                          </div>
                        )
                      )}
                    {props.title === "Summarizer" &&
                      orderBy(summarizers, ["createdAt"], ["desc"]).map(
                        (summarizer: any) => (
                          <div
                            className="flex items-center w-full  my-1 rounded-md"
                            key={summarizer?._id}
                            onMouseEnter={() => setMouseEnter(summarizer?._id)}
                          >
                            <Button
                              className="py-1 w-full justify-start rounded-r-none"
                              size="sm"
                              variant="secondary"
                              key={summarizer?._id}
                              // onClick={() => setDocumentId(doc?._id)}
                              onClick={() =>
                                router.push(
                                  `/dashboard/summarizer?summarizeId=${summarizer?._id}`
                                )
                              }
                            >
                              <span className="text-xs dark:text-gray-400">
                                {summarizer?.input.slice(0, 40) + "..."}
                              </span>
                            </Button>
                            {mouseEnter === summarizer?._id && (
                              <Button
                                className="py-1 justify-start rounded-l-none"
                                size="sm"
                                variant="secondary"
                              >
                                <Ellipsis />
                              </Button>
                            )}
                          </div>
                        )
                      )}
                  </DrawerDescription>
                </div>
              </DrawerHeader>
              <DrawerDescription>{props.history}</DrawerDescription>
            </DrawerContent>
          </Drawer>
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Settings className="size-6" />
                <span className="sr-only">Settings</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[80vh]">
              <DrawerHeader>
                <DrawerTitle>Configuration</DrawerTitle>
                <DrawerDescription>
                  Configure the settings for the model and messages.
                </DrawerDescription>
              </DrawerHeader>
              {props.children}
            </DrawerContent>
          </Drawer>
        </div>
      </div>
      <Separator className="my-2" />
    </div>
  );
};

export default Nav;
