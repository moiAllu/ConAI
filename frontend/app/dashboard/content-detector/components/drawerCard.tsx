"use client";
import React from "react";
import { Bird, Rabbit, Turtle, UploadIcon } from "lucide-react";
import { useMeStore } from "../../store";
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
import { Button } from "@/components/ui/button";
import { createContentDetection } from "@/lib/apicalls/auth";

const DrawerCard = () => {
  const [method, setMethod] = React.useState("Ai Detection");
  const [content, setContent] = React.useState("");
  const [compareTo, setCompareTo] = React.useState("");
  const { _id: userId } = useMeStore();
  const countWords = (str: string) => {
    if (str.split(" ").length === 1) return "10 / 3000";
    return str.split(" ").length;
  };
  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ method, content, compareTo });
    const contentDetection = await createContentDetection(
      userId,
      method,
      content,
      compareTo
    );
    console.log(contentDetection);
  };
  return (
    <form
      className="flex flex-col h-full w-full items-start gap-6 overflow-auto max-w-md sm:p-0 p-2"
      onSubmit={onSubmitHandler}
    >
      <fieldset className="flex flex-col rounded-lg border p-4 w-full  h-full rela">
        <legend className="px-1 text-sm font-medium">Settings</legend>
        <div className="w-full ">
          <Label htmlFor="role">Method</Label>
          <Select
            defaultValue="Ai Detection"
            onValueChange={(e) => setMethod(e)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Ai Detection">AI Detection</SelectItem>
              <SelectItem value="Plagirism Detection">
                Plagirism Detection
              </SelectItem>
              <SelectItem value="Compare">Compare</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full h-full">
          <Label htmlFor="content">Content</Label>
          <Textarea
            onChange={(e) => setContent(e.target.value)}
            value={content}
            id="content"
            placeholder="You are a..."
            className="sm:h-[95%] resize-none relative border-0 bg-muted/50 p-1 shadow-none focus-visible:ring-0"
          />
          <div className=" text-sm text-gray-600 w-full text-end">
            <span>{countWords(content)}</span>
          </div>
        </div>
        <br className="hidden sm:flex" />

        {method === "Compare" && (
          <div className="w-full h-full">
            <Label htmlFor="content">Compare To:</Label>
            <Textarea
              onChange={(e) => setCompareTo(e.target.value)}
              value={compareTo}
              id="content"
              placeholder="You are a..."
              className="sm:h-[95%] resize-none relative border-0 bg-muted/50 p-1 shadow-none focus-visible:ring-0"
            />
          </div>
        )}
      </fieldset>
      <Button type="submit" className="w-full sm:mb-5">
        Detect Content
      </Button>
    </form>
  );
};

export default DrawerCard;
