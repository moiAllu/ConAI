"use client";

import ReactivateSubscription from "./reactivate-subscription";

const Head = () => {
  return (
    <div className="relative w-full mb-10 sm:mb-14">
      <ReactivateSubscription />
      <div className="flex flex-col justify-center items-center w-full text-center">
        <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-4">
          Your workspace
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-primary max-w-3xl">
          AI-powered tools for{" "}
          <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent dark:from-violet-400 dark:via-indigo-400 dark:to-cyan-400">
            creation, enhancement & analysis
          </span>
        </h1>
        <p className="mt-4 text-muted-foreground text-lg max-w-xl">
          Rewrite, detect, summarize, generate images, and chat with AI — all in one place.
        </p>
      </div>
    </div>
  );
};

export default Head;
