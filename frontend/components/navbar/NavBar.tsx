"use client";
import * as React from "react";
import PhoneNavbar from "./phone-navbar";
import DesktopNavbar from "./desktop-navbar";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/90 backdrop-blur-xl">
      <div className="flex h-14 items-center justify-between px-3 sm:h-16 sm:px-4 md:mx-auto md:max-w-7xl md:px-6">
        <PhoneNavbar />
        <DesktopNavbar />
      </div>
    </header>
  );
};
