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
}
const SelectInput = (props: SelectInputProps) => {
  return (
    <div className="grid gap-3" key={props.index}>
      <Label htmlFor="role">{props.label}</Label>
      <Select defaultValue={props.defaultValue}>
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
};

export default SelectInput;
