import HeroPage from "@/components/home";
import React from "react";
import ResizeableSidebar from "./components/resizeable-sidebar";

const Dashboard = () => {
  return (
    <div className="w-full h-full">
      <ResizeableSidebar />
    </div>
  );
};

export default Dashboard;
