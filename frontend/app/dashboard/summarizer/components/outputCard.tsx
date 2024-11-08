"use client";
import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useMeStore } from "../../store";
import { getUserRewriteById } from "../../../../lib/apicalls/rewrite";
import { useSearchParams } from "next/navigation";
import { useSummarizerStore } from "../store";
import { getUserSummarizeById } from "@/lib/apicalls/summarize";

const OutputCard = () => {
  const searchParams = useSearchParams();
  const userId = useMeStore((state) => state._id);
  const { addSummarizer, summarizers } = useSummarizerStore();
  const summarizeId = searchParams.get("summarizeId") || "";
  const selectedSummarize = summarizers.find(
    (summarizer) => summarizer._id === summarizeId
  );

  useEffect(() => {
    if (!summarizeId) return;
    const fetchImageById = async () => {
      const response = await getUserSummarizeById(summarizeId, userId);
      if (response.status === 200) {
        const summarizeData = response.data;
        addSummarizer(summarizeData.summarizers[0]);
      }
    };
    fetchImageById();
  }, [summarizeId]);
  return (
    <div className="relative flex h-full w-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2 overflow-y-auto mb-10">
      {!selectedSummarize && (
        <Badge variant="outline" className="absolute right-3 top-3">
          Output
        </Badge>
      )}
      {selectedSummarize && (
        <div className="flex flex-col gap-4 space-y-3">
          <div>
            <Badge variant="outline" className=" space-x-2 absolute right-0">
              <span>Intensity:</span>
              <span>{selectedSummarize.intensity}</span>
            </Badge>
          </div>
          <ReactMarkdown>{selectedSummarize.output}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default OutputCard;
