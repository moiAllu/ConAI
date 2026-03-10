"use client";

import Body from "./components/body";
import Head from "./components/head";

const Dashboard = () => {
  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-auto bg-gradient-to-br from-slate-200 via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10 md:px-8">
        <Head />
        <Body />
      </div>
    </div>
  );
};

export default Dashboard;
