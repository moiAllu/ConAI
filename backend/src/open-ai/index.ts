import { CONFIG } from '../config';
import openAIClient from '../config/open-ai';


interface gptResponseInterface {
  model?: string;
  prompt: string;
}
const systemPrompt = "Please respond in Markdown format, when appropriate, avoiding unnecessary formatting in formal contexts like letters or applications. Include headings."
export const getGPTResponse = async ({prompt, model}: gptResponseInterface) => {
  try {
    const chatCompletion = await openAIClient.chat.completions.create({
      messages: [{ role: 'user', content: prompt }, { role: 'assistant', content: systemPrompt }],
      model: model || CONFIG.OPENAI_GPT_MODEL,
      stream: true,
    },
  );
  const fullResponse = [];
     for await(const chunks of chatCompletion){
      chunks.choices[0]?.delta?.content || 'Error generating AI response';
      fullResponse.push(chunks.choices[0]?.delta?.content);
     }
     return fullResponse.join('');
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
    const contentDetection = await openAIClient.chat.completions.create({
      messages: [{ role:'user' , content: prompt }],
      model:  model || "gpt-3.5-turbo-0125",
      stream: false,
      temperature: 0.1,
    });
    return contentDetection.choices[0].message.content;
  } catch (error) {
    console.log('getSummarizeOpenAiRes ', error);
    return 'Error generating AI response';
  }
}

export const getSummarizeChatHistoryOpenAiRes = async (messages:any, model:"gpt-3.5-turbo-0125"|"gpt-4o") => {
  try {
    const contentDetection = await openAIClient.chat.completions.create({
      messages: [...messages, { role:'assistant' , content: "Summarize the following conversation." }],
      model:  model || "gpt-3.5-turbo-0125",
      stream: false,
      temperature: 0.1,
    });
    return contentDetection.choices[0].message.content;
  } catch (error) {
    console.log('getSummarizeOpenAiRes ', error);
    return 'Error generating AI response';
  }
}

export const getGeneratedImage = async (prompt:string) => {
  console.log('prompt', prompt);
  try {
    const generatedImage = await openAIClient.images.generate({
      prompt,
      model: 'dall-e-3',
      n: 1,
    });
    
    return generatedImage.data[0].url;
  } catch (error) {
    // console.log('getGeneratedImage ', error);
    return {'Error generating AI response' : error};
  }
}