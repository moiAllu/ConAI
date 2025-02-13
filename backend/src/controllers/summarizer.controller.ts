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
  try {
    const output = await getSummarizeOpenAiRes(
      { prompt: content, model: "gpt-3.5-turbo-0125" },
      "Summarize the following content."
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
