"use client";
import React, { Suspense, useEffect } from "react";
import { useAIChatStore } from "../store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { useMeStore } from "../../store";
import Message from "./ai-message";
import { getChatByID } from "@/lib/apicalls/chat-assisstance";

type Props = {};

const AIChatHistory = (props: Props) => {
  const { _id } = useMeStore();
  const chats = useAIChatStore((state) => state.chats);
  const searchParams = useSearchParams();
  const chat = chats.find((chat) => chat.id === searchParams.get("chatId"));
  const hasMessages = chat?.messages?.length || 0;
  useEffect(() => {
    // fetch from API and load messages
    async function fetchMessages(chatId: string) {
      setTimeout(async () => {
        const resp = await getChatByID(chatId);
        if (resp?.data?.messages?.length) {
          useAIChatStore
            .getState()
            .setAllMessagesInChat(resp.data.messages, chatId, _id);
        }
      }, 2000); // Delay for 2 seconds
    }
    // fetch chatId from query params
    const chatId = searchParams.get("chatId");
    if (chatId) {
      fetchMessages(chatId);
    }
  }, [searchParams, _id]);
  return (
    // <div className="flex flex-grow flex-col sm:p-6 p-2 items-center justify-end text-center overflow-y-auto h-[55vh]">
    <div className="sm:p-6 flex flex-col p-2 overflow-y-auto h-[calc(100vh-200px)] sm:h-full overflow-auto max-h-[1080px] w-full max-w-[1000px] mx-auto">
      {hasMessages ? (
        chat?.messages.map((message, idx) => (
          <Suspense
            key={message.id}
            fallback={<div key={message.id}>Loading...</div>}
          >
            <Message
              key={message.id}
              message={message}
              isLastMsg={idx === chat.messages.length - 1 ? true : false}
            />
          </Suspense>
        ))
      ) : (
        <>
          <div className="justify-center flex flex-grow flex-col sm:p-6 p-2 items-center text-center">
            <h1 className="text-3xl font-semibold">AI Chat</h1>
            <p className="text-gray-500 dark:text-gray-700 ">
              What can I help with?
            </p>
          </div>
          <div className="w-full justify-center flex min-w-lg text-center">
            <Card className="sm:p-5 p-2 items-center border-none shadow-none ">
              <CardHeader>
                <CardTitle>Popular Questions</CardTitle>
              </CardHeader>
              <Card className="grid sm:grid-cols-2 gap-4 items-center border-none text-start shadow-none">
                <Card className="hidden sm:flex flex-col">
                  <CardContent className="p-2">
                    <span className="text-gray-500">
                      Can you explain the impact of artificial intelligence on
                      the future of work and the job market?
                    </span>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-2">
                    <span className="text-gray-500">
                      Can you explain the impact of artificial intelligence on
                      the future of work and the job market?
                    </span>
                  </CardContent>
                </Card>
              </Card>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default AIChatHistory;
