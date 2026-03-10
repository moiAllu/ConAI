"use client";

import Nav from "@/components/header/nav";
import React, { Suspense } from "react";
import { BookText } from "lucide-react";
import DrawerCard from "./components/drawerCard";
import OutputCard from "./components/outputCard";
import { Toaster } from "sonner";

const SummarizePage = () => {
  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-hidden bg-gradient-to-br from-slate-200 via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-auto px-3 py-3 sm:px-4 sm:py-4">
        <Nav title="Summarizer" icon={BookText} mobileSettingsLabel="Summarize">
          <DrawerCard />
        </Nav>

        <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-[minmax(0,380px)_1fr]">
          <div className="hidden min-h-0 flex-col overflow-hidden lg:flex">
            <DrawerCard />
          </div>
          <div className="flex min-h-[200px] flex-1 flex-col overflow-hidden lg:min-h-0">
            <Suspense
              fallback={
                <div className="flex h-full min-h-[200px] items-center justify-center rounded-2xl border border-border/40 bg-muted/10 text-sm text-muted-foreground">
                  Loading…
                </div>
              }
            >
              <OutputCard />
            </Suspense>
          </div>
        </div>
      </div>
      <Toaster richColors position="bottom-right" />
    </div>
  );
};

export default SummarizePage;
