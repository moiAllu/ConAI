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
