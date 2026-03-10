"use client";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectModel() {
  const [value, setValue] = React.useState("3.5 Turbo");
  return (
    <Select onValueChange={(e) => setValue(e)}>
      <SelectTrigger className="h-9 w-[180px] rounded-lg border-border/80 bg-muted/30 text-xs">
        <SelectValue placeholder="3.5 Turbo" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Model</SelectLabel>
          <SelectItem value="3.5 Turbo" disabled={value === "3.5 Turbo"}>
            3.5 Turbo
          </SelectItem>
          <SelectItem value="4" disabled={value === "4"}>
            4
          </SelectItem>
          <SelectItem value="4.O" disabled={value === "4.O"}>
            4.O
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
