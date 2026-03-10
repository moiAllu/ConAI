"use client";

import React, { useEffect, useState } from "react";
import { useContentDetectorStore } from "../store";
import { useSearchParams } from "next/navigation";
import { useMeStore } from "../../store";
import { getContentDetectionById } from "@/lib/apicalls/content-detection";
import { IAiDetection, IPlagrismDetection } from "@/types/contentDetection";
import PlagairismReport from "./plagiarismReport";
import AIDetectionReport from "./aiDetectionReport";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const OutputCard = () => {
  const { aiHistory, addAiHistory, addPlagrismHistory } =
    useContentDetectorStore();
  const plagrimHistory = useContentDetectorStore(
    (state) => state.plagrismHistory
  );
  const searchParams = useSearchParams();
  const { _id: userId } = useMeStore();
  const documentId = searchParams.get("documentId") || "";
  const [selectedResult, setSelectedResult] = useState("matchedtext");

  useEffect(() => {
    if (!documentId || !userId) return;
    const getUserContentDetections = async () => {
      const response = await getContentDetectionById(userId, documentId);
      if (response?.data?.method === "Ai detection") {
        addAiHistory(response.data.aiDetection, userId, "ai detection");
      }
      if (response?.data?.method === "plagrism detection") {
        addPlagrismHistory(
          response.data.plagrismDetection,
          userId,
          "plagrism detection"
        );
      }
    };
    getUserContentDetections();
  }, [documentId, userId, addAiHistory, addPlagrismHistory]);

  const aiDocument: IAiDetection | undefined =
    aiHistory.aiDetectionHistory.find((doc) => doc._id === documentId);
  const plagDocument: IPlagrismDetection | undefined =
    plagrimHistory.plagrismDetectionHistory.find(
      (doc) => doc._id === documentId
    );

  const hasResult = !!aiDocument || !!plagDocument;

  if (!hasResult) {
    return (
      <div className="flex h-full min-h-0 w-full flex-col">
        <div
          className={cn(
            "flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-border/50 p-8",
            "bg-muted/5 bg-gradient-to-b from-muted/10 to-transparent"
          )}
        >
          <div className="rounded-full border border-border/40 bg-muted/20 p-3">
            <Sparkles className="h-7 w-7 text-muted-foreground/60" />
          </div>
          <p className="mt-3 text-sm font-medium text-muted-foreground">
            Result appears here
          </p>
          <p className="mt-1 text-xs text-muted-foreground/80">
            Run detection to see the report.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex h-full min-h-0 w-full flex-col overflow-hidden rounded-2xl border border-border/50",
        "bg-background/70 shadow-sm backdrop-blur-sm"
      )}
    >
      <div className="flex shrink-0 items-center border-b border-border/40 px-4 py-2">
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          Result
        </span>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
        {aiDocument && (
          <AIDetectionReport
            prompt={aiDocument.prompt}
            response={aiDocument.response}
            method={aiDocument.method}
            createdAt={aiDocument.createdAt}
          />
        )}
        {plagDocument && (
          <PlagairismReport
            prompt={plagDocument.prompt}
            querywords={plagDocument.querywords}
            result={plagDocument.result}
            count={plagDocument.count}
            allpercentmatched={plagDocument.allpercentmatched}
            alltextmatched={plagDocument.alltextmatched}
            allwordsmatched={plagDocument.allwordsmatched}
            cost={plagDocument.cost}
            selectedResult={selectedResult}
            setSelectedResult={setSelectedResult}
          />
        )}
      </div>
    </div>
  );
};

export default OutputCard;
