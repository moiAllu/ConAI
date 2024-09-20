import { getRewriteOpenAiRes } from 'open-ai';
import {Rewrite} from '../mongodb/models';
export const getUserRewriteHistory = async (req, res) => {
    const {userId} = req.body;
    try {
        const userRewriteHistory = await Rewrite.find({userId});
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
export const getUserRewriteById = async (req, res) => {
    const {userId, id} = req.body;
    try{
        const userRewrite = await Rewrite.findOne({userId, _id: id});
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
interface PromptTuning {
    intensity: string;
    mode: string;
}
const PromptTuning = ({intensity,mode}:PromptTuning) => {
    if(mode === "recreate"){
        return "Recreate the proveided content from scratch";
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
export const rewriteController = async (req, res) => {
    const {intensity, mode , inputLanguage, content, userId , model} = req.body;

    try{
        const promptTuning = PromptTuning({intensity, mode});
        const response = await getRewriteOpenAiRes({prompt: promptTuning + content, model});
        if(!response){
            res.status(404).json({
                message: 'Content not found',
                status: 404,
            });
        }
        const rewrite = await Rewrite.findOne({userId});
        if(rewrite){
            rewrite.rewrites.push({userId, input:content, output:response, created_at: new Date()});
            await rewrite.save();
            return res.status(200).json({
                message: 'Rewrite created successfully',
                status: 200,
                data: rewrite,
            });
        }
        const newRewrite = new Rewrite({userId, rewrites:[{userId, input:content, output:response, created_at: new Date()}]});
        await newRewrite.save();
        return res.status(200).json({
            message: 'Rewrite created successfully',
            status: 200,
            data: newRewrite,
        });
    }catch (e){
        console.log(e);
        return res.status(500).json({
            message: 'Internal server error',
            status: 500,
        });
    } 
}


