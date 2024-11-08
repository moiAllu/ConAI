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
import { createRewrite } from "@/lib/apicalls/rewrite";
import { useMeStore } from "../../store";
import { useRouter } from "next/navigation";
import { useRewriteStore } from "../store";
import { Toaster, toast } from "sonner";

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
  const [intensity, setIntensity] = React.useState("Low");
  const [mode, setMode] = React.useState("Rewrite");
  const [inputLanguage, setLanguage] = React.useState("");
  const [content, setContent] = React.useState("");
  const userId = useMeStore((state) => state._id);
  const router = useRouter();
  const { addRewrite } = useRewriteStore();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState({ status: false, message: "" });

  const formSubmitHandler = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError({ status: false, message: "" });
    if (mode === "Recreate") {
      setIntensity("High");
    }
    if (!content) {
      setIsLoading(false);
      setIsError({ status: true, message: "Content is required" });
      toast.error("Content is required");
      return;
    }
    const response = await createRewrite(
      intensity,
      mode,
      inputLanguage,
      content,
      userId,
      "gpt-4o"
    );
    if (response.status === 200) {
      toast.success("Rewrite successful");
      addRewrite(response.data);
      router.push(`/dashboard/rewrite?rewriteId=${response.data._id}`);
      setIsLoading(false);
      setContent("");
      return;
    }
    setIsLoading(false);
  };
  return (
    <form
      className="flex flex-col h-full w-full items-start gap-6 overflow-auto max-w-md"
      onSubmit={formSubmitHandler}
    >
      {isError.status && <Toaster richColors />}
      <fieldset className="grid gap-6 rounded-lg border p-4 w-full ">
        <legend className="-ml-1 px-1 text-sm font-medium">Settings</legend>
        {differentInputs.map((input, index) => (
          <SelectInput
            onValueChange={
              input.label === "Intensity"
                ? setIntensity
                : input.label === "Mode"
                ? setMode
                : null
            }
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
            onValueChange={input.label === "Language" ? setLanguage : null}
            onTextAreaChange={setContent}
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
      <Button type="submit" className="w-full" disabled={isLoading}>
        Rewrite
      </Button>
    </form>
  );
};

export default DynamicCard;
