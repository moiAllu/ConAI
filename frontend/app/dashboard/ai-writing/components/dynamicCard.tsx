"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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
import { toast, Toaster } from "sonner";
const lengthData = [
  {
    value: "Short (500 words)",
    description: "Short length.",
  },
  {
    value: "Medium (1000-1500 words)",
    description: "Medium length.",
  },
  {
    value: "Long (2000-3000 words)",
    description: "Long length.",
  },
];
const ageGroupData = [
  {
    value: "Kids (5-11)",
    description: "Kids age group.",
  },
  {
    value: "Teens (12-17)",
    description: "Teens age group.",
  },
  {
    value: "Adults (18-50)",
    description: "Adults age group.",
  },
  {
    value: "Seniors (50+)",
    description: "Seniors age group.",
  },
];
const toneData = [
  {
    value: "Formal",
    description: "Formal tone.",
  },
  {
    value: "Informal",
    description: "Informal tone.",
  },
  {
    value: "Neutral",
    description: "Neutral tone.",
  },
  {
    value: "Professional",
    description: "Professional tone.",
  },
  {
    value: "Casual",
    description: "Casual tone.",
  },
  {
    value: "Friendly",
    description: "Friendly tone.",
  },
  {
    value: "Humorous",
    description: "Humorous tone.",
  },
  {
    value: "Sarcastic",
    description: "Sarcastic tone.",
  },
  {
    value: "Serious",
    description: "Serious tone.",
  },
  {
    value: "Sympathetic",
    description: "Sympathetic tone.",
  },
  {
    value: "Uplifting",
    description: "Uplifting tone.",
  },
  {
    value: "Encouraging",
    description: "Encouraging tone.",
  },
  {
    value: "Motivational",
    description: "Motivational tone.",
  },
  {
    value: "Inspirational",
    description: "Inspirational tone.",
  },
  {
    value: "Persuasive",
    description: "Persuasive tone.",
  },
  {
    value: "Educational",
    description: "Educational tone.",
  },
  {
    value: "Instructional",
    description: "Instructional tone.",
  },
  {
    value: "Advisory",
    description: "Advisory tone.",
  },
  {
    value: "Warning",
    description: "Warning",
  },
];

const formatOptions = [
  {
    value: "Paragraph",
    description: "A paragraph of text.",
  },
  {
    value: "Eassy",
    description: "A full essay.",
    types: [
      {
        value: "Argumentative",
        description: "An argumentative essay.",
      },
      {
        value: "Narrative",
        description: "A narrative essay.",
      },
      {
        value: "Expository",
        description: "An expository essay.",
      },
      {
        value: "Descriptive",
        description: "A descriptive essay.",
      },
      {
        value: "Persuasive",
        description: "A persuasive essay.",
      },
    ],
  },
  {
    value: "Blog post",
    description: "A blog post.",
  },
  {
    value: "Article",
    description: "An article.",
  },
  {
    value: "Poem",
    description: "A poem.",
  },
  { value: "Email", description: "An email." },
  {
    value: "Outline",
    description: "An outline.",
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
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const { _id } = useMeStore();
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
      toast.error("Please fill all feilds");
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
      ""
    );
    if (response.status === 200) {
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
    }
    setIsLoading(false);
    toast.error("Failed to generate content");
  };

  return (
    <form
      className="grid h-full w-full items-start gap-6 overflow-auto max-w-md"
      onSubmit={submitHandler}
    >
      <fieldset
        className="grid gap-6 rounded-lg border p-4"
        disabled={isLoading}
      >
        <legend className=" px-1 text-sm font-medium">Settings</legend>
        <div className="grid gap-2">
          <Label htmlFor="format">Format</Label>
          <Select
            name="format"
            required
            onValueChange={(e) => {
              setInputFormat(e);
            }}
            value={inputFormat}
          >
            <SelectTrigger
              id="format"
              className="items-start [&_[data-description]]:hidden"
            >
              <SelectValue placeholder="Select a format" />
            </SelectTrigger>
            <SelectContent>
              {formatOptions.map((option, index) => (
                <SelectItem
                  key={index}
                  value={option.value}
                  data-description={option.description}
                >
                  {option.value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {inputFormat === "Eassy" && (
          <div className="grid gap-2">
            <Label htmlFor="type">Type</Label>
            <Select
              name="type"
              required
              onValueChange={(e) => setInputType(e)}
              value={inputType}
            >
              <SelectTrigger
                id="type"
                className="items-start [&_[data-description]]:hidden"
              >
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                {formatOptions.map((option, index) => {
                  if (option.value === "Eassy") {
                    return option?.types?.map((type, index) => (
                      <SelectItem
                        key={index}
                        value={type.value}
                        data-description={type.description}
                      >
                        {type.value}
                      </SelectItem>
                    ));
                  }
                })}
              </SelectContent>
            </Select>
          </div>
        )}
        <div className="grid gap-2">
          <Label htmlFor="tone">Tone</Label>
          <Select
            name="tone"
            required
            onValueChange={(e) => setInputTone(e)}
            value={inputTone}
          >
            <SelectTrigger
              id="tone"
              className="items-start [&_[data-description]]:hidden"
            >
              <SelectValue placeholder="Select tone" />
            </SelectTrigger>
            <SelectContent>
              {toneData.map((option, index) => (
                <SelectItem
                  key={index}
                  value={option.value}
                  data-description={option.description}
                >
                  {option.value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="age group">Age Group</Label>
          <Select
            required
            name="agegroup"
            onValueChange={(e) => setInputAgeGroup(e)}
            value={inputAgeGroup}
          >
            <SelectTrigger
              id="agegroup"
              className="items-start [&_[data-description]]:hidden"
            >
              <SelectValue placeholder="Select Age Group" />
            </SelectTrigger>
            <SelectContent>
              {ageGroupData.map((option, index) => (
                <SelectItem
                  key={index}
                  value={option.value}
                  data-description={option.description}
                >
                  {option.value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </fieldset>
      <fieldset
        className="grid gap-6 rounded-lg border p-4"
        disabled={isLoading}
      >
        <legend className="-ml-1 px-1 text-sm font-medium">Content</legend>
        <div className="grid gap-1">
          <Label htmlFor="length">Length</Label>
          <Select
            name="length"
            required
            onValueChange={(e) => setInputLength(e)}
            value={inputLength}
          >
            <SelectTrigger
              id="length"
              className="items-start [&_[data-description]]:hidden"
            >
              <SelectValue placeholder="Select length" />
            </SelectTrigger>
            <SelectContent>
              {lengthData.map((option, index) => (
                <SelectItem
                  key={index}
                  value={option.value}
                  data-description={option.description}
                >
                  {option.value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="content">Prompt</Label>
          <Textarea
            id="content"
            placeholder="What is in your mind..."
            onChange={(e) => {
              if (e.target.value.length > MAX_CHARS_COUNT) return;
              setInputContent(e.target.value);
            }}
            value={inputContent}
            className="resize-none h-full min-h-[150px]"
          />
          <div className=" text-sm text-gray-600 w-full text-end">
            <span>{countWords(inputContent)}</span>
          </div>
        </div>
        <Button
          className="w-full flex items-center justify-center gap-2"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Generating...
            </>
          ) : (
            <span>Generate</span>
          )}
        </Button>
        <Toaster richColors />
      </fieldset>
    </form>
  );
};

export default DynamicCard;
