"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AI_CHAT_CONFIG } from "@/config";
import { useAIChatStore } from "../store";
import { useRouter, useSearchParams } from "next/navigation";
import { useMeStore } from "../../store";
import { OctagonPause, ArrowUp } from "lucide-react";
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
    const response = await addMessageInChat(input, chatId, _id);
    // const data = await response.json();
    const reader = response.body?.getReader() as any;
    const decoder = new TextDecoder();

    let done = false;
    let accumulatedResponse = "";
    let aiResp = "";
    let chatid = "";
    let messageId = "";
    let promptMsgId = "";

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
        if (line.startsWith("promptMsgId: ")) {
          promptMsgId = line.substring(13);
          console.log("prompt Id", promptMsgId);
          addMessageToChat(
            {
              id: Math.floor(Math.random() * 10000).toString(),
              role: "user",
              message: input,
              createdAt: new Date().toISOString(),
            },
            chatid,
            _id
          );
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
    <div className="flex flex-col gap-2 rounded-2xl border border-border/40 bg-muted/10 p-2">
      <form onSubmit={handleSubmit} className="flex items-center gap-2 rounded-xl border border-border/50 bg-background pl-3 pr-1 py-1 shadow-sm">
        <button type="button" className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted/60" aria-label="Attach">
          <Paperclip size={18} />
        </button>
        <Input
          type="text"
          placeholder="Ask me anything…"
          className="min-h-0 flex-1 border-0 bg-transparent py-2.5 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
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
          disabled={!input.trim()}
          size="sm"
          className="h-9 w-9 shrink-0 rounded-lg bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
        >
          {isLoading ? <OctagonPause className="h-4 w-4" /> : <ArrowUp size={18} />}
        </Button>
      </form>
      <p className="text-right text-[10px] text-muted-foreground">
        {input.length} / {AI_CHAT_CONFIG.MAX_INPUT_CHARS}
      </p>
    </div>
  );
};

export default AIChatForm;
