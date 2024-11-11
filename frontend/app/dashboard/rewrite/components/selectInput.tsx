import React from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
interface SelectInputProps {
  label: string;
  defaultValue: string;
  options: string[];
  index: number;
  textAreaLabel?: string;
  textAreaPlaceholder?: string;
  onValueChange: any;
  onTextAreaChange?: any;
  value: string;
}
import { Textarea } from "@/components/ui/textarea";

const MAX_CHARS_COUNT = 6000;
const countWords = (str: string) => `${str.length} / ${MAX_CHARS_COUNT}`;

const SelectInput = (props: SelectInputProps) => {
  if (props.textAreaLabel && props.textAreaPlaceholder) {
    return (
      <div className="flex flex-col w-full h-full gap-3" key={props.index}>
        <Label htmlFor="role">{props.label}</Label>
        <Select
          defaultValue={props.defaultValue}
          onValueChange={props.onValueChange}
        >
          <SelectTrigger>
            <SelectValue placeholder={props.defaultValue} />
          </SelectTrigger>
          <SelectContent>
            {props.options.map((option, index) => (
              <SelectItem key={index} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="h-full flex flex-col gap-2">
          <Label htmlFor="content">{props.textAreaLabel}</Label>
          <Textarea
            id="content"
            placeholder={props.textAreaPlaceholder}
            value={props.value}
            // className="sm:h-[90%] resize-none relative border-0 bg-muted/50 p-1 shadow-none focus-visible:ring-0"
            className="resize-none sm:h-[90%] min-h-[150px]"
            onChange={(e) => {
              if (e.target.value.length > MAX_CHARS_COUNT) return;
              props.onTextAreaChange(e.target.value);
            }}
          />
          <div className=" text-sm text-gray-600 w-full text-end">
            <span>{countWords(props.value)}</span>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="grid gap-3" key={props.index}>
        <Label htmlFor="role">{props.label}</Label>
        <Select
          defaultValue={props.defaultValue}
          onValueChange={props.onValueChange}
        >
          <SelectTrigger>
            <SelectValue placeholder={props.defaultValue} />
          </SelectTrigger>
          <SelectContent>
            {props.options.map((option, index) => (
              <SelectItem key={index} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }
};

export default SelectInput;
