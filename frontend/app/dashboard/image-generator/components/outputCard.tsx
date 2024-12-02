import React, { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { useMeStore } from "../../store";
import { useSearchParams } from "next/navigation";
import {
  downloadImageEndPoint,
  getImageById,
} from "@/lib/apicalls/image-generation";
import { useImageStore } from "../store";
// import { Image } from "lucide-react";
import Image from "next/image";
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
  const downloadImage = async () => {
    const response = await downloadImageEndPoint(imageId, "1080");
    try {
      // Replace with your server's API endpoint
      const b64_json = response;

      // Determine the image type (e.g., png, jpeg). Adjust if needed.
      const imageType = "image/png"; // Change based on your image type

      // Create a Blob from the Base64 string
      const byteCharacters = atob(b64_json);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: imageType });

      // Create a link and trigger the download
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `downloaded_image${selectedImage?._id}.png`; // Set desired file name and extension
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the image:", error);
    }
  };
  const handleDownload = async () => {
    try {
      // Replace with your server's API endpoint
      const b64_json = base64Image;

      // Determine the image type (e.g., png, jpeg). Adjust if needed.
      const imageType = "image/png"; // Change based on your image type

      // Create a Blob from the Base64 string
      const byteCharacters = atob(b64_json);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: imageType });

      // Create a link and trigger the download
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `downloaded_image${selectedImage?._id}.png`; // Set desired file name and extension
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the image:", error);
    }
  };
  return (
    <div className="relative flex h-full w-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2 ">
      {!selectedImage && (
        <Badge variant="outline" className="absolute right-3 top-3">
          Output
        </Badge>
      )}
      <div className="w-full min-h-full overflow-y-auto">
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
                <Separator className="my-1" />
                {selectedImage ? (
                  <Image
                    src={`data:image/png;base64,${selectedImage?.image}`}
                    width={400}
                    height={400}
                    alt="Base64 Example"
                    className="rounded-lg 2xl:w-[700px] max-w-[320px] sm:max-w-[400px] md:max-w-[400px]"
                  />
                ) : (
                  <></>
                )}
                <Separator className="my-1" />
                <div className=" md:hidden h-full flex flex-col md:flex-row gap-2 justify-center mt-2">
                  <Button variant="default" onClick={handleDownload}>
                    {" "}
                    Download Original
                  </Button>
                </div>
              </div>
              <div className="md:flex md:flex-col hidden gap-1 items-start">
                <Card className="border-none bg-inherit md:visible shadow-none">
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
                <Separator className="my-1" />
                <div className="h-full flex flex-col md:flex-row gap-2 justify-center mt-1">
                  <Button variant="default" onClick={handleDownload}>
                    {" "}
                    Download Original
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputCard;
