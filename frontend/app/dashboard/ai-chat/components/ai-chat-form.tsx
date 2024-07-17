'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { SendHorizontal, Paperclip, FileSearch, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AI_CHAT_CONFIG } from '@/config';
type Props = {};

const AIChatForm = (props: Props) => {
  const [input, setInput] = React.useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() === '') {
      return;
    }

    const response = await fetch(
      'http://localhost:8000/api/chat/ai-assistant/open-ai',
      {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input }),
        method: 'POST',
      }
    );
    const data = await response.json();
    console.log(data);
  };

  return (
    <Card className="flex flex-col p-2 sm:p-4 items-center w-full  sm:w-[90%] space-y-2 ">
      <form onSubmit={handleSubmit} className="space-x-2 flex w-full">
        <Input
          type="text"
          placeholder="Ask me anything..."
          className="py-1"
          value={input}
          onChange={(e) => {
            if (e.target.value.length <= AI_CHAT_CONFIG.MAX_INPUT_CHARS) {
              setInput(e.target.value);
            }
          }}
        />
        <Button type="submit">
          <SendHorizontal />
        </Button>
      </form>
      <div className="flex justify-between w-full items-center">
        <div className=" flex items-start w-full text-gray-600 sm:space-x-2 ">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center sm:space-x-1"
          >
            <Paperclip size={18} />
            <span className=" hidden sm:flex">Attach</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1"
          >
            <FileSearch size={18} />
            <span className=" hidden sm:flex">Browse Propmts</span>
          </Button>
        </div>
        <div>
          <span className="text-gray-500 dark:text-gray-700 sm:text-sm text-xs">
            {input.length}/{AI_CHAT_CONFIG.MAX_INPUT_CHARS}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default AIChatForm;
