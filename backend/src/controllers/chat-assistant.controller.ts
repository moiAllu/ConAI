import { Request, Response } from 'express';
import { getGPTResponse } from '../open-ai';
import {
  storeMessageInChatHistory,
  getChatHistory,
  getUserChats,
} from '../services/chatHistory';

export const getUserChatsController = async (req: Request, res: Response) => {
  try {
    // TODO: GET FROM REQUEST AFTER JWT AUTHENTICATION
    // const userId = req.user.id;
    const userId = '1234';

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
  try {
    // TODO: GET FROM REQUEST AFTER JWT AUTHENTICATION
    // const userId = req.user.id;
    const userId = '1234';

    // get from MOngo Model

    const chatHistory = await getChatHistory(chatId, userId);

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
  const { chatId, title, prompt } = req.body;
  try {
    if (!prompt) {
      return res.status(400).json({
        message: 'Invalid request',
        status: 400,
      });
    }

    // UNCOMMENT WHEN NEEDED
    // const aiResp = await getGPTResponse(prompt);
    const aiResp = 'UNCOMMENT THE ABOVE LINE TO GET AI RESPONSE';

    res.status(200).json({
      message: 'AI response generated successfully',
      status: 200,
      data: aiResp,
    });

    // TODO: GET FROM REQUEST AFTER JWT AUTHENTICATION
    // const userId = req.user.id;
    const userId = '1234';

    // async operations, no need to wait for response
    // kind of fire and forget
    await storeMessageInChatHistory(chatId, title, userId, 'user', prompt);
    await storeMessageInChatHistory(chatId, title, userId, 'assistant', aiResp);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: 'Internal server error',
      status: 500,
    });
  }
};
