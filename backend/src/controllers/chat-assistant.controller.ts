import { Request, Response } from 'express';
import { getGPTResponse } from '../open-ai';
import {
  storeMessageInChatHistory,
  getChatHistory,
  getUserChats,
} from '../services/chatHistory';
import jwt from 'jsonwebtoken';
import openAIClient from '../config/open-ai';


export const getUserChatsController = async (req: Request, res: Response) => {
  const {userId} =req.params;
  try {
    // TODO: GET FROM REQUEST AFTER JWT AUTHENTICATION

    // get from MOngo Model
    const userChats = await getUserChats(userId);

    return res.status(200).json({
      message: 'User chats fetched successfully',
      status: 200,
      data: userChats,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: 'Internal server error',
      status: 500,
    });
  }
};

export const getChatHistoryController = async (req: Request, res: Response) => {
  const { chatId } = req.params;
  const token = req.header('Authorization');
  try {
    // TODO: GET FROM REQUEST AFTER JWT AUTHENTICATION
    // const userId = req.user.id;
    const {user} = jwt.verify(token, process.env.JWT_SECRET)
    // get from MOngo Model
    const chatHistory = await getChatHistory(chatId, user._id);
    if (!chatHistory) {
      return res.status(404).json({
        message: 'Chat not found',
        status: 404,
      });
    }
    return res.status(200).json({
      message: 'Chat history fetched successfully',
      status: 200,
      data: chatHistory,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: 'Internal server error',
      status: 500,
    });
  }
};

export const getGPTReponseController = async (req: Request, res: Response) => {
  const { chatId, title, prompt, _id } = req.body;
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');

  try {
    if (!prompt) {
      return res.status(400).write(`error: ${JSON.stringify('Prompt is required')}\n\n`);
    }
    // UNCOMMENT WHEN NEEDED
    const systemPrompt = "Please respond in Markdown format, when appropriate, avoiding unnecessary formatting in formal contexts like letters or applications. Include headings."
    const chatCompletion = await openAIClient.chat.completions.create({
      messages: [{ role: 'user', content: prompt }, { role: 'assistant', content: systemPrompt }],
      // model: model || CONFIG.OPENAI_GPT_MODEL,
      model: 'gpt-3.5-turbo-0125',
      stream: true,
    },
  );
  if(!chatCompletion){
     console.log('Content not found');
     return res.write(`error: ${JSON.stringify('Content not found')}\n\n`);
  }
    // const aiResp = 'UNCOMMENT THE ABOVE LINE TO GET AI RESPONSE';
  
    // TODO: GET FROM REQUEST AFTER JWT AUTHENTICATION
    // const userId = req.user.id;
    const userId = _id;
    const newChatId = await storeMessageInChatHistory(
      chatId,
      title,
      userId,
      'user',
      prompt
    );
    const tempMessageId = Math.floor(Math.random() * 10000);
    res.write(`chatId: ${newChatId ? newChatId : chatId}\n\n`);
    res.write(`messageId: ${tempMessageId}\n\n`);
    let aiResp = "";
    for await (const chunks of chatCompletion) {
      if (chunks.choices[0]?.finish_reason === 'stop') {
          res.write('data: [DONE]\n\n');
          await storeMessageInChatHistory(
            newChatId ? newChatId : chatId,
            title,
            userId,
            'assistant',
            aiResp
          );
          return res.end();
      }
      const content = chunks.choices[0]?.delta?.content;
      if (content) {
          aiResp += content;
          res.write(`data: ${JSON.stringify(content)}\n\n`);
      }
  }
    // return res.status(200).json({
    //   message: 'AI response generated successfully',
    //   status: 200,
    //   data: aiResp,
    //   chatId: newChatId ? newChatId : undefined,
    // });
  } catch (e) {
    console.log(e);
    return res.status(500).write(`error: ${JSON.stringify(e)}\n\n`);
  }
};
