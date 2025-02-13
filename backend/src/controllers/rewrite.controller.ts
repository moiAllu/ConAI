import { getRewriteOpenAiRes } from "../open-ai";
import { Request, Response } from "express";
import { Rewrite } from "../mongodb/models";
import {
  storeAiGeneratedRewrite,
  getAiGeneratedRewriteHistory,
  getAiGeneratedRewriteById,
  deleteAiGeneratedRewriteById,
} from "../services/rewrite";
export const getUserRewriteHistory = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const userRewriteHistory = await getAiGeneratedRewriteHistory(userId);
    return res.status(200).json({
      message: "User rewrite history fetched successfully",
      status: 200,
      data: userRewriteHistory,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Internal server error",
      status: 500,
    });
  }
};
export const getUserRewriteById = async (req: Request, res: Response) => {
  const { userId, rewriteId } = req.params;
  try {
    const userRewrite = await getAiGeneratedRewriteById(rewriteId, userId);
    if (!userRewrite) {
      return res.status(404).json({
        message: "Document not found",
        status: 404,
      });
    }
    return res.status(200).json({
      message: "User rewrite fetched successfully",
      status: 200,
      data: userRewrite,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Internal server error",
      status: 500,
    });
  }
};
export const deleteUserRewriteById = async (req: Request, res: Response) => {
  const { rewriteId, userId } = req.params;
  try {
    const userRewrite = await deleteAiGeneratedRewriteById(rewriteId, userId);
    if (!userRewrite) {
      return res.status(404).json({
        message: "Document not found",
        status: 404,
      });
    }
    return res.status(200).json({
      message: "User rewrite deleted successfully",
      status: 200,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Internal server error",
      status: 500,
    });
  }
};
interface PromptTuning {
  intensity: string;
  mode: string;
}
const PromptTuning = ({ intensity, mode }: PromptTuning) => {
  if (mode === "Recreate") {
    return "Your task is to retain only the relevant context from the user input and generate a completely original version from scratch. Ensure the output is unique and free from any form of plagiarism.";
  }

  if (intensity === "Low" && mode === "Rewrite") {
    return "Your goal is to reduce any plagiarism by modifying the text. Keep the original meaning intact while altering some words and phrasing to make it sound more natural and unique. Avoid overusing conjunctions (e.g., is, and, the). If you're unable to make meaningful changes, return the original text as is.";
  }

  if (intensity === "Medium" && mode === "Rewrite") {
    return "Rewrite the content with moderate changes. Ensure that the new version is not plagiarized and is rephrased adequately, maintaining the original meaning and tone. Aim for a balance between altering the text and keeping it coherent and natural.";
  }

  if (intensity === "High" && mode === "Rewrite") {
    return "Rewrite the content with significant changes to ensure it is completely original and free from plagiarism. The new text should be substantially different in structure and wording while still conveying the same message and tone. Strive for a high level of creativity and rewording to make it unique.";
  }
};
export const rewriteController = async (req: Request, res: Response) => {
  const { intensity, mode, inputLanguage, content, userId, model } = req.body;
  try {
    const tunedPrompt = PromptTuning({ intensity, mode });
    const response = await getRewriteOpenAiRes(
      { prompt: content, model },
      `Your serve here as a rewriter. ${tunedPrompt}`
    );
    if (!response) {
      res.status(404).json({
        message: "Content not found",
        status: 404,
      });
    }
    const rewrite = await storeAiGeneratedRewrite(
      intensity,
      mode,
      inputLanguage,
      content,
      userId,
      model,
      response
    );
    return res.status(200).json({
      message: "Rewrite created successfully",
      status: 200,
      data: rewrite,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Internal server error",
      status: 500,
    });
  }
};
