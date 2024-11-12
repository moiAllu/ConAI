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
import { createSummarize } from "@/lib/apicalls/summarize";
import { useRouter } from "next/navigation";
import React from "react";
import { Toaster, toast } from "sonner";
import { useMeStore } from "../../store";
import { useSummarizerStore } from "../store";

const MAX_CHARS_COUNT = 9000;
const countWords = (str: string) => `${str.length} / ${MAX_CHARS_COUNT}`;

const DrawerCard = () => {
  const [intensity, setIntensity] = React.useState("Medium");
  const [content, setContent] = React.useState("");
  const userId = useMeStore((state) => state._id);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState({ status: false, message: "" });
  const { addSummarizer } = useSummarizerStore();
  const router = useRouter();
  const formSubmitHandler = async (e: any) => {
    e.preventDefault();
    if (content === "") {
      setIsError({ status: true, message: "Content cannot be empty" });
      toast.error("Content cannot be empty");
      return;
    }
    setIsError({ status: false, message: "" });
    setIsLoading(true);
    const response = await createSummarize(intensity, content, userId);
    setIsLoading(false);
    if (response.status === 200) {
      toast.success("Summarized successfully");
      addSummarizer(response.data);
      router.push(`/dashboard/summarizer?summarizeId=${response.data._id}`);
      return;
    }
    setIsError({ status: true, message: "Failed to summarize" });
    toast.error("Failed to summarize");
  };
  return (
    <form
      className="flex flex-col h-full w-full items-start gap-6 overflow-auto max-w-md sm:p-0 p-2"
      onSubmit={formSubmitHandler}
    >
      <fieldset className="flex flex-col rounded-lg border p-4 w-full h-full gap-4">
        <legend className="px-1 text-sm font-medium">Settings</legend>
        <div className="w-full ">
          <Label htmlFor="role">Intensity</Label>
          <Select defaultValue="Medium" onValueChange={setIntensity}>
            <SelectTrigger>
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Short">Short</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Long">Long</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full h-full mt-2 flex flex-col gap-2">
          <Label htmlFor="content">Content</Label>
          <Textarea
            value={content}
            onChange={(e) => {
              if (e.target.value.length > MAX_CHARS_COUNT) return;
              setContent(e.target.value);
            }}
            id="content"
            placeholder="You are a..."
            className="resize-none h-full min-h-[150px]"
            // className="sm:h-[95%] resize-none relative border-0 bg-muted/50 p-1 shadow-none focus-visible:ring-0"
          />
          <div className=" text-sm text-gray-600 w-full text-end">
            <span>{countWords(content)}</span>
          </div>
        </div>
      </fieldset>
      <Button type="submit" className="w-full" disabled={isLoading}>
        Summarize
      </Button>
      <Toaster richColors />
    </form>
  );
};

export default DrawerCard;
