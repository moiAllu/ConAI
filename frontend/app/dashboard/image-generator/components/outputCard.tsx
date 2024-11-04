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
      <div className="w-full h-full overflow-y-auto">
        {base64Image && (
          <div className="gap-2  flex flex-col w-full mt-2 h-full">
            <h1 className="font-semibold w-full text-center">
              {selectedImage?.prompt}
            </h1>
            <div className="flex flex-col w-full gap-2 h-full items-center">
              <Image
                src={`data:image/png;base64,${base64Image}`}
                width={600}
                height={500}
                alt="Base64 Example"
                className="rounded-lg 2xl:w-[800px] lg:max-w-[1080px] lg:max-h-[900px] max-w-[320px] max-h-[500px] sm:max-w-[500px] sm:max-h-[700px] "
              />
              {/* <p className=" flex text-sm justify-center text-justify h-full items-center ">
                {selectedImage?.revised_prompt}
              </p> */}
            </div>
            <div className="h-full flex flex-col sm:flex-row gap-2 justify-center mt-2">
              <Button variant="default"> Download 720p </Button>
              <Button variant="default"> Download 1080p </Button>
              <Button variant="default"> Download Original</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputCard;
