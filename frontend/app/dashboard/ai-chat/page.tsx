import React from 'react';
import ReactivateSubscription from '../components/reactivate-subscription';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SelectModel } from './components/select-model';
import AIChatForm from './components/ai-chat-form';

const AIWritingPage = () => {
  return (
    <div className="p-2 flex flex-col w-full h-full max-h-[1440px] ">
      <div className="flex justify-between w-full items-center justify-items-center mt-6">
        <SelectModel />
        <ReactivateSubscription />
      </div>
      <Separator className="my-4" />
      <div className="w-full h-full justify-between flex-col flex">
        <div className="w-full h-full flex-col">
          <div className="justify-center flex flex-grow flex-col sm:p-6 p-2 items-center text-center">
            <h1 className="text-3xl font-semibold">AI Chat</h1>
            <p className="text-gray-500 dark:text-gray-700 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
          </div>
          <div className="w-full justify-center flex min-w-lg ">
            <Card className="grid sm:grid-cols-2 gap-2 sm:p-5 p-2 items-center w-[90%]  border-none ">
              <Card className="hidden sm:flex flex-col">
                <CardHeader>
                  <CardTitle className="text-md">AI Writing</CardTitle>
                </CardHeader>
                <CardContent>
                  <span className="text-center">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  </span>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-md">AI Writing</CardTitle>
                </CardHeader>
                <CardContent>
                  <span className="text-center">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  </span>
                </CardContent>
              </Card>
            </Card>
          </div>
        </div>
        <div className="w-full justify-center flex min-w-lg">
          <AIChatForm />
        </div>
      </div>
    </div>
  );
};

export default AIWritingPage;
