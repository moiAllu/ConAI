"use client";
import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { IMessage } from "../store";

const Message = ({
  message,
  isLastMsg,
}: {
  message: IMessage;
  isLastMsg: boolean;
}) => {
  const isUserMessage = message.role === "user";

  const cardClasses = ` sm:text-[16px] text-sm border w-auto max-w-[90%] sm:px-4 px-2 py-2 border-none shadow-none    ${
    isUserMessage ? "bg-muted " : ""
  }`;
  const textClasses = `text-md ${isUserMessage ? "text-right" : "text-left"}`;

  useEffect(() => {
    if (isLastMsg) {
      const element = document.getElementById(message.id);
      element?.scrollIntoView({ behavior: "smooth" });
    }

    return () => {};
  }, [isLastMsg, message.id]);

  return (
    <div
      id={message.id}
      className={`text-md flex items-start space-x-2 w-full sm:p-2 p-1  ${
        isUserMessage ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {/* Avatar */}
      {isUserMessage ? (
        <div className=" ml-4 hidden items-center justify-center w-10 h-10 text-white rounded-full bg-blue-500">
          You
        </div>
      ) : (
        <div className="hidden sm:flex items-center  justify-center w-10 h-10 text-white rounded-full bg-green-500 ">
          AI
        </div>
      )}

      <Card className={cardClasses}>
        <p className={textClasses}>{message.message}</p>
      </Card>
    </div>
  );
};
export default Message;
