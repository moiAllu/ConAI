import { getRewriteOpenAiRes } from '../open-ai';
import { Request, Response } from 'express';
import {Rewrite} from '../mongodb/models';
import { storeAiGeneratedRewrite, getAiGeneratedRewriteHistory, getAiGeneratedRewriteById, deleteAiGeneratedRewriteById } from '../services/rewrite';
export const getUserRewriteHistory = async (req:Request,res:Response) => {
    const {userId} = req.params;
    try {
        const userRewriteHistory = await getAiGeneratedRewriteHistory(userId);
        return res.status(200).json({
            message: 'User rewrite history fetched successfully',
            status: 200,
            data: userRewriteHistory,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: 'Internal server error',
            status: 500,
        });
    }
}
export const getUserRewriteById = async (req:Request,res:Response) => {
    const {userId, rewriteId} = req.params;
    console.log(userId, rewriteId);
    try{
        const userRewrite = await getAiGeneratedRewriteById(rewriteId, userId);
        if (!userRewrite) {
            return res.status(404).json({
                message: 'Document not found',
                status: 404,
            });
        }
        return res.status(200).json({
            message: 'User rewrite fetched successfully',
            status: 200,
            data: userRewrite,
        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: 'Internal server error',
            status: 500,
        });
    }
}
export const deleteUserRewriteById = async (req:Request,res:Response) => {
    const {userId, id} = req.params;
    try{
        const userRewrite = await deleteAiGeneratedRewriteById(id, userId);
        if (!userRewrite) {
            return res.status(404).json({
                message: 'Document not found',
                status: 404,
            });
        }
        return res.status(200).json({
            message: 'User rewrite deleted successfully',
            status: 200,
        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: 'Internal server error',
            status: 500,
        });
    }
}
interface PromptTuning {
    intensity: string;
    mode: string;
}
const PromptTuning = ({intensity,mode}:PromptTuning) => {
    if(mode === "recreate"){
        return "Retain only the context from user input, Recreate it from scratch. It should be unique and not plagiarized";
    }
    if(intensity === "low" && mode === "rewrite"){
        return "Rewrite the content with a low intensity, write in such a way that the content is not plagiarized";
    }
    if(intensity === "medium" && mode === "rewrite"){
        return "Rewrite the content with a medium intensity, write in such a way that the content is not plagiarized";
    }
    if(intensity === "high" && mode === "rewrite"){
        return "Rewrite the content with a high intensity, write in such a way that the content is not plagiarized";
    }
}
export const rewriteController = async (req:Request,res:Response) => {
    const {intensity, mode , inputLanguage, content, userId , model} = req.body;
    try{
        const tunedPrompt = PromptTuning({intensity, mode});
        const response = await getRewriteOpenAiRes({prompt: content, model}, `Your serve here as a rewriter. ${tunedPrompt}`);
        if(!response){
            res.status(404).json({
                message: 'Content not found',
                status: 404,
            });
        }
       const rewrite = await storeAiGeneratedRewrite(content,response, userId, intensity,mode,inputLanguage);
        return res.status(200).json({
            message: 'Rewrite created successfully',
            status: 200,
            data: rewrite,
        });
    }catch (e){
        console.log(e);
        return res.status(500).json({
            message: 'Internal server error',
            status: 500,
        });
    } 
}


