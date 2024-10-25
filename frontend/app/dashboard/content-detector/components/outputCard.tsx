import React, { useEffect } from "react";
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
import { getContentDetectionById } from "@/lib/apicalls/auth";
import { IAiDetection, IPlagrismDetection } from "@/types/contentDetection";

const OutputCard = () => {
  const { aiHistory, addAiHistory, addPlagrismHistory } =
    useContentDetectorStore();

  const plagrimHistory = useContentDetectorStore(
    (state) => state.plagrismHistory
  );
  const compareHistory = useContentDetectorStore(
    (state) => state.compareHistory
  );
  const searchParams = useSearchParams();
  const { _id: userId } = useMeStore();
  const documentId = searchParams.get("documentId") || "";
  useEffect(() => {
    if (!documentId) return;
    const getUserContentDetections = async () => {
      const response = await getContentDetectionById(userId, documentId);
      if (response.data.method === "Ai detection") {
        addAiHistory(response.data.aiDetection, userId, "ai detection");
      }
      if (response.data.method === "plagrism detection") {
        addPlagrismHistory(
          response.data.plagrismDetection,
          userId,
          "plagrism detection"
        );
      }
      // useContentDetectorStore.setState({
      //   aiHistory: response.data.aiDetection,
      //   plagrismHistory: response.data.plagrismDetection,
      //   compareHistory: response.data.compare,
      // });
    };
    getUserContentDetections();
  }, [documentId]);
  // const document = aiHistory.aiDetectionHistory.find(
  //   (doc) => doc._id === searchParams.get("documentId")
  // );
  const aiDocument: IAiDetection | undefined =
    aiHistory.aiDetectionHistory.find(
      (doc) => doc._id === searchParams.get("documentId")
    );
  const plagDocument: IPlagrismDetection | undefined =
    plagrimHistory.plagrismDetectionHistory.find(
      (doc) => doc._id === searchParams.get("documentId")
    );

  return (
    <div className="relative flex h-full  w-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2 overflow-auto">
      <Badge variant="outline" className="absolute right-3 top-3">
        Output
      </Badge>
      {aiDocument && (
        <div className="flex flex-col gap-2 ">
          <div>{aiDocument?.prompt}</div>
          <div className="flex flex-col gap-2">
            <title>Result</title>
            <div className="flex flex-col gap-1">
              <span>
                {aiDocument?.response.aiDetected
                  ? "AI detected "
                  : "Not Detected"}
              </span>
              <span>
                AI Deteted Percentage {aiDocument?.response.aiPercentage}%
              </span>
              <span>
                {" "}
                AI Model Confidence {aiDocument?.response.confidence}
              </span>
              <div>
                {aiDocument?.response.aiContent.map((content, idx) => (
                  <span key={idx}>{content}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="">
        {plagDocument && (
          <div className="flex flex-col gap-2">
            <div>{plagDocument?.prompt}</div>
            <div className="flex flex-col gap-2">
              <title>Result</title>
              <div className="flex flex-col gap-1">
                <span>Query Words: {plagDocument?.querywords}</span>
                <span>Count: {plagDocument?.count}</span>
                <div>
                  {plagDocument?.result.map((content, idx) => (
                    <div key={idx}>
                      <span>URL: {content.url}</span>
                      <span>Index: {content.index}</span>
                      <span>Title: {content.title}</span>
                      <span>Text Snippet: {content.textsnippet}</span>
                      <span>HTML Snippet: {content.htmlsnippet}</span>
                      <span>Min Words Matched: {content.minwordsmatched}</span>
                      <span>View URL: {content.viewurl}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* {document && (
        <div className="flex flex-col gap-2">
          <div>{document?.prompt}</div>
          <div className="flex flex-col gap-2">
            <title>Result</title>
            <div className="flex flex-col gap-1">
              <span>
                {document?.response.aiDetected
                  ? "AI detected "
                  : "Not Detected"}
              </span>
              <span>
                AI Deteted Percentage {document?.response.aiPercentage}%
              </span>
              <span> AI Model Confidence {document?.response.confidence}</span>
              <div>
                {document?.response.aiContent.map((content) => (
                  <span>{content}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )} */}
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
