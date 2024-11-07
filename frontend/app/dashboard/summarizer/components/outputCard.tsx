"use client";
import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useMeStore } from "../../store";
import { getUserRewriteById } from "../../../../lib/apicalls/rewrite";
import { useSearchParams } from "next/navigation";
import { useSummarizerStore } from "../store";

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
      // const response = await getUserRewriteById(userId, summarizeId);
      // if (response.status === 200) {
      //   const rewriteData = response.data;
      //   addSummarizer(rewriteData.rewrites[0]);
      // }
    };
    fetchImageById();
  }, [summarizeId]);
  return (
    <div className="relative flex h-full w-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2 ">
      <Badge variant="outline" className="absolute right-3 top-3">
        Output
      </Badge>
    </div>
  );
};

export default OutputCard;
