"use client";
import Body from "./components/body";
import Head from "./components/head";

const Dashboard = () => {
  return (
    <div className="w-full h-full flex flex-col space-y-5 justify-evenly p-2">
      <Head />
      <Body />
    </div>
  );
};

export default Dashboard;
