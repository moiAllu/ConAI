"use client";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import React from "react";
import { useTheme } from "next-themes";
const Logo = () => {
  const { theme } = useTheme();
  return (
    <div>
      {/* <AspectRatio ratio={1 / 2}> */}
      <Image
        src={theme === "dark" ? "/conai-dark.png" : "/conai-light.png"}
        alt="Image"
        width={80}
        height={80}
        className="rounded-md object-cover"
        style={{ width: "auto", height: "auto" }}
      />
      {/* </AspectRatio> */}
    </div>
  );
};

export default Logo;
