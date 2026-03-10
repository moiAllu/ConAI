"use client";

import React from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface SelectInputProps {
  label: string;
  defaultValue: string;
  options: string[];
  index: number;
  textAreaLabel?: string;
  textAreaPlaceholder?: string;
  onValueChange: ((value: string) => void) | null;
  onTextAreaChange?: (value: string) => void;
  value?: string;
}

const MAX_CHARS_COUNT = 6000;
const countChars = (str: string) => `${str.length} / ${MAX_CHARS_COUNT}`;

const SelectInput = (props: SelectInputProps) => {
  const value = props.value ?? "";

  if (
    props.textAreaLabel &&
    props.textAreaPlaceholder &&
    props.onTextAreaChange !== undefined
  ) {
    return (
      <div className="flex w-full flex-col gap-4" key={props.index}>
        <div className="space-y-2 shrink-0">
          <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {props.label}
          </Label>
          <Select
            defaultValue={props.defaultValue}
            onValueChange={props.onValueChange ?? undefined}
          >
            <SelectTrigger className="rounded-xl border-border/80 bg-background/60 h-11">
              <SelectValue placeholder={props.defaultValue} />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {props.options.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2 shrink-0">
          <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {props.textAreaLabel}
          </Label>
          <Textarea
            id="content"
            placeholder={props.textAreaPlaceholder}
            value={value}
            className={cn(
              "min-h-[160px] max-h-[220px] resize-none rounded-xl border-border/80 bg-background/60 overflow-y-auto",
              "focus-visible:ring-2 focus-visible:ring-primary/20 placeholder:text-muted-foreground/70",
            )}
            onChange={(e) => {
              if (e.target.value.length <= MAX_CHARS_COUNT) {
                props.onTextAreaChange?.(e.target.value);
              }
            }}
          />
          <p className="text-right text-xs text-muted-foreground">
            {countChars(value)}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-2" key={props.index}>
      <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {props.label}
      </Label>
      <Select
        defaultValue={props.defaultValue}
        onValueChange={props.onValueChange ?? undefined}
      >
        <SelectTrigger className="rounded-xl border-border/80 bg-background/60 h-11">
          <SelectValue placeholder={props.defaultValue} />
        </SelectTrigger>
        <SelectContent className="rounded-xl">
          {props.options.map((option, index) => (
            <SelectItem key={index} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectInput;
