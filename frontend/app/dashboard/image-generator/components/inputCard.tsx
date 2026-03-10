"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createImage } from "@/lib/apicalls/image-generation";
import { useRouter } from "next/navigation";
import React from "react";
import { useMeStore } from "../../store";
import { useImageStore } from "../store";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const labelClass =
  "text-[10px] font-medium uppercase tracking-wider text-muted-foreground";
const triggerClass = "h-8 rounded-lg border-border/80 bg-muted/30 text-xs";

const ASPECT_OPTIONS = ["square", "landscape", "portrait"];
const STYLE_OPTIONS = [
  "no style",
  "natural",
  "abstract",
  "art",
  "black and white",
  "colorful",
  "dark",
  "light",
  "modern",
  "vintage",
  "oilpainting",
  "watercolor",
  "sketch",
  "cartoon",
];
const BACKGROUND_OPTIONS = ["random", "white", "black"];
const COLOR_OPTIONS = [
  "natural",
  "Warm tone",
  "Cool tone",
  "Muted Color",
  "Vibrant Color",
  "No Color",
];

const MAX_CHARS_COUNT = 500;
const countWords = (str: string) => `${str.length} / ${MAX_CHARS_COUNT}`;

const InputCard = () => {
  const userId = useMeStore((state) => state._id);
  const { incrementUsageLimit, stripe_subscription_id } = useMeStore();
  const [aspect, setAspect] = React.useState("square");
  const [style, setStyle] = React.useState("");
  const [background, setBackground] = React.useState("random");
  const [color, setColor] = React.useState("");
  const [prompt, setPrompt] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const { addImage } = useImageStore();
  const router = useRouter();

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!style || !color) {
      toast.error("Style and Color are required");
      return;
    }
    if (!prompt?.trim()) {
      toast.error("Enter a description prompt");
      return;
    }
    setIsLoading(true);
    const createdImage = await createImage(
      { aspect, style, background, color, prompt },
      userId,
      stripe_subscription_id || ""
    );
    if (createdImage.status === 200) {
      incrementUsageLimit("imageGeneration");
      addImage(createdImage.data.data);
      router.push(
        `/dashboard/image-generator?imageId=${createdImage.data.data._id}`
      );
      toast.success(createdImage.message);
      setPrompt("");
    } else if (createdImage.status === 403) {
      toast.error(createdImage.message);
    } else {
      toast.error(createdImage.message);
    }
    setIsLoading(false);
  };

  return (
    <form
      className={cn(
        "flex h-full min-h-0 w-full max-w-md flex-col gap-4 rounded-2xl border border-border/50",
        "bg-background/70 shadow-sm backdrop-blur-sm"
      )}
      onSubmit={formSubmitHandler}
    >
      <div className="shrink-0 space-y-3 px-4 pt-4">
        {/* Inline toolbar – same style as Rewrite / AI Writing */}
        <div className="flex flex-wrap items-end gap-3">
          <div className="space-y-1">
            <label className={labelClass}>Aspect</label>
            <Select value={aspect} onValueChange={setAspect} disabled={isLoading}>
              <SelectTrigger className={cn(triggerClass, "w-[100px]")}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ASPECT_OPTIONS.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <label className={labelClass}>Style</label>
            <Select value={style} onValueChange={setStyle} disabled={isLoading} required>
              <SelectTrigger className={cn(triggerClass, "w-[110px]")}>
                <SelectValue placeholder="Style" />
              </SelectTrigger>
              <SelectContent>
                {STYLE_OPTIONS.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <label className={labelClass}>Background</label>
            <Select value={background} onValueChange={setBackground} disabled={isLoading}>
              <SelectTrigger className={cn(triggerClass, "w-[95px]")}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {BACKGROUND_OPTIONS.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <label className={labelClass}>Color</label>
            <Select value={color} onValueChange={setColor} disabled={isLoading} required>
              <SelectTrigger className={cn(triggerClass, "w-[100px]")}>
                <SelectValue placeholder="Color" />
              </SelectTrigger>
              <SelectContent>
                {COLOR_OPTIONS.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Prompt zone – same as Rewrite */}
        <div className="flex min-h-0 flex-1 flex-col gap-1.5 rounded-xl border border-border/40 bg-muted/10 p-3">
          <Textarea
            id="content"
            value={prompt}
            onChange={(e) => {
              if (e.target.value.length <= MAX_CHARS_COUNT) setPrompt(e.target.value);
            }}
            placeholder="Describe the image you want…"
            disabled={isLoading}
            className={cn(
              "min-h-[120px] max-h-[min(400px,60vh)] resize-y rounded-lg border-border/50 bg-background/90 text-sm",
              "placeholder:text-muted-foreground/60 focus-visible:ring-2 focus-visible:ring-primary/20"
            )}
          />
          <p className="text-right text-[10px] text-muted-foreground">
            {countWords(prompt)}
          </p>
        </div>

        <Button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className={cn(
            "h-9 w-full shrink-0 rounded-xl text-sm font-medium",
            "bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
          )}
        >
          {isLoading ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            "Generate Image"
          )}
        </Button>
      </div>
    </form>
  );
};

export default InputCard;
