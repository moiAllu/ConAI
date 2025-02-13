"use client";
import React, { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { useAIWritingStore } from "../store";
import { useSearchParams } from "next/navigation";
import { getAiWritingById } from "@/lib/apicalls/ai-writing";
import { useMeStore } from "../../store";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast, Toaster } from "sonner";

const OutputCard = () => {
  const history = useAIWritingStore((state) => state.history);
  const searchParams = useSearchParams();
  const { _id: userId } = useMeStore();
  const documentId = searchParams.get("documentId") || "";
  const documents = history.find(
    (doc) => doc._id === searchParams.get("documentId")
  );
  useEffect(() => {
    if (!documentId) return;
    const getAiResponse = async () => {
      const response = await getAiWritingById(documentId, userId);
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

  const handleCopy = () => {
    const textToCopy = documents?.documents.at(-1)?.content || "";
    navigator.clipboard.writeText(textToCopy).then(() => {
      toast.success("Copied to clipboard");
    });
  };

  return (
    <div className="flex h-full w-full flex-col rounded-xl bg-muted/50 sm:p-4 p-2 lg:col-span-2 relative">
      {documents?.documents && (
        <Badge
          variant="outline"
          className="absolute right-3 top-3 cursor-pointer"
          onClick={handleCopy}
        >
          <span>Copy</span>
        </Badge>
      )}
      <div className="h-full w-full prose prose-base overflow-y-auto p-4 mb-2">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {documents?.documents.at(-1)?.content || "See the output here"}
        </ReactMarkdown>
      </div>
      <Toaster richColors />
    </div>
  );
};

export default OutputCard;
