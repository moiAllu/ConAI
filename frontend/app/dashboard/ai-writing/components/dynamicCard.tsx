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
import { generateAiResponse } from "@/lib/apicalls/ai-writing";
import { useRouter } from "next/navigation";
import React from "react";
import { useMeStore } from "../../store";
import { useAIWritingStore } from "../store";
import { toast } from "sonner";
import { Upload, FileText, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const ACCEPT_UPLOAD = ".doc,.docx,.pdf,.txt";
const labelClass = "text-[10px] font-medium uppercase tracking-wider text-muted-foreground";
const triggerClass = "h-8 rounded-lg border-border/80 bg-muted/30 text-xs";

const lengthData = [
  { value: "Short (500 words)", description: "Short length." },
  { value: "Medium (1000-1500 words)", description: "Medium length." },
  { value: "Long (2000-3000 words)", description: "Long length." },
];

const ageGroupData = [
  { value: "Kids (5-13)", description: "Kids age group." },
  { value: "Teens (13-19)", description: "Teens age group." },
  { value: "Adults (20-39)", description: "Adults age group." },
  { value: "Seniors (50+)", description: "Seniors age group." },
];

const toneData = [
  { value: "Formal", description: "Formal tone." },
  { value: "Informal", description: "Informal tone." },
  { value: "Neutral", description: "Neutral tone." },
  { value: "Professional", description: "Professional tone." },
  { value: "Casual", description: "Casual tone." },
  { value: "Friendly", description: "Friendly tone." },
  { value: "Humorous", description: "Humorous tone." },
  { value: "Serious", description: "Serious tone." },
  { value: "Sympathetic", description: "Sympathetic tone." },
  { value: "Uplifting", description: "Uplifting tone." },
  { value: "Encouraging", description: "Encouraging tone." },
  { value: "Motivational", description: "Motivational tone." },
  { value: "Inspirational", description: "Inspirational tone." },
  { value: "Persuasive", description: "Persuasive tone." },
  { value: "Educational", description: "Educational tone." },
  { value: "Instructional", description: "Instructional tone." },
  { value: "Advisory", description: "Advisory tone." },
  { value: "Warning", description: "Warning tone." },
];

const formatOptions = [
  { value: "Paragraph", description: "A paragraph of text." },
  {
    value: "Essay",
    description: "A full essay.",
    types: [
      { value: "Argumentative", description: "An argumentative essay." },
      { value: "Narrative", description: "A narrative essay." },
      { value: "Expository", description: "An expository essay." },
      { value: "Descriptive", description: "A descriptive essay." },
      { value: "Persuasive", description: "A persuasive essay." },
    ],
    allowedTones: [
      "Formal",
      "Neutral",
      "Professional",
      "Serious",
      "Persuasive",
      "Educational",
    ],
  },
  {
    value: "Blog post",
    description: "A blog post.",
    allowedTones: [
      "Informal",
      "Casual",
      "Friendly",
      "Humorous",
      "Inspirational",
      "Persuasive",
    ],
  },
  {
    value: "Article",
    description: "An article.",
    allowedTones: [
      "Formal",
      "Neutral",
      "Professional",
      "Educational",
      "Instructional",
    ],
  },
  {
    value: "Poem",
    description: "A poem.",
    allowedTones: ["Friendly", "Humorous", "Sympathetic", "Inspirational"],
  },
  {
    value: "Email",
    description: "An email.",
    allowedTones: ["Professional", "Casual", "Friendly", "Formal", "Advisory"],
  },
  {
    value: "Outline",
    description: "An outline.",
    allowedTones: ["Neutral", "Professional", "Instructional"],
  },
  {
    value: "Story",
    description: "A creative or fictional story.",
    allowedTones: [
      "Casual",
      "Friendly",
      "Humorous",
      "Serious",
      "Sympathetic",
      "Uplifting",
      "Inspirational",
    ],
  },
  {
    value: "Application",
    description: "A formal application (e.g., job, university).",
    allowedTones: ["Formal", "Professional", "Neutral", "Advisory"],
  },
  {
    value: "Review",
    description: "A review of a product, service, or experience.",
    allowedTones: [
      "Professional",
      "Neutral",
      "Casual",
      "Humorous",
      "Persuasive",
      "Serious",
    ],
  },
  {
    value: "Report",
    description: "A structured report.",
    allowedTones: ["Formal", "Neutral", "Professional", "Educational"],
  },
  {
    value: "Speech",
    description: "A speech for an audience.",
    allowedTones: [
      "Inspirational",
      "Motivational",
      "Encouraging",
      "Persuasive",
      "Formal",
      "Serious",
    ],
  },
];

const MAX_CHARS_COUNT = 500;
const countWords = (str: string) => `${str.length} / ${MAX_CHARS_COUNT}`;

const DynamicCard = () => {
  const [inputFormat, setInputFormat] = React.useState("");
  const [inputType, setInputType] = React.useState("");
  const [inputTone, setInputTone] = React.useState("");
  const [inputAgeGroup, setInputAgeGroup] = React.useState("");
  const [inputLength, setInputLength] = React.useState("");
  const [inputContent, setInputContent] = React.useState("");
  const [uploadFileName, setUploadFileName] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const { _id, incrementUsageLimit, stripe_subscription_id } = useMeStore();
  const addDocumentToHistory = useAIWritingStore(
    (state) => state.addDocumentToHistory
  );

  const submitHandler = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();
    if (
      !inputFormat ||
      !inputTone ||
      !inputAgeGroup ||
      !inputLength ||
      !inputContent
    ) {
      setIsLoading(false);
      toast.error("Please fill all fields");
      return;
    }
    const promptMods = {
      inputFormat,
      inputType,
      inputTone,
      inputAgeGroup,
      inputLength:
        inputLength.split("(")[1].split(" ")[0].split("-")[1] ||
        inputLength.split("(")[1].split(" ")[0].split("-")[0],
    };
    const response = await generateAiResponse(
      promptMods,
      inputContent,
      _id,
      "",
      stripe_subscription_id || ""
    );
    if (response.status === 200) {
      incrementUsageLimit("aiWriting");
      addDocumentToHistory(
        {
          content: inputContent,
          createdAt: new Date(),
          role: "user",
          _id: response.userInputId,
        },
        await response.storeId,
        _id
      );
      addDocumentToHistory(
        {
          content: await response.data,
          createdAt: new Date(),
          role: "ai",
          _id: response.aiResponseId,
        },
        await response.storeId,
        _id
      );
      setIsLoading(false);
      toast.success("Content generated successfully");
      setInputFormat("");
      setInputType("");
      router.push(`/dashboard/ai-writing?documentId=${response.storeId}`);
      return;
    } else if (response.status === 403) {
      toast.error(response.message);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    toast.error("Failed to generate content");
  };

  const getFilteredTones = (format: string) => {
    const selectedFormat = formatOptions.find(
      (option) => option.value === format
    );
    if (selectedFormat && selectedFormat.allowedTones) {
      return toneData.filter((tone) =>
        selectedFormat.allowedTones.includes(tone.value)
      );
    }
    return toneData;
  };

  return (
    <form
      className={cn(
        "flex h-full min-h-0 w-full max-w-md flex-col gap-4 rounded-2xl border border-border/50",
        "bg-background/70 shadow-sm backdrop-blur-sm"
      )}
      onSubmit={submitHandler}
    >
      <div className="shrink-0 space-y-3 px-4 pt-4">
        {/* Inline toolbar – same style as Rewrite */}
        <div className="flex flex-wrap items-end gap-3">
          <div className="space-y-1">
            <label className={labelClass}>Format</label>
            <Select
              value={inputFormat}
              onValueChange={setInputFormat}
              disabled={isLoading}
              required
            >
              <SelectTrigger className={cn(triggerClass, "w-[110px]")}>
                <SelectValue placeholder="Format" />
              </SelectTrigger>
              <SelectContent>
                {formatOptions.map((option, index) => (
                  <SelectItem key={index} value={option.value}>
                    {option.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {inputFormat === "Essay" && (
            <div className="space-y-1">
              <label className={labelClass}>Type</label>
              <Select
                value={inputType}
                onValueChange={setInputType}
                disabled={isLoading}
                required
              >
                <SelectTrigger className={cn(triggerClass, "w-[120px]")}>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  {(formatOptions.find((o) => o.value === "Essay")?.types ?? []).map((type, index) => (
                    <SelectItem key={index} value={type.value}>
                      {type.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <div className="space-y-1">
            <label className={labelClass}>Tone</label>
            <Select
              value={inputTone}
              onValueChange={setInputTone}
              disabled={isLoading}
              required
            >
              <SelectTrigger className={cn(triggerClass, "w-[100px]")}>
                <SelectValue placeholder="Tone" />
              </SelectTrigger>
              <SelectContent>
                {getFilteredTones(inputFormat).map((option, index) => (
                  <SelectItem key={index} value={option.value}>
                    {option.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <label className={labelClass}>Age</label>
            <Select
              value={inputAgeGroup}
              onValueChange={setInputAgeGroup}
              disabled={isLoading}
              required
            >
              <SelectTrigger className={cn(triggerClass, "w-[95px]")}>
                <SelectValue placeholder="Age" />
              </SelectTrigger>
              <SelectContent>
                {ageGroupData.map((option, index) => (
                  <SelectItem key={index} value={option.value}>
                    {option.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <label className={labelClass}>Length</label>
            <Select
              value={inputLength}
              onValueChange={setInputLength}
              disabled={isLoading}
              required
            >
              <SelectTrigger className={cn(triggerClass, "w-[130px]")}>
                <SelectValue placeholder="Length" />
              </SelectTrigger>
              <SelectContent>
                {lengthData.map((option, index) => (
                  <SelectItem key={index} value={option.value}>
                    {option.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Upload – same as Rewrite */}
        <div className="space-y-1">
          <label className={labelClass}>Or upload file</label>
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
              <span className="min-w-0 truncate text-xs text-foreground">{uploadFileName}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-6 w-6 shrink-0"
                onClick={() => {
                  setUploadFileName(null);
                  fileInputRef.current?.value && (fileInputRef.current.value = "");
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
                "hover:border-border hover:bg-muted/10 hover:text-foreground"
              )}
            >
              <Upload className="h-3.5 w-3.5" />
              Upload .doc, .pdf or .txt
            </button>
          )}
        </div>

        {/* Prompt zone – exact same as Rewrite textarea block */}
        <div className="flex min-h-0 flex-1 flex-col gap-1.5 rounded-xl border border-border/40 bg-muted/10 p-3">
          <Textarea
            id="content"
            value={inputContent}
            onChange={(e) => {
              if (e.target.value.length <= MAX_CHARS_COUNT) setInputContent(e.target.value);
            }}
            placeholder="What is in your mind…"
            disabled={isLoading}
            className={cn(
              "min-h-[120px] max-h-[min(400px,60vh)] resize-y rounded-lg border-border/50 bg-background/90 text-sm",
              "placeholder:text-muted-foreground/60 focus-visible:ring-2 focus-visible:ring-primary/20"
            )}
          />
          <p className="text-right text-[10px] text-muted-foreground">
            {countWords(inputContent)}
          </p>
        </div>

        <Button
          type="submit"
          disabled={isLoading || !inputContent.trim()}
          className={cn(
            "h-9 w-full shrink-0 rounded-xl text-sm font-medium",
            "bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
          )}
        >
          {isLoading ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            "Generate"
          )}
        </Button>
      </div>
    </form>
  );
};

export default DynamicCard;
