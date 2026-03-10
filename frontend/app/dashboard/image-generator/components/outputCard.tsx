"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useMeStore } from "../../store";
import { useSearchParams } from "next/navigation";
import { getImageById } from "@/lib/apicalls/image-generation";
import { useImageStore } from "../store";
import Image from "next/image";
import { Download, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const OutputCard = () => {
  const userId = useMeStore((state) => state._id);
  const { addImage, images } = useImageStore();
  const searchParams = useSearchParams();
  const imageId = searchParams.get("imageId") || "";
  const selectedImage = images.find((img) => img._id === imageId);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"image" | "prompt">("image");

  useEffect(() => {
    if (!imageId || !userId) return;
    const fetchImageById = async () => {
      const response = await getImageById(imageId, userId);
      if (response.status === 200) {
        const imageData = response.data.data;
        addImage(imageData);
        setBase64Image(imageData.image);
      }
    };
    fetchImageById();
  }, [imageId, userId, addImage]);

  const handleDownload = () => {
    if (!base64Image) return;
    try {
      const byteCharacters = atob(base64Image);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "image/png" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `image-${selectedImage?._id ?? "download"}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error downloading image:", err);
    }
  };

  if (!selectedImage && !base64Image) {
    return (
      <div className="flex h-full min-h-0 w-full flex-col">
        <div
          className={cn(
            "flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-border/50 p-8",
            "bg-muted/5 bg-gradient-to-b from-muted/10 to-transparent"
          )}
        >
          <div className="rounded-full border border-border/40 bg-muted/20 p-3">
            <Sparkles className="h-7 w-7 text-muted-foreground/60" />
          </div>
          <p className="mt-3 text-sm font-medium text-muted-foreground">
            Image appears here
          </p>
          <p className="mt-1 text-xs text-muted-foreground/80">
            Generate an image to see the result.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex h-full min-h-0 w-full flex-col overflow-hidden rounded-2xl border border-border/50",
        "bg-background/70 shadow-sm backdrop-blur-sm"
      )}
    >
      <div className="flex shrink-0 flex-wrap items-center justify-end gap-2 border-b border-border/40 px-4 py-2">
        <span className="mr-auto text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          Result
        </span>
        <div className="flex rounded-lg border border-border/40 bg-muted/20 p-0.5">
          <button
            type="button"
            onClick={() => setViewMode("image")}
            className={cn(
              "rounded-md px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider transition-colors",
              viewMode === "image"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Image
          </button>
          <button
            type="button"
            onClick={() => setViewMode("prompt")}
            className={cn(
              "rounded-md px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider transition-colors",
              viewMode === "prompt"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Prompt
          </button>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDownload}
          className="h-8 gap-1.5 rounded-lg px-2.5 text-xs"
        >
          <Download className="h-3.5 w-3.5" />
          Download
        </Button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
        {viewMode === "image" ? (
          <div className="flex flex-col items-center gap-4">
            {selectedImage?.prompt && (
              <p className="text-center text-sm font-medium text-foreground max-w-lg">
                {selectedImage.prompt}
              </p>
            )}
            {base64Image && (
              <Image
                src={`data:image/png;base64,${base64Image}`}
                width={400}
                height={400}
                alt="Generated"
                className="rounded-xl max-w-full h-auto object-contain shadow-md"
              />
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Your prompt
              </p>
              <p className="mt-1 text-sm text-foreground">
                {selectedImage?.prompt ?? "—"}
              </p>
            </div>
            {selectedImage?.revised_prompt && (
              <div>
                <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  Revised prompt
                </p>
                <p className="mt-1 text-sm text-muted-foreground whitespace-pre-wrap">
                  {selectedImage.revised_prompt}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputCard;
