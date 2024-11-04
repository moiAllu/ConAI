import { getGeneratedImage } from "../open-ai";
import { Request, Response } from "express";
import { getUserImageHistory, storeGeneratedImageInHistory, getGeneratedImageByUserId } from "../services/imageGenerationHistory";

export const imageGenerationController = async (req: Request, res: Response) => {
    const { data, userId } = req.body;
    const { aspect,
        style,
        background,
        color,
        prompt, } = data;
        if (!aspect || !style || !background || !color || !prompt) {
            return res.status(400).json({
                message: "Missing required fields",
                status: 400,
            });
        }
        const tunePrompt = `create a ${aspect} image, ${style} style with ${background} background and ${color} color. ${prompt}`;
    try {
        const imageGeneration:any  = await getGeneratedImage(tunePrompt);
        if (!imageGeneration.b64_json) {
            return res.status(404).json({
                message: "Image not found",
                status: 404,
            });
        }
        const storedImage= await storeGeneratedImageInHistory(userId, prompt, imageGeneration.b64_json, imageGeneration.revised_prompt);
        if(storedImage.status !== 200){
            return res.status(500).json({
                message: "Failed to store image in history",
                status: 500,
            });
        }
        return res.status(200).json({
            message: "Image generated successfully",
            status: 200,
            data: storedImage,
        });
    } catch (e) {
        return res.status(500).json({
            message: "Internal server error",
            status: 500,
        });
    }
}
export const getGeneratedImageHistory = async (req: Request, res: Response) => {   
    const {userId} = req.params;
    try {
        const images= await getUserImageHistory(userId);
        return res.status(200).json({
            message: "Image generated successfully",
            status: 200,
            data: images,
        });
    } catch (e) {
        return res.status(500).json({
            message: "Internal server error",
            status: 500,
        });
    }
}
export const getGeneratedImageById = async (req: Request, res: Response) => {
    const { imageId , userId } = req.params;
    try {
        const imageGeneration = await getGeneratedImageByUserId(imageId, userId);
        return res.status(200).json({
            message: "Image fetched successfully",
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
