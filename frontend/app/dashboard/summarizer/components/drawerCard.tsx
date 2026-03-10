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
import { createSummarize } from "@/lib/apicalls/summarize";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { useMeStore } from "../../store";
import { useSummarizerStore } from "../store";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const MAX_CHARS_COUNT = 9000;
const countWords = (str: string) => `${str.length} / ${MAX_CHARS_COUNT}`;

const labelClass =
  "text-[10px] font-medium uppercase tracking-wider text-muted-foreground";
const triggerClass = "h-8 rounded-lg border-border/80 bg-muted/30 text-xs";

const DrawerCard = () => {
  const [intensity, setIntensity] = React.useState("Medium");
  const [content, setContent] = React.useState("");
  const { _id: userId, incrementUsageLimit, stripe_subscription_id } =
    useMeStore();
  const { addSummarizer } = useSummarizerStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      toast.error("Content cannot be empty");
      return;
    }
    setIsLoading(true);
    const response = await createSummarize(
      intensity,
      content,
      userId,
      stripe_subscription_id || ""
    );
    setIsLoading(false);
    if (response.status === 200) {
      incrementUsageLimit("summarize");
      toast.success("Summarized successfully");
      addSummarizer(response.data);
      router.push(`/dashboard/summarizer?summarizeId=${response.data._id}`);
      setContent("");
    } else if (response.status === 403) {
      toast.error(response.message);
    } else {
      toast.error("Failed to summarize");
    }
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
        <div className="flex flex-wrap items-end gap-3">
          <div className="space-y-1">
            <label className={labelClass}>Intensity</label>
            <Select
              value={intensity}
              onValueChange={setIntensity}
              disabled={isLoading}
            >
              <SelectTrigger className={cn(triggerClass, "w-[110px]")}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Short">Short</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Long">Long</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-1.5 rounded-xl border border-border/40 bg-muted/10 p-3">
          <Textarea
            value={content}
            onChange={(e) => {
              if (e.target.value.length <= MAX_CHARS_COUNT)
                setContent(e.target.value);
            }}
            id="content"
            placeholder="Paste or type content to summarize…"
            disabled={isLoading}
            className={cn(
              "min-h-[120px] max-h-[min(400px,60vh)] resize-y rounded-lg border-border/50 bg-background/90 text-sm",
              "placeholder:text-muted-foreground/60 focus-visible:ring-2 focus-visible:ring-primary/20"
            )}
          />
          <p className="text-right text-[10px] text-muted-foreground">
            {countWords(content)}
          </p>
        </div>

        <Button
          type="submit"
          disabled={isLoading || !content.trim()}
          className={cn(
            "h-9 w-full shrink-0 rounded-xl text-sm font-medium",
            "bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
          )}
        >
          {isLoading ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            "Summarize"
          )}
        </Button>
      </div>
    </form>
  );
};

export default DrawerCard;
