import { getGeneratedImage } from "../open-ai";
import { Request, Response } from "express";
import { storeGeneratedImageInHistory } from "../services/imageGenerationHistory";

export const imageGenerationController = async (req: Request, res: Response) => {
    const { prompt, userId } = req.body;
    try {
        const imageGeneration = await getGeneratedImage(prompt);
        if (!imageGeneration) {
            return res.status(404).json({
                message: "Image not found",
                status: 404,
            });
        }
        const storedImage= await storeGeneratedImageInHistory(userId, prompt, imageGeneration);
        if(!storedImage){
            return res.status(500).json({
                message: "Failed to store image in history",
                status: 500,
            });
        }
        return res.status(200).json({
            message: "Image generated successfully",
            status: 200,
            data: imageGeneration,
        });
    } catch (e) {
        return res.status(500).json({
            message: "Internal server error",
            status: 500,
        });
    }
}
export const getGeneratedImageHistory = async (req: Request, res: Response) => {   
    try {
        const imageGeneration = ""
        return res.status(200).json({
            message: "Image generated successfully",
            status: 200,
            data: imageGeneration,
        });
    } catch (e) {
        return res.status(500).json({
            message: "Internal server error",
            status: 500,
        });
    }
}
export const getGeneratedImageById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const imageGeneration = ""
        return res.status(200).json({
            message: "Image generated successfully",
            status: 200,
            data: imageGeneration,
        });
    } catch (e) {
        return res.status(500).json({
            message: "Internal server error",
            status: 500,
        });
    }
}
export const deleteGeneratedImageById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const imageGeneration = ""
        return res.status(200).json({
            message: "Image deleted successfully",
            status: 200,
            data: imageGeneration,
        });
    } catch (e) {
        return res.status(500).json({
            message: "Internal server error",
            status: 500,
        });
    }
}
