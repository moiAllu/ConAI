"use client";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import React from "react";
import { useTheme } from "next-themes";
type LogoProps = {
  width?: number;
  height?: number;
};
const Logo = ({ width, height }: LogoProps) => {
  const { theme } = useTheme();
  return (
    <div>
      {/* <AspectRatio ratio={1 / 2}> */}
      <Image
        src={theme === "dark" ? "/conai-dark.png" : "/conai-light.png"}
        alt="Image"
        width={width || 80}
        height={height || 80}
        className="rounded-md object-cover"
        style={{ width: "auto", height: "auto" }}
      />
      {/* </AspectRatio> */}
    </div>
  );
};

export default Logo;
