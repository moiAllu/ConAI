import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div>
      {/* <AspectRatio ratio={1 / 2}> */}
      <Image
        src="/conai_logo.png"
        alt="Image"
        width={100}
        height={100}
        className="rounded-md object-cover"
      />
      {/* </AspectRatio> */}
    </div>
  );
};

export default Logo;
