import { Request, Response } from "express";
import {
  getSummarizerByUserId,
  getSummarizerHistory,
  deleteSummarizerById,
  storeAiGeneratedSummarize,
} from "../services/summarizer";
import { getSummarizeOpenAiRes } from "../open-ai";

export const getSummarizerHistoryContorller = async (
  req: Request,
  res: Response
) => {
  const { userId } = req.params;
  try {
    const userSummarizerHistory = await getSummarizerHistory(userId);
    if (!userSummarizerHistory) {
      return res.status(404).json({
        message: "Document not found",
        status: 404,
      });
    }
    return res.status(200).json({
      message: "User summarizer history fetched successfully",
      status: 200,
      data: userSummarizerHistory,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Internal server error",
      status: 500,
    });
  }
};

export const getSummarizerByUserIdController = async (
  req: Request,
  res: Response
) => {
  const { userId, summarizeId } = req.params;
  try {
    const userSummarizer = await getSummarizerByUserId(userId, summarizeId);
    if (!userSummarizer) {
      return res.status(404).json({
        message: "Document not found",
        status: 404,
      });
    }
    return res.status(200).json({
      message: "User summarizer fetched successfully",
      status: 200,
      data: userSummarizer,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Internal server error",
      status: 500,
    });
  }
};

export const deleteSummarizerByIdController = async (
  req: Request,
  res: Response
) => {
  const { summarizeId, userId } = req.params;
  try {
    const userSummarizer = await deleteSummarizerById(summarizeId, userId);
    if (!userSummarizer) {
      return res.status(404).json({
        message: "Document not found",
        status: 404,
      });
    }
    return res.status(200).json({
      message: "User summarizer deleted successfully",
      status: 200,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Internal server error",
      status: 500,
    });
  }
};

export const createSummarizer = async (req: Request, res: Response) => {
  const { intensity, content, userId } = req.body;

  let summarizationPrompt = "";

  switch (intensity.toLowerCase()) {
    case "short":
      summarizationPrompt = `
Summarize the following content, retaining most of the details. The summary should be concise but comprehensive.
`;
      break;
    case "medium":
      summarizationPrompt = `
Summarize the following content, retaining key points and important information. The summary should be concise and not exceed 1/2 of original text.
`;
      break;
    case "long":
      summarizationPrompt = `
Summarize the following content, retaining only the most critical information. The summary should be very concise and exceed 1/2 of original text.
`;
      break;
    default:
      summarizationPrompt = `
Summarize the following content, retaining key points and important information. The summary should be concise and not exceed 500 words.
`;
  }

  try {
    const output = await getSummarizeOpenAiRes(
      { prompt: content, model: "gpt-4o" },
      summarizationPrompt,
      intensity
    );
    const userSummarizer = await storeAiGeneratedSummarize(
      intensity,
      content,
      userId,
      output
    );
    return res.status(200).json({
      message: "Summarizer created successfully",
      status: 200,
      data: userSummarizer,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Internal server error",
      status: 500,
    });
  }
};
