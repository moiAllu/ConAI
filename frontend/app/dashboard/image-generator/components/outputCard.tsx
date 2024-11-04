import React, { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { useMeStore } from "../../store";
import { useSearchParams } from "next/navigation";
import { getImageById } from "@/lib/apicalls/image-generation";
import { useImageStore } from "../store";
// import { Image } from "lucide-react";
import Image from "next/image";
import { fileTypeFromBuffer } from "file-type";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const OutputCard = () => {
  const userId = useMeStore((state) => state._id);
  const [base64Image, setBase64Image] = React.useState() as any;
  const { addImage, images } = useImageStore();
  const searchParams = useSearchParams();
  const imageId = searchParams.get("imageId") || "";
  const selectedImage = images.find((img) => img._id === imageId);
  useEffect(() => {
    if (!imageId) return;
    const fetchImageById = async () => {
      const response = await getImageById(imageId, userId);
      if (response.status === 200) {
        const imageData = response.data.data;
        addImage(imageData);
        setBase64Image(imageData.image);
      }
    };
    fetchImageById();
  }, [imageId]);
  return (
    <div className="relative flex h-full w-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2 ">
      {!selectedImage && (
        <Badge variant="outline" className="absolute right-3 top-3">
          Output
        </Badge>
      )}
      <div className="w-full h-full sm:overflow-y-auto">
        {base64Image && (
          <div className="gap-2  flex flex-col w-full mt-2 h-full">
            <h1 className="md:hidden font-semibold w-full text-center">
              {selectedImage?.prompt}
            </h1>
            <div className="flex w-full gap-2 justify-evenly h-full items-center">
              <div>
                <h1 className="md:flex justify-center hidden font-semibold w-full">
                  {selectedImage?.prompt}
                </h1>
                <Image
                  src={`data:image/png;base64,${base64Image}`}
                  width={500}
                  height={500}
                  alt="Base64 Example"
                  className="rounded-lg 2xl:w-[800px] lg:max-w-[1080px] max-w-[320px] sm:max-w-[400px] md:max-w-[400px] "
                />
                <div className="h-full flex flex-col md:flex-row gap-2 justify-center mt-2">
                  <Button variant="default"> Download 720p </Button>
                  <Button variant="default"> Download 1080p </Button>
                  <Button variant="default"> Download Original</Button>
                </div>
              </div>
              <div className="md:flex hidden">
                <Card className="border-none bg-inherit md:visible">
                  <CardHeader className="p-0">
                    <CardTitle className="text-lg">Revised Prompt</CardTitle>
                  </CardHeader>
                  <Separator className="my-1" />
                  <CardDescription>
                    <p className=" flex text-sm justify-center text-justify h-full items-center max-w-xs">
                      {selectedImage?.revised_prompt}
                    </p>
                  </CardDescription>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputCard;
