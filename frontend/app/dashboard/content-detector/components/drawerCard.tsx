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
import { createContentDetection } from "@/lib/apicalls/content-detection";
import { useRouter } from "next/navigation";
import React from "react";
import { useMeStore } from "../../store";
import { useContentDetectorStore } from "../store";
import { toast, Toaster } from "sonner";
import LoadingSpinner from "@/components/loading-spinner";

const MAX_CHARS_COUNT = 9000;
const countWords = (str: string) => `${str.length} / ${MAX_CHARS_COUNT}`;

const DrawerCard = () => {
  const router = useRouter();
  const [method, setMethod] = React.useState("Ai Detection");
  const [content, setContent] = React.useState("");
  const { _id: userId } = useMeStore();
  const { addAiHistory, addPlagrismHistory } = useContentDetectorStore();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState({ status: false, message: "" });

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (!content || content.length === 0) {
      setIsError({ status: true, message: "Content is required" }),
        toast.error("Content is required");
      setIsLoading(false);
      return;
    }
    const contentDetection = await createContentDetection(
      userId,
      method,
      content
    );
    if (contentDetection.status === 200) {
      method === "Ai Detection"
        ? addAiHistory(contentDetection.data, userId, "ai detection")
        : addPlagrismHistory(
            contentDetection.data,
            userId,
            "plagrism detection"
          );
      router.push(
        `/dashboard/content-detector?documentId=${contentDetection.data?._id}`
      );
      setIsLoading(false);
      toast.success(contentDetection.message);
      return;
    }
    setIsError({ status: true, message: contentDetection.message });
    toast.error(contentDetection.message);
    setIsLoading(false);
  };
  return (
    <form
      className="flex flex-col h-full w-full items-start gap-6 overflow-auto max-w-md sm:p-0 p-2"
      onSubmit={onSubmitHandler}
    >
      <fieldset className="flex flex-col rounded-lg border p-4 w-full gap-2 h-full">
        <legend className="px-1 text-sm font-medium">Settings</legend>
        <div className="w-full ">
          <Label htmlFor="role">Method</Label>
          <Select
            defaultValue="Plagiarism Detection"
            onValueChange={(e) => setMethod(e)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Ai Detection">AI Detection</SelectItem>
              <SelectItem value="Plagiarism Detection">
                Plagiarism Detection
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full h-full">
          <Label htmlFor="content">Content</Label>
          <Textarea
            onChange={(e) => {
              if (e.target.value.length > MAX_CHARS_COUNT) return;
              setContent(e.target.value);
            }}
            value={content}
            id="content"
            placeholder="You are a..."
            // className="sm:h-[95%] resize-none relative border-0 bg-muted/50 p-1 shadow-none focus-visible:ring-0"
            className="resize-none h-[95%] min-h-[100px] mt-1"
          />
          <div className=" text-sm text-gray-600 w-full text-end">
            <span>{countWords(content)}</span>
          </div>
        </div>
        <br className="hidden sm:flex" />
      </fieldset>
      <Button type="submit" className="w-full sm:mb-5" disabled={isLoading}>
        {isLoading ? (
          <div className="flex gap-1 items-center">
            <LoadingSpinner />
            <span>Processing</span>
          </div>
        ) : (
          "Detect"
        )}
      </Button>
      <Toaster richColors />
    </form>
  );
};

export default DrawerCard;
