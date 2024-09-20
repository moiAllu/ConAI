import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CornerDownLeft, Mic, Paperclip } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useContentDetectorStore } from "../store";
import { useSearchParams } from "next/navigation";
import { useMeStore } from "../../store";

const OutputCard = () => {
  const aiHistory = useContentDetectorStore((state) => state.aiHistory);
  const plagrimHistory = useContentDetectorStore(
    (state) => state.plagrismHistory
  );
  const compareHistory = useContentDetectorStore(
    (state) => state.compareHistory
  );
  const searchParams = useSearchParams();
  const { _id: userId } = useMeStore();
  const documentId = searchParams.get("documentId") || "";
  return (
    <div className="relative flex h-full w-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2 ">
      <Badge variant="outline" className="absolute right-3 top-3">
        Output
      </Badge>
      <div>
        <div>
          <span>Total words: </span>
          <span>100</span>
        </div>
        <div>
          <span>match percentage</span>
          <span>match words</span>
        </div>
        <div>graph</div>
      </div>
      {/* <div className="flex-1" /> */}
      {/* <form
        className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
        x-chunk="dashboard-03-chunk-1"
      >
        <Label htmlFor="message" className="sr-only">
          Message
        </Label>
        <Textarea
          id="message"
          placeholder="Type your message here..."
          className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
        />
        <div className="flex items-center p-3 pt-0">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Paperclip className="size-4" />
                  <span className="sr-only">Attach file</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Attach File</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Mic className="size-4" />
                  <span className="sr-only">Use Microphone</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Use Microphone</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button type="submit" size="sm" className="ml-auto gap-1.5">
            Send Message
            <CornerDownLeft className="size-3.5" />
          </Button>
        </div>
      </form> */}
    </div>
  );
};

export default OutputCard;
