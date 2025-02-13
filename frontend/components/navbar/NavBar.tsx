"use client";
import * as React from "react";
import PhoneNavbar from "./phone-navbar";
import DesktopNavbar from "./desktop-navbar";
export const Navbar = () => {
  return (
    <div className=" h-[60px] sticky top-0 bg-white dark:bg-black bg-opacity-95 shadow-md dark:shadow-sm dark:shadow-gray-900 rounded-lg flex sm:p-5 z-10 md:mx-auto md:container">
      <PhoneNavbar />
      <DesktopNavbar />
    </div>
  );
};
