import { Request, Response } from 'express';
import { getGPTResponse } from '../open-ai';
import { storeMessageInChatHistory } from '../services/chatHistory';

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
    const chatId2 = '669821ca7fce64ab05a88de5';

    // async operations, no need to wait for response
    // kind of fire and forget
    storeMessageInChatHistory(chatId2, title, userId, 'user', prompt);
    storeMessageInChatHistory(chatId2, title, userId, 'assistant', aiResp);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: 'Internal server error',
      status: 500,
    });
  }
};
