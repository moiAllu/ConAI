"use client";
import React, { Suspense, useEffect } from "react";
import { IMessage, useAIChatStore } from "../store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { useMeStore } from "../../store";
import Message from "./ai-message";

type Props = {};

const AIChatHistory = (props: Props) => {
  const { _id } = useMeStore();
  const chats = useAIChatStore((state) => state.chats);
  console.log(chats);
  const searchParams = useSearchParams();
  const chat = chats.find((chat) => chat.id === searchParams.get("chatId"));
  console.log("chat", chat);
  const hasMessages = chat?.messages?.length || 0;

  useEffect(() => {
    // fetch from API and load messages
    async function fetchMessages(chatId: string) {
      const res = await fetch(
        "http://localhost:8000/api/chat/ai-assistant/" + chatId,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("accessToken") || "",
          },
        }
      );

      const resp = await res.json();

      if (resp?.data?.messages?.length) {
        useAIChatStore
          .getState()
          .setAllMessagesInChat(resp.data.messages, chatId, _id);
      }
    }

    // fetch chatId from query params
    const chatId = searchParams.get("chatId");
    if (chatId) {
      fetchMessages(chatId);
    }
  }, [searchParams]);

  return (
    // <div className="flex flex-grow flex-col sm:p-6 p-2 items-center justify-end text-center overflow-y-auto h-[55vh]">
    <div className="sm:p-6 p-2 text-center overflow-y-auto h-[65vh]">
      {hasMessages ? (
        chat?.messages.map((message, idx) => (
          <Suspense fallback={<div key={idx}>Loading...</div>}>
            <Message
              key={message.id}
              message={message}
              isLastMsg={idx === chat.messages.length - 1}
            />
          </Suspense>
        ))
      ) : (
        <>
          <div className="justify-center flex flex-grow flex-col sm:p-6 p-2 items-center text-center">
            <h1 className="text-3xl font-semibold">AI Chat</h1>
            <p className="text-gray-500 dark:text-gray-700 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
          </div>
          <div className="w-full justify-center flex min-w-lg ">
            <Card className="grid sm:grid-cols-2 gap-2 sm:p-5 p-2 items-center w-[90%]  border-none ">
              <Card className="hidden sm:flex flex-col">
                <CardHeader>
                  <CardTitle className="text-md">AI Writing</CardTitle>
                </CardHeader>
                <CardContent>
                  <span className="text-center">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  </span>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-md">AI Writing</CardTitle>
                </CardHeader>
                <CardContent>
                  <span className="text-center">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  </span>
                </CardContent>
              </Card>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default AIChatHistory;
