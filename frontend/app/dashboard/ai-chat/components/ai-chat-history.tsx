"use client";
import React, { Suspense, useEffect } from "react";
import { useAIChatStore } from "../store";
import { useSearchParams } from "next/navigation";
import { MessageSquareMore } from "lucide-react";
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
      }, 4000); // Delay for 4 seconds
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
        <div className="flex flex-grow flex-col items-center justify-center p-6 text-center">
          <div className="rounded-full border border-border/40 bg-muted/20 p-3">
            <MessageSquareMore className="mx-auto h-8 w-8 text-muted-foreground/60" />
          </div>
          <h2 className="mt-4 text-lg font-semibold text-foreground">AI Chat</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            What can I help with?
          </p>
        </div>
      )}
    </div>
  );
};

export default AIChatHistory;
