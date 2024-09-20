import { CONFIG } from '../config';
import openAIClient from '../config/open-ai';

interface gptResponseInterface {
  model?: string;
  prompt: string;
}

export const getGPTResponse = async ({prompt, model}: gptResponseInterface) => {
  try {
    const chatCompletion = await openAIClient.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: model || CONFIG.OPENAI_GPT_MODEL,
      stream: false,
    },
  );
    return chatCompletion.choices[0].message.content;
  } catch (error) {
    console.log('getGPTResponse ', error);
    return 'Error generating AI response';
  }
};

export const getContentDetectionOpenAiRes =  async (prompt: string) => {
  try {
    const contentDetection = await openAIClient.chat.completions.create({
      messages: [{ role:'user' , content: prompt }],
      model:  "gpt-4o",
      stream: false,
      temperature: 0.1,
    });
    return contentDetection.choices[0].message.content;
  } catch (error) {
    console.log('getContentDetectionOpenAi ', error);
    return 'Error generating AI response';
  }
}

export const getRewriteOpenAiRes= async ({prompt,model}:gptResponseInterface) => {
  try {
    const rewriteResponse = await openAIClient.completions.create({
      model: model || CONFIG.OPENAI_GPT_MODEL,
      prompt: prompt,
      max_tokens: 100,
      n: 1,
      stop: ['###'],
    });
    return rewriteResponse.choices[0].text;
  } catch (error) {
    console.log('getRewriteOpenAiRes ', error);
    return 'Error generating AI response';
  }
}

export const getSummarizeOpenAiRes = async ({prompt,model}:gptResponseInterface) => {
  try {
    const summarizeResponse = await openAIClient.completions.create({
      model: model || CONFIG.OPENAI_GPT_MODEL,
      prompt: prompt,
      max_tokens: 100,
      n: 1,
      stop: ['###'],
    });
    return summarizeResponse.choices[0].text;
  } catch (error) {
    console.log('getSummarizeOpenAiRes ', error);
    return 'Error generating AI response';
  }
}