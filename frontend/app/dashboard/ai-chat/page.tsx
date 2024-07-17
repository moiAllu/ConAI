import React from 'react';
import ReactivateSubscription from '../components/reactivate-subscription';
import { Separator } from '@/components/ui/separator';
import { SelectModel } from './components/select-model';
import AIChatForm from './components/ai-chat-form';
import AIChatHistory from './components/ai-chat-history';

const AIWritingPage = () => {
  return (
    <div className="p-2 flex flex-col w-full h-full max-h-[1440px] ">
      <div className="flex justify-between w-full items-center justify-items-center mt-6">
        <SelectModel />
        <ReactivateSubscription />
      </div>
      <Separator className="my-4" />
      <div className="w-full h-full justify-between flex-col flex overflow-y-auto">
        <AIChatHistory />
        <div className="w-full justify-center flex min-w-lg">
          <AIChatForm />
        </div>
      </div>
    </div>
  );
};

export default AIWritingPage;
