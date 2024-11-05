"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CornerDownLeft, Mic, Paperclip } from "lucide-react";
import { useEffect } from "react";
import { useMeStore } from "../../store";
import { getUserRewriteById } from "../../../../lib/apicalls/rewrite";
import { useSearchParams } from "next/navigation";
import { useRewriteStore } from "../store";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const OutputCard = () => {
  const searchParams = useSearchParams();
  const { addRewrite, rewrites } = useRewriteStore();
  const userId = useMeStore((state) => state._id);
  const rewriteId = searchParams.get("rewriteId") || "";
  console.log(rewrites);
  const selectedRewrite = rewrites.find((rewrite) => rewrite._id === rewriteId);

  useEffect(() => {
    if (!rewriteId) return;
    const fetchImageById = async () => {
      const response = await getUserRewriteById(userId, rewriteId);
      if (response.status === 200) {
        const rewriteData = response.data;
        addRewrite(rewriteData.rewrites[0]);
      }
    };
    fetchImageById();
  }, [rewriteId]);
  return (
    <div className="relative flex h-full w-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2 m">
      <Badge variant="outline" className="absolute right-3 top-3">
        Output
      </Badge>
      <div className="h-full w-full prose prose-base  overflow-y-auto p-4 ">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {selectedRewrite?.output || "See the output here"}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default OutputCard;
