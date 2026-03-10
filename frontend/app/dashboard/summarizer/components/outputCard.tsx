"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getUserSummarizeById } from "@/lib/apicalls/summarize";
import { useSearchParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useMeStore } from "../../store";
import { useSummarizerStore } from "../store";
import { toast } from "sonner";
import { Copy, Sparkles, ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type OutputSize = "small" | "medium" | "large";
type ViewMode = "result" | "input";

const OutputCard = () => {
  const searchParams = useSearchParams();
  const userId = useMeStore((state) => state._id);
  const { addSummarizer, summarizers } = useSummarizerStore();
  const summarizeId = searchParams.get("summarizeId") || "";
  const selectedSummarize = summarizers.find((s) => s._id === summarizeId);
  const [outputSize, setOutputSize] = useState<OutputSize>("medium");
  const [viewMode, setViewMode] = useState<ViewMode>("result");

  useEffect(() => {
    if (!summarizeId || !userId) return;
    const fetchById = async () => {
      const response = await getUserSummarizeById(summarizeId, userId);
      if (response?.status === 200)
        addSummarizer(response?.data?.summarizers[0]);
    };
    fetchById();
  }, [summarizeId, userId, addSummarizer]);

  const handleCopy = () => {
    const text =
      viewMode === "result"
        ? selectedSummarize?.output
        : selectedSummarize?.input;
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => toast.success("Copied"));
  };

  if (!selectedSummarize) {
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
            Summary appears here
          </p>
          <p className="mt-1 text-xs text-muted-foreground/80">
            Summarize content to see the result.
          </p>
        </div>
      </div>
    );
  }

  const contentToShow =
    viewMode === "result"
      ? selectedSummarize.output ?? "—"
      : selectedSummarize.input ?? "—";

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
        <div className="flex items-center gap-2">
          <label className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            Size
          </label>
          <Select value={outputSize} onValueChange={(v) => setOutputSize(v as OutputSize)}>
            <SelectTrigger className="h-8 w-[90px] rounded-lg border-border/80 bg-muted/30 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Small</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="large">Large</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex rounded-lg border border-border/40 bg-muted/20 p-0.5">
          <button
            type="button"
            onClick={() => setViewMode("result")}
            className={cn(
              "rounded-md px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider transition-colors",
              viewMode === "result"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Result
          </button>
          <button
            type="button"
            onClick={() => setViewMode("input")}
            className={cn(
              "flex items-center gap-1 rounded-md px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider transition-colors",
              viewMode === "input"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <ArrowLeftRight className="h-3 w-3" />
            Input
          </button>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-8 gap-1.5 rounded-lg px-2.5 text-xs"
        >
          <Copy className="h-3.5 w-3.5" />
          {viewMode === "result" ? "Copy" : "Copy input"}
        </Button>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
        <div
          className={cn(
            "prose dark:prose-invert max-w-none text-foreground",
            "prose-p:leading-relaxed prose-p:my-1.5 prose-headings:font-semibold",
            outputSize === "small" && "prose-sm",
            outputSize === "large" && "prose-lg"
          )}
        >
          {viewMode === "result" ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{contentToShow}</ReactMarkdown>
          ) : (
            <div className="whitespace-pre-wrap break-words">{contentToShow}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OutputCard;
