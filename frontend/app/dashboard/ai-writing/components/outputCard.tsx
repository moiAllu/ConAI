"use client";
import React, { use, useEffect } from "react";
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
import { useAIWritingStore } from "../store";
import { useSearchParams } from "next/navigation";
import { getAiWritingById } from "@/lib/apicalls/auth";
import { useMeStore } from "../../store";
import ReactMarkdown from "react-markdown";
import styles from "./OutputCard.module.css";
import remarkGfm from "remark-gfm";

const OutputCard = () => {
  const history = useAIWritingStore((state) => state.history);
  const searchParams = useSearchParams();
  const { _id: userId } = useMeStore();
  const documentId = searchParams.get("documentId") || "";
  const documents = history.find(
    (doc) => doc._id === searchParams.get("documentId")
  );
  console.log(history);
  useEffect(() => {
    if (!documentId) return;
    const getAiResponse = async () => {
      const response = await getAiWritingById(documentId, userId);
      console.log(response);
      // useAIWritingStore.setState({ history: response.data });
      useAIWritingStore
        .getState()
        .setAllDocumentsInHistory(
          response.data.documents,
          response.data.title,
          documentId,
          userId
        );
    };
    getAiResponse();
  }, [documentId]);

  return (
    <div className="relative flex h-full w-full min-h-[90vh] flex-col rounded-xl bg-muted/50 sm:p-4 p-2 lg:col-span-2 mb-10 ">
      <Badge variant="outline" className="absolute right-3 top-3">
        <span>Output</span>
      </Badge>
      <div className="h-full w-full prose prose-base  overflow-y-auto p-4 ">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {documents?.documents.at(-1)?.content || "See the output here"}
        </ReactMarkdown>
      </div>

      {/* <div className="flex-1" /> */}
      {/* <form
        className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring "
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
          <Button type="submit" size="sm" className="ml-auto  gap-1.5 mb-5">
            Send Message
            <CornerDownLeft className="size-3.5" />
          </Button>
        </div>
      </form> */}
    </div>
  );
};

export default OutputCard;
