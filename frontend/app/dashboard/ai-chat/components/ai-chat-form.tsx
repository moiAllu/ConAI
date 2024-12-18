"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { SendHorizontal, Paperclip, FileSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AI_CHAT_CONFIG } from "@/config";
import { useAIChatStore } from "../store";
import { useRouter, useSearchParams } from "next/navigation";
import { useMeStore } from "../../store";
import { OctagonPause, ArrowUp, MoveUp } from "lucide-react";
import { addMessageInChat } from "@/lib/apicalls/chat-assisstance";
type Props = {};

const AIChatForm = (props: Props) => {
  const [input, setInput] = React.useState("");
  const addMessageToChat = useAIChatStore((state) => state.addMessageToChat);
  const pushMessageChunks = useAIChatStore((state) => state.pushMessageChunks);
  const searchParams = useSearchParams();
  const chatId = searchParams.get("chatId") || "";
  const router = useRouter();
  const { _id } = useMeStore();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    setIsError(false);
    e.preventDefault();
    if (input.trim() === "") {
      return;
    }
    setInput("");
    addMessageToChat(
      {
        id: Math.random().toString(),
        role: "user",
        message: input,
        createdAt: new Date().toISOString(),
      },
      chatId,
      _id
    );

    const response = await addMessageInChat(input, chatId, _id);
    // const data = await response.json();
    const reader = response.body?.getReader() as any;
    const decoder = new TextDecoder();

    let done = false;
    let accumulatedResponse = "";
    let aiResp = "";
    let chatid = "";
    let messageId = "";

    while (!done) {
      const { value, done: readerDone } = await reader.read();
      if (readerDone) {
        console.log("Stream complete");
        break;
      }
      const chunk = decoder.decode(value);
      accumulatedResponse += chunk;

      let lines = accumulatedResponse.split("\n");

      // Keep the last incomplete line
      accumulatedResponse = lines.pop() || "";
      for (let line of lines) {
        if (line.startsWith("chatId: ")) {
          // console.log(line);
          chatid = line.substring(8);
          // console.log(chatId);
          if (chatid) {
            router.push(`/dashboard/ai-chat?chatId=${chatid}`);
          }
          continue;
        }
        if (line.startsWith("messageId: ")) {
          messageId = line.substring(11);
          console.log(messageId);
          addMessageToChat(
            {
              id: messageId,
              role: "assistant",
              message: aiResp,
              createdAt: new Date().toISOString(),
            },
            chatid,
            _id
          );
          continue;
        }
        if (line.startsWith("data: ")) {
          const data = line.substring(6); // Remove 'data: '
          if (data === "[DONE]") {
            messageId = "";
            chatid = "";
            done = true;
            setIsLoading(false);
            break;
          }
          try {
            const content = JSON.parse(data);
            // console.log("content", content);
            pushMessageChunks(messageId, content, chatId, _id);
            aiResp += content;
          } catch (err) {
            setIsError(true);
            console.error("Error parsing JSON:", err);
          }
        }
      }
    }
  };

  return (
    <Card className="flex flex-col p-2 sm:px-3 sm:py-1 rounded-full items-center w-full  sm:w-[90%] outline-none  ">
      <form onSubmit={handleSubmit} className="flex w-full">
        <div className="flex items-center hover:bg-muted p-2 rounded-full cursor-pointer transition-colors">
          <Paperclip size={19} />
        </div>

        <Input
          type="text"
          placeholder="Ask me anything..."
          className="py-1 border-none px-0 w-full focus:border-transparent focus:ring-0 focus-visible:ring-0"
          value={input}
          disabled={isLoading}
          onChange={(e) => {
            if (e.target.value.length <= AI_CHAT_CONFIG.MAX_INPUT_CHARS) {
              setInput(e.target.value);
            }
          }}
        />
        <Button
          type="submit"
          disabled={input === ""}
          size="sm"
          className="rounded-full px-2"
        >
          {isLoading ? <OctagonPause /> : <ArrowUp size={20} />}
        </Button>
      </form>
      {/* <div className="flex justify-between w-full items-center">
        <div className=" flex items-start w-full text-gray-600 sm:space-x-2 ">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center sm:space-x-1"
          >
            <Paperclip size={16} />
            <span className=" hidden sm:flex">Attach</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1"
          >
            <FileSearch size={16} />
            <span className=" hidden sm:flex">Browse Prompts</span>
          </Button>
        </div>
        <div>
          <span className="text-gray-500 dark:text-gray-700 sm:text-sm text-xs">
            {input.length}/{AI_CHAT_CONFIG.MAX_INPUT_CHARS}
          </span>
        </div>
      </div> */}
    </Card>
  );
};

export default AIChatForm;
