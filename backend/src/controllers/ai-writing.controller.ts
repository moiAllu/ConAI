import { Request, Response } from "express";
import {
  deleteAiWritingByIdHandler,
  getAiWritingsByIds,
  getUserAiWritings,
  storeMessageInAiWritingHistory,
} from "../services/aiWritingHistory";
import { getGPTResponse } from "../open-ai";
import { checkAndUpdateUsage } from "../services/usageLimits";

export const getUserAiWritingsHistory = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const userWritings = await getUserAiWritings(userId);
    return res.status(200).json({
      message: "User writings fetched successfully",
      status: 200,
      data: userWritings,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Internal server error",
      status: 500,
    });
  }
};
export const getAiWritingById = async (req: Request, res: Response) => {
  const { id, userId } = req.params;
  try {
    const userWritings = await getAiWritingsByIds(id, userId);
    if (!userWritings) {
      return res.status(404).json({
        message: "Document not found",
        status: 404,
      });
    }
    return res.status(200).json({
      message: "User writings fetched successfully",
      status: 200,
      data: userWritings,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Internal server error",
      status: 500,
    });
  }
};
export const deleteAiWritingById = async (req: Request, res: Response) => {
  const { id, userId } = req.params;
  try {
    const userWritings = await deleteAiWritingByIdHandler(userId, id);
    if (!userWritings) {
      return res.status(404).json({
        message: "Document not found",
        status: 404,
      });
    }
    return res.status(200).json({
      message: "Document successfully deleted",
      status: 200,
      data: userWritings,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Internal server error",
      status: 500,
    });
  }
};

export const aiWritingController = async (req: Request, res: Response) => {
  const { promptMods, prompt, userId, chatId, stripe_subscription_id } =
    req.body;
  const lengthDescriptor =
    promptMods.inputLength === "500"
      ? "around 500 words (between 450 and 550 words)"
      : promptMods.inputLength === "1500"
      ? "around 1500 words (between 1400 and 1600 words)"
      : promptMods.inputLength === "3000"
      ? "around 3000 words (between 2900 and 3100 words)"
      : `${promptMods.inputLength} words`;

  const promptTuning = `Create a ${promptMods.inputFormat}${
    promptMods.inputType ? " in the format of " + promptMods.inputType : ""
  }. The tone should be ${promptMods.inputTone}, tailored for an audience of ${
    promptMods.inputAgeGroup
  }. Ensure the content is specifically suited for this age group, with a length of ${lengthDescriptor}. The topic is: ${prompt}.`;

  try {
    const usage = await checkAndUpdateUsage(
      userId,
      stripe_subscription_id,
      "aiWriting"
    );
    const aiResp = await getGPTResponse({ prompt: promptTuning });
    const userInput = await storeMessageInAiWritingHistory(
      userId,
      prompt,
      prompt,
      chatId,
      "user"
    );
    const aiResponse = await storeMessageInAiWritingHistory(
      userId,
      aiResp,
      aiResp,
      userInput.id ? userInput.id : chatId,
      "ai"
    );

    if (!userInput.id) {
      return res.status(500).json({
        message: "Internal server error",
        status: 500,
      });
    }

    return res.status(200).json({
      message: "Document stored successfully",
      status: 200,
      data: aiResp,
      storeId: userInput.id,
      userInputId: userInput.documentId,
      aiResponseId: aiResponse.documentId,
      usage: {
        current: usage.currentUsage,
        limit: usage.limit,
        remaining: usage.remaining,
      },
    });
  } catch (e) {
    if (e.message.includes("limit")) {
      return res.status(403).json({
        message: e.message,
        status: 403,
      });
    }
    return res.status(500).json({
      message: "Internal server error",
      status: 500,
    });
  }
};
