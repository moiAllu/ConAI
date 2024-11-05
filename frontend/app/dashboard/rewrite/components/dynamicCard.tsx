import React from "react";
import { Bird, Rabbit, Turtle, UploadIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import SelectInput from "./selectInput";
import { Button } from "@/components/ui/button";
const differentInputs = [
  {
    label: "Intensity",
    defaultValue: "Low",
    options: ["Low", "Medium", "High"],
  },
  {
    label: "Mode",
    defaultValue: "Rewrite",
    options: ["Rewrite", "Recreate"],
  },
];
const inputs = [
  {
    label: "Language",
    defaultValue: "Automatic",
    options: ["Automatic", "English", "Spanish"],
    textAreaLabel: "Content",
    textAreaPlaceholder: "You are a...",
  },
];

const DynamicCard = () => {
  const formSubmitHandler = (e: any) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  return (
    <form
      className="flex flex-col h-full w-full items-start gap-6 overflow-auto max-w-md"
      onSubmit={formSubmitHandler}
    >
      <fieldset className="grid gap-6 rounded-lg border p-4 w-full ">
        <legend className="-ml-1 px-1 text-sm font-medium">Settings</legend>
        {differentInputs.map((input, index) => (
          <SelectInput
            label={input.label}
            defaultValue={input.defaultValue}
            options={input.options}
            index={index}
            key={index}
          />
        ))}
      </fieldset>
      <fieldset className="flex flex-col gap-6 rounded-lg border p-4 w-full h-full">
        <legend className="-ml-1 px-1 text-sm font-medium">Input</legend>
        {inputs.map((input, index) => (
          <SelectInput
            label={input.label}
            defaultValue={input.defaultValue}
            options={input.options}
            index={index}
            key={index}
            textAreaLabel={input.textAreaLabel}
            textAreaPlaceholder={input.textAreaPlaceholder}
          />
        ))}
      </fieldset>
      <Button type="submit" className="w-full">
        Rewrite
      </Button>
    </form>
  );
};

export default DynamicCard;
