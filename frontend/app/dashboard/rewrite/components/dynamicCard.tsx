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
import { createRewrite } from "@/lib/apicalls/rewrite";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { useMeStore } from "../../store";
import { useRewriteStore } from "../store";
import { Loader2, ArrowRight, Upload, FileText, X } from "lucide-react";
import { cn } from "@/lib/utils";

const ACCEPT_UPLOAD = ".doc,.docx,.pdf,.txt";
const MAX_CHARS = 6000;

const DynamicCard = () => {
  const [intensity, setIntensity] = React.useState("Low");
  const [mode, setMode] = React.useState("Rewrite");
  const [language, setLanguage] = React.useState("Automatic");
  const [content, setContent] = React.useState("");
  const [uploadFileName, setUploadFileName] = React.useState<string | null>(
    null,
  );
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const userId = useMeStore((state) => state._id);
  const { incrementUsageLimit } = useMeStore();
  const stripe_subscription_id = useMeStore(
    (state) => state.stripe_subscription_id,
  );
  const router = useRouter();
  const { addRewrite } = useRewriteStore();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      toast.error("Enter some text to rewrite");
      return;
    }
    setIsLoading(true);
    const response = await createRewrite(
      mode === "Recreate" ? "High" : intensity,
      mode,
      language,
      content,
      userId,
      "gpt-4o",
      stripe_subscription_id || "",
    );
    if (response.status === 200) {
      incrementUsageLimit("rewrite");
      toast.success("Done");
      addRewrite(response.data);
      router.push(`/dashboard/rewrite?rewriteId=${response.data._id}`);
      setContent("");
    } else if (response.status === 403) {
      toast.error(response.message);
    }
    setIsLoading(false);
  };

  return (
    <form
      className={cn(
        "flex h-full min-h-0 w-full flex-col gap-4 rounded-2xl border border-border/50",
        "bg-background/70 shadow-sm backdrop-blur-sm",
      )}
      onSubmit={handleSubmit}
    >
      <div className="shrink-0 space-y-3 px-4 pt-4">
        <div className="flex flex-wrap items-end gap-3">
          <div className="space-y-1">
            <label className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Intensity
            </label>
            <Select
              value={intensity}
              onValueChange={setIntensity}
              disabled={isLoading}
            >
              <SelectTrigger className="h-8 w-[100px] rounded-lg border-border/80 bg-muted/30 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Mode
            </label>
            <Select value={mode} onValueChange={setMode} disabled={isLoading}>
              <SelectTrigger className="h-8 w-[100px] rounded-lg border-border/80 bg-muted/30 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Rewrite">Rewrite</SelectItem>
                <SelectItem value="Recreate">Recreate</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Language
            </label>
            <Select
              value={language}
              onValueChange={setLanguage}
              disabled={isLoading}
            >
              <SelectTrigger className="h-8 w-[110px] rounded-lg border-border/80 bg-muted/30 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Automatic">Automatic</SelectItem>
                <SelectItem value="English">English</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Upload: UI only */}
        <div className="space-y-1">
          <label className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            Or upload file
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPT_UPLOAD}
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              setUploadFileName(file ? file.name : null);
            }}
          />
          {uploadFileName ? (
            <div className="flex items-center gap-2 rounded-lg border border-border/40 bg-muted/10 px-3 py-2">
              <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span className="min-w-0 truncate text-xs text-foreground">
                {uploadFileName}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-6 w-6 shrink-0"
                onClick={() => {
                  setUploadFileName(null);
                  fileInputRef.current?.value &&
                    (fileInputRef.current.value = "");
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                "flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-border/60 py-2.5 text-xs text-muted-foreground",
                "hover:border-border hover:bg-muted/10 hover:text-foreground",
              )}
            >
              <Upload className="h-3.5 w-3.5" />
              Upload .doc, .pdf or .txt
            </button>
          )}
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-1.5 rounded-xl border border-border/40 bg-muted/10 p-3">
          <Textarea
            value={content}
            onChange={(e) => {
              if (e.target.value.length <= MAX_CHARS)
                setContent(e.target.value);
            }}
            placeholder="Paste or type text to rewrite…"
            disabled={isLoading}
            className={cn(
              "min-h-[120px] max-h-[min(400px,60vh)] resize-y rounded-lg border-border/50 bg-background/90 text-sm",
              "placeholder:text-muted-foreground/60 focus-visible:ring-2 focus-visible:ring-primary/20",
            )}
          />
          <p className="text-right text-[10px] text-muted-foreground">
            {content.length} / {MAX_CHARS}
          </p>
        </div>

        <Button
          type="submit"
          disabled={isLoading || !content.trim()}
          className={cn(
            "h-9 w-full shrink-0 rounded-xl text-sm font-medium",
            "bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90",
          )}
        >
          {isLoading ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <>
              {mode === "Recreate" ? "Recreate" : "Rewrite"}
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default DynamicCard;
