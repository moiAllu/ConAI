"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { createImage } from "@/lib/apicalls/image-generation";
import { Textarea } from "@/registry/new-york/ui/textarea";
import { useRouter } from "next/navigation";
import React from "react";
import { useMeStore } from "../../store";
import { useImageStore } from "../store";
import SelectInput from "./selectInput";

const differentInputs = [
  {
    label: "Wide Aspect",
    defaultValue: "square",
    options: ["square", "landscape", "portrait"],
    required: false,
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
      "oilpainting",
      "watercolor",
      "sketch",
      "cartoon",
    ],
    required: true,
  },
  {
    label: "Background",
    defaultValue: "random",
    options: ["random", "white", "black"],
    required: false,
  },
  {
    label: "Color",
    defaultValue: "No Color",
    options: [
      "Warm tone",
      "Cool tone",
      "Muted Color",
      "Vibrant Color",
      "No Color",
    ],
    required: true,
  },
];

const MAX_CHARS_COUNT = 500;
const countWords = (str: string) => `${str.length} / ${MAX_CHARS_COUNT}`;

const InputCard = () => {
  const userId = useMeStore((state) => state._id);
  const [aspect, onAspectChange] = React.useState("square");
  const [style, onStyleChange] = React.useState("");
  const [background, onBackgroundChange] = React.useState("random");
  const [color, onColorChange] = React.useState("");
  const [prompt, onPromptChange] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState({ status: 0, message: "" });
  const { addImage } = useImageStore();
  const router = useRouter();
  const formSubmitHandler = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError({ status: 0, message: "" });

    const createdImage = await createImage(
      {
        aspect,
        style,
        background,
        color,
        prompt,
      },
      userId
    );
    console.log(createdImage);
    if (createdImage.status === 200) {
      setIsLoading(false);
      addImage(createdImage.data.data);
      router.push(
        `/dashboard/image-generator?imageId=${createdImage.data.data._id}`
      );
      return;
    }
    setIsLoading(false);
    setIsError({
      status: createdImage.status,
      message: createdImage.message,
    });
  };
  return (
    <form
      className="grid h-full w-full items-start gap-6 overflow-auto max-w-xs p-2 sm:p-0 "
      onSubmit={formSubmitHandler}
    >
      <fieldset className="grid gap-6 rounded-lg border p-4 w-full max-h-screen">
        <legend className="-ml-1 px-1 text-sm font-medium">Select</legend>
        <div className="grid gap-3">
          {differentInputs.map((input, index) => (
            <SelectInput
              onValueChange={
                input.label === "Wide Aspect"
                  ? onAspectChange
                  : input.label === "Style"
                  ? onStyleChange
                  : input.label === "Background"
                  ? onBackgroundChange
                  : input.label === "Color"
                  ? onColorChange
                  : null
              }
              value={
                input.label === "Wide Aspect"
                  ? aspect
                  : input.label === "Style"
                  ? style
                  : input.label === "Background"
                  ? background
                  : input.label === "Color"
                  ? color
                  : null
              }
              label={input.label}
              defaultValue={input.defaultValue}
              options={input.options}
              required={input.required || true}
              index={index}
              key={index}
            />
          ))}
        </div>
        <div className="grid gap-3 w-full h-full">
          <Label htmlFor="content">Description prompt</Label>
          <Textarea
            value={prompt}
            id="content"
            placeholder="You are a..."
            // className="h-full resize-none bg-muted/50 border-0 p-1 shadow-none focus-visible:ring-0 sm:min-h-[150px]"
            className="resize-none h-full min-h-[150px]"
            onChange={(e) => {
              if (e.target.value.length > MAX_CHARS_COUNT) return;
              onPromptChange(e.target.value);
            }}
          />
          <div className=" text-sm text-gray-600 w-full text-end">
            <span>{countWords(prompt)}</span>
          </div>
        </div>
      </fieldset>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Generating Image..." : "Generate Image"}
      </Button>
    </form>
  );
};

export default InputCard;
