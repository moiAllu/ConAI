"use client";
import React, { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { useContentDetectorStore } from "../store";
import { useSearchParams } from "next/navigation";
import { useMeStore } from "../../store";
import { getContentDetectionById } from "@/lib/apicalls/content-detection";
import { IAiDetection, IPlagrismDetection } from "@/types/contentDetection";
import { useState } from "react";
import PlagairismReport from "./plagiarismReport";
import AIDetectionReport from "./aiDetectionReport";
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
  const [selectedResult, setSelectedResult] = useState("matchedtext");
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
    <div className="relative flex sm:h-full h-[calc(100vh-150px)] w-full flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2 ">
      {!aiDocument ||
        (!plagDocument && (
          <Badge variant="outline" className="absolute right-3 top-3">
            Output
          </Badge>
        ))}
      {aiDocument && (
        <AIDetectionReport
          prompt={aiDocument.prompt}
          response={aiDocument.response}
          method={aiDocument.method}
          createdAt={aiDocument.createdAt}
        />
      )}
      <div className="h-full w-full">
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
