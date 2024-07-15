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
import { Button } from "@/components/ui/button";

const DrawerCard = () => {
  return (
    <form className="flex flex-col h-full w-full items-start gap-6 overflow-auto max-w-md sm:p-0 p-2">
      <fieldset className="flex flex-col rounded-lg border p-4 w-full  h-full rela">
        <legend className="px-1 text-sm font-medium">Settings</legend>
        <div className="w-full ">
          <Label htmlFor="role">Level</Label>
          <Select defaultValue="Medium">
            <SelectTrigger>
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Short">Short</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Long">Long</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full h-full">
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            placeholder="You are a..."
            className="sm:h-[95%] resize-none relative border-0 bg-muted/50 p-1 shadow-none focus-visible:ring-0"
          />
        </div>
      </fieldset>
      <Button type="submit" className="w-full">
        Summarize
      </Button>
    </form>
  );
};

export default DrawerCard;
