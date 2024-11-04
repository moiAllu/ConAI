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

interface NavProps {
  children: React.ReactNode;
  history?: React.ReactNode;
  title: string;
  icon: LucideIcon;
}

const Nav = (props: NavProps) => {
  const router = useRouter();
  const [mouseEnter, setMouseEnter] = useState("");
  const { setImagesIds, images } = useImageStore();
  const userId = useMeStore((state) => state._id);
  React.useEffect(() => {
    const fetchImages = async () => {
      const response = await getUserImages(userId);
      if (response.status === 200) {
        setImagesIds(response.data.data);
      }
    };
    if (props.title === "Image-Generator") {
      fetchImages();
    }
  }, []);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between px-4">
        <div className=" flex space-x-2 items-center">
          <ReceiptText className="font-bold " />
          <h1 className="sm:text-2xl font-bold text-xl">{props.title}</h1>
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
                    {orderBy(images, ["createdAt"], ["desc"]).map(
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
                            <p className="text-xs dark:text-gray-400">
                              {img?.prompt?.lenght === 40
                                ? img?.prompt.slice(0, 40) + "..."
                                : img?.prompt}
                            </p>
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
        <Button
          className="flex justify-start space-x-1 items-center"
          variant="ghost"
        >
          <UploadIcon />
          <span className="hidden sm:flex">Share</span>
        </Button>
      </div>
      <Separator className="my-2" />
    </div>
  );
};

export default Nav;
