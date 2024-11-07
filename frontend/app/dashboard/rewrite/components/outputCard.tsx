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
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const OutputCard = () => {
  const searchParams = useSearchParams();
  const { addRewrite, rewrites } = useRewriteStore();
  const userId = useMeStore((state) => state._id);
  const rewriteId = searchParams.get("rewriteId") || "";
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
    <div className="relative flex h-full w-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2 overflow-y-auto">
      {!selectedRewrite && (
        <Badge variant="outline" className="absolute right-3 top-3">
          Output
        </Badge>
      )}

      <div className="h-full w-full prose prose-base  overflow-y-auto p-4 ">
        <Card className="border-none bg-inherit shadow-none">
          <CardTitle className="text-md">Selected Inputs Setting</CardTitle>

          <CardDescription className="text-md">
            <div className="flex gap-1">
              <Badge variant="outline" className="">
                {selectedRewrite?.mode}
              </Badge>
              <Badge variant="outline" className="">
                {selectedRewrite?.intensity}
              </Badge>
            </div>
          </CardDescription>
        </Card>

        <Card className="border-none bg-inherit shadow-none">
          <CardHeader className="p-0">
            <CardTitle className="text-lg">Input</CardTitle>
          </CardHeader>
          <CardDescription className="text-md">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {selectedRewrite?.input || "See the output here"}
            </ReactMarkdown>
          </CardDescription>
        </Card>
        <Card className="border-none bg-inherit shadow-none">
          <CardHeader className="p-0">
            <CardTitle className="text-lg">Output</CardTitle>
          </CardHeader>
          <CardDescription className="text-md text-black dark:text-white">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {selectedRewrite?.output || "See the output here"}
            </ReactMarkdown>
          </CardDescription>
        </Card>
      </div>
    </div>
  );
};

export default OutputCard;
