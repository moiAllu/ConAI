"use client";

import React, { Suspense } from "react";
import { MessageSquareMore } from "lucide-react";
import { SelectModel } from "./components/select-model";
import AIChatForm from "./components/ai-chat-form";
import AIChatHistory from "./components/ai-chat-history";
import DrawerChatHistory from "./components/drawer-history";

const AIWritingPage = () => {
  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-hidden bg-gradient-to-br from-slate-200 via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden px-3 py-3 sm:px-4 sm:py-4">
        {/* Header – same pattern as Rewrite / AI Writing */}
        <div className="flex shrink-0 items-center justify-between gap-2 px-1">
          <div className="hidden min-w-0 flex-1 items-center gap-2 md:flex">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted/50">
              <MessageSquareMore className="h-4 w-4 text-muted-foreground sm:h-5 sm:w-5" />
            </div>
            <h1 className="truncate text-lg font-semibold sm:text-2xl sm:font-bold">
              AI Chat
            </h1>
          </div>
          <div className="flex min-w-0 flex-1 flex-wrap items-center justify-end gap-2 md:flex-initial md:flex-shrink-0">
            <div className="flex items-center gap-2">
              <SelectModel />
              <DrawerChatHistory />
            </div>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden rounded-2xl border border-border/50 bg-background/70 shadow-sm backdrop-blur-sm">
          <div className="min-h-0 flex-1 overflow-y-auto">
            <Suspense fallback={<div className="flex h-full items-center justify-center text-sm text-muted-foreground">Loading…</div>}>
              <AIChatHistory />
            </Suspense>
          </div>
          <div className="shrink-0 border-t border-border/40 px-3 py-3 sm:px-4">
            <Suspense fallback={null}>
              <AIChatForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIWritingPage;
