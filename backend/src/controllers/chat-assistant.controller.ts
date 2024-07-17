import { Request, Response } from 'express';
import { getGPTResponse } from '../open-ai';

export const getGPTReponseController = async (req: Request, res: Response) => {
  const { prompt } = req.body;
  try {
    if (!prompt) {
      return res.status(400).json({
        message: 'Invalid request',
        status: 400,
      });
    }
    const aiResp = await getGPTResponse(prompt);
    return res.status(200).json({
      message: 'AI response generated successfully',
      status: 200,
      data: aiResp,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: 'Internal server error',
      status: 500,
    });
  }
};
