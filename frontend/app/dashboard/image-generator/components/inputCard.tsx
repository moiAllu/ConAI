import { Label } from "@/components/ui/label";
import { Textarea } from "@/registry/new-york/ui/textarea";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york/ui/select";
import SelectInput from "./selectInput";
import { Button } from "@/components/ui/button";
const differentInputs = [
  {
    label: "Wide Aspect",
    defaultValue: "square",
    options: ["square", "landscape", "portrait"],
  },
  {
    label: "Style",
    defaultValue: "no style",
    options: [
      "no style",
      "abstract",
      "art",
      "black and white",
      "colorful",
      "dark",
      "light",
      "modern",
      "vintage",
    ],
  },
  {
    label: "Background",
    defaultValue: "random",
    options: ["random", "white", "black"],
  },
  {
    label: "Color",
    defaultValue: "No Color",
    options: ["Warm tone", "Cool tone", "Muted Color", "Vibrant Color"],
  },
  {
    label: "Format",
    defaultValue: "png",
    options: ["png", "jpeg"],
  },
];

const InputCard = () => {
  const formSubmitHandler = (e: any) => {
    e.preventDefault();
    console.log("Form Submitted");
  };
  return (
    <form
      className="grid h-full w-full items-start gap-6 overflow-auto max-w-md p-2 sm:p-0"
      onSubmit={formSubmitHandler}
    >
      <fieldset className="grid gap-6 rounded-lg border p-4 w-full max-h-screen">
        <legend className="-ml-1 px-1 text-sm font-medium">Select</legend>
        <div className="grid gap-3">
          {differentInputs.map((input, index) => (
            <SelectInput
              label={input.label}
              defaultValue={input.defaultValue}
              options={input.options}
              index={index}
              key={index}
            />
          ))}
        </div>
        <div className="grid gap-3 w-full h-full">
          <Label htmlFor="content">Description prompt</Label>
          <Textarea
            id="content"
            placeholder="You are a..."
            className="h-full resize-none bg-muted/50 border-0 p-1 shadow-none focus-visible:ring-0 sm:min-h-[150px]"
          />
        </div>
      </fieldset>
      <Button type="submit" className="w-full">
        Generate Image
      </Button>
    </form>
  );
};

export default InputCard;
