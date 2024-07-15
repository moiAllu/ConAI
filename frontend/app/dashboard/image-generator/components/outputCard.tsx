import React from "react";
import { Badge } from "@/components/ui/badge";

const OutputCard = () => {
  return (
    <div className="relative flex h-full w-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2 ">
      <Badge variant="outline" className="absolute right-3 top-3">
        Output
      </Badge>
    </div>
  );
};

export default OutputCard;
