import React, { Suspense } from "react";
import ReactivateSubscription from "../components/reactivate-subscription";
import { Separator } from "@/components/ui/separator";
import { SelectModel } from "./components/select-model";

import AIChatForm from "./components/ai-chat-form";
import AIChatHistory from "./components/ai-chat-history";
import DrawerChatHistory from "./components/drawer-history";

const AIWritingPage = () => {
  return (
    <div className="p-2 flex flex-col w-full h-full max-h-[1080px] ">
      <div className="flex justify-between w-full items-center justify-items-center  mt-2 px-2">
        <div className="flex items-center">
          <SelectModel />
          <DrawerChatHistory />
        </div>
        <ReactivateSubscription />
      </div>
      <Separator className="my-2" />
      <div className="w-full h-full justify-between flex-col flex overflow-y-auto">
        <Suspense fallback={<div>Loading...</div>}>
          <AIChatHistory />
        </Suspense>
        <div className="w-full justify-center flex min-w-lg">
          <Suspense fallback={<div>Loading...</div>}>
            <AIChatForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default AIWritingPage;
