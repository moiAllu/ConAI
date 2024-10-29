"use client";
import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const OutputCard = () => {
  const [response, setResponse] = React.useState("");

  const getStreamResponse = async (e: any) => {
    e.preventDefault();
    setResponse("");
    const response = await fetch("http://localhost:8000/api/stream/response", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt:
          "write me an essay on the topic of global warming with proper headings and lists.",
      }),
    });

    const reader = response.body?.getReader() as any;
    const decoder = new TextDecoder();

    let done = false;
    let accumulatedResponse = "";

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
          console.log(line);
          const chatId = line.substring(8);
          console.log(chatId);
          break;
        }
        if (line.startsWith("data: ")) {
          const data = line.substring(6); // Remove 'data: '
          if (data === "[DONE]") {
            done = true;
            break;
          }
          try {
            const content = JSON.parse(data);
            setResponse((prev) => prev + content);
          } catch (err) {
            console.error("Error parsing JSON:", err);
          }
        }
      }
    }
  };

  return (
    <div className="relative flex h-full w-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2 ">
      <Badge variant="outline" className="absolute right-3 top-3">
        Output
      </Badge>
      <div className="flex flex-col w-full h-full">
        <Button onClick={getStreamResponse}>Get Response</Button>
        <div className={`flex flex-col w-full h-full overflow-y-auto `}>
          <ReactMarkdown>{response}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default OutputCard;
