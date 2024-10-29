"use client";
import { useEffect, useState } from "react";
import React from "react";
import { Card } from "@/components/ui/card";
import { IMessage } from "../store";
import { Ellipsis, PencilLine } from "lucide-react";
import styles from "./Message.module.css";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";
import { useSearchParams } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Markdown from "react-markdown";

const Message = ({
  message,
  isLastMsg,
}: {
  message: any;
  isLastMsg: boolean;
}) => {
  const [mouseEnter, setMouseEnter] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const isUserMessage = message.role === "user";

  useEffect(() => {
    if (isLastMsg) {
      console.log(true);
      const element = document.getElementById(message?._id);
      element?.scrollIntoView({ behavior: "smooth" });
      const elementInStream = document.getElementById(message?.id);
      elementInStream?.scrollIntoView({ behavior: "smooth" });
    }

    return () => {};
  }, [isLastMsg, message._id, message.message, message.id]);

  return (
    <div
      id={message._id || message.id}
      className={`text-md flex items-start space-x-2 w-full sm:p-2 p-1 ${
        isUserMessage ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {/* Avatar */}
      {!isUserMessage && (
        <div className="hidden sm:flex items-center  justify-center w-10 h-10 text-white rounded-full bg-green-500 ">
          AI
        </div>
      )}
      {isUserMessage ? (
        <div
          className={`flex items-start space-x-2 cursor-pointer text-gray-500 ${
            !isEditing && "max-w-[90%]"
          }  ${isEditing && "w-full"} mt-5 mb-5 `}
          onMouseEnter={() => !isEditing && setMouseEnter(true)}
          onMouseLeave={() => !isEditing && setMouseEnter(false)}
        >
          {mouseEnter ? (
            !isEditing && (
              <div className="p-2 rounded-full hover:bg-muted">
                <PencilLine size={20} onClick={() => setIsEditing(true)} />
              </div>
            )
          ) : (
            <div className="w-6"></div>
          )}
          <div
            className={`flex flex-col prose-base w-full h-full overflow-y-auto text-left bg-muted rounded-lg px-3 py-2 text-[15px]`}
          >
            {!isEditing ? (
              <Markdown>{message.message}</Markdown>
            ) : (
              <div>
                <Textarea
                  className={`w-full border-none bg-transparent h-full focus-visible:ring-0 focus:ring-0 focus-visible:ring-offset-0 focus:border-none ${
                    message.message.length > 500 && "min-h-[200px]"
                  } text-md resize-none `}
                  disabled={!isEditing}
                >
                  {message.message}
                </Textarea>
                <div className="flex justify-end space-x-2">
                  <Button
                    size="sm"
                    className="rounded-full px-3 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-600 bg-white hover:bg-gray-300 transition-all"
                    variant="secondary"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>

                  <Button
                    size="sm"
                    className="rounded-full px-3"
                    onClick={() => setIsEditing(false)}
                  >
                    Save
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div
          className={`flex flex-col prose prose-base  w-full h-full overflow-y-auto text-left rounded-lg max-w-[90%] mb-5`}
          onMouseEnter={() => setMouseEnter(true)}
          onMouseLeave={() => setMouseEnter(false)}
        >
          {/* <div className="prose prose-base"> */}
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {message.message}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
};
export default Message;
