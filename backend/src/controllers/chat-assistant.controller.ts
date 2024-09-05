import { Request, Response } from 'express';
import { getGPTResponse } from '../open-ai';
import {
  storeMessageInChatHistory,
  getChatHistory,
  getUserChats,
} from '../services/chatHistory';
import jwt from 'jsonwebtoken';

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
  try {
    if (!prompt) {
      return res.status(400).json({
        message: 'Invalid request',
        status: 400,
      });
    }

    // UNCOMMENT WHEN NEEDED
    const aiResp = await getGPTResponse({prompt});
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

    await storeMessageInChatHistory(
      newChatId ? newChatId : chatId,
      title,
      userId,
      'assistant',
      aiResp
    );

    return res.status(200).json({
      message: 'AI response generated successfully',
      status: 200,
      data: aiResp,
      chatId: newChatId ? newChatId : undefined,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: 'Internal server error',
      status: 500,
    });
  }
};
