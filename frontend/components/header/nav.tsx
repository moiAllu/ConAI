"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LucideIcon } from "lucide-react";
import { Settings, History } from "lucide-react";
import { useMeStore } from "../../app/dashboard/store";
import DeleteAlert from "../custom/deleteAlert";

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
  /** Label for the settings/form drawer on mobile (e.g. "Write" for Rewrite). Default "Settings". */
  mobileSettingsLabel?: string;
}

const Nav = (props: NavProps) => {
  const router = useRouter();
  const { setRewrites, rewrites, deleteRewrite } = useRewriteStore();
  const { setSummarizers, summarizers, deleteSummarizer } =
    useSummarizerStore();
  const { setImagesIds, images, deleteImage } = useImageStore();
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
  const settingsLabel = props.mobileSettingsLabel ?? "Settings";
  const TitleIcon = props.icon;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-2 px-3 sm:px-4">
        {/* On desktop: title + icon. On mobile: hidden (feature name is in top navbar). */}
        <div className="hidden min-w-0 flex-1 items-center gap-2 md:flex">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted/50">
            <TitleIcon className="h-4 w-4 text-muted-foreground sm:h-5 sm:w-5" />
          </div>
          <h1 className="truncate text-lg font-semibold sm:text-2xl sm:font-bold">
            {props.title}
          </h1>
        </div>
        {/* On mobile: actions take full width for more space. */}
        <div className="flex min-w-0 flex-1 flex-wrap items-center justify-end gap-2 md:flex-initial md:flex-shrink-0">
          <Drawer direction="left">
            <DrawerTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-10 min-w-0 flex-1 gap-2 rounded-xl border border-border/40 bg-muted/20 px-3 text-sm font-medium md:flex-initial md:h-9 md:min-w-0 md:rounded-lg md:border-0 md:bg-transparent md:px-2.5 md:text-xs [&_svg]:shrink-0"
              >
                <History className="h-4 w-4 md:h-5 md:w-5" />
                <span>History</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="w-screen sm:max-w-[450px] max-w-[270px] h-full">
              {props.title !== "Content-Detector" && (
                <DrawerHeader className="h-full w-full flex flex-col">
                  <DrawerTitle className="text-center mb-0">
                    History
                  </DrawerTitle>
                  <div className="overflow-y-auto overflow-x-hidden p-2 h-full">
                    <DrawerDescription className="text-left">
                      {props.title === "Image-Generator" &&
                        orderBy(images, ["createdAt"], ["desc"]).map(
                          (img: any) => (
                            <div
                              className="flex items-center w-full  my-1 rounded-md"
                              key={img?._id}
                              onMouseEnter={() => setMouseEnter(img?._id)}
                              onMouseLeave={() => setMouseEnter("")}
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
                                  {img?.prompt.slice(0, 30) + "..."}
                                </span>
                              </Button>
                              {mouseEnter === img?._id && (
                                <DeleteAlert
                                  _id={img?._id}
                                  mode="imagegeneration"
                                  userId={userId}
                                  history={history}
                                  setHistory={deleteImage}
                                />
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
                              onMouseLeave={() => setMouseEnter("")}
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
                                  {rewrite?.input.slice(0, 30) + "..."}
                                </span>
                              </Button>
                              {mouseEnter === rewrite?._id && (
                                <DeleteAlert
                                  _id={rewrite?._id}
                                  mode="rewrite"
                                  userId={userId}
                                  history={history}
                                  setHistory={deleteRewrite}
                                />
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
                              onMouseEnter={() =>
                                setMouseEnter(summarizer?._id)
                              }
                              onMouseLeave={() => setMouseEnter("")}
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
                                  {summarizer?.input.slice(0, 30) + "..."}
                                </span>
                              </Button>
                              {mouseEnter === summarizer?._id && (
                                <DeleteAlert
                                  _id={summarizer?._id}
                                  mode="summarizer"
                                  userId={userId}
                                  history={history}
                                  setHistory={deleteSummarizer}
                                />
                              )}
                            </div>
                          )
                        )}
                    </DrawerDescription>
                  </div>
                </DrawerHeader>
              )}
              <DrawerDescription>{props.history}</DrawerDescription>
            </DrawerContent>
          </Drawer>
          <Drawer>
            <DrawerTrigger asChild>
              <Button
                variant="default"
                size="sm"
                className="h-10 min-w-0 flex-1 gap-2 rounded-xl bg-foreground px-3 text-sm font-medium text-background hover:bg-foreground/90 md:hidden [&_svg]:shrink-0"
              >
                <Settings className="h-4 w-4" />
                <span>{settingsLabel}</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="h-full w-full">
              <DrawerHeader>
                <DrawerTitle>{settingsLabel}</DrawerTitle>
                <DrawerDescription>
                  {props.title === "Rewrite"
                    ? "Enter text, choose options, and rewrite."
                    : props.title === "Image-Generator"
                    ? "Choose style, aspect, and describe your image to generate."
                    : props.title === "Content-Detector"
                    ? "Paste content and run plagiarism or AI detection."
                    : props.title === "Summarizer"
                    ? "Paste content, choose intensity, and summarize."
                    : "Configure the settings for the model and messages."}
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
