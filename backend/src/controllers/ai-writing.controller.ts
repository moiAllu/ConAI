import { Request, Response } from "express";
import { getAiWritingsByIds, getUserAiWritings,storeMessageInAiWritingHistory} from "../services/aiWritingHistory";
import { getGPTResponse } from "../open-ai";

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
}
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
}

export const aiWritingController= async (req: Request, res: Response) => {
    const { promptMods,prompt,userId,chatId} = req.body;
    const promptTuning = `Create a ${promptMods.inputFormat}${promptMods.inputType ? " in the format of " + promptMods.inputType : ""}. The tone should be ${promptMods.inputTone}, tailored for an audience of ${promptMods.inputAgeGroup}. Ensure the content is specifically suited for this age group, with a length of ${promptMods.inputLength}. The topic is: ${prompt}.`;


    try {
        const aiResp = await getGPTResponse({prompt: promptTuning});
        const  userInput = await storeMessageInAiWritingHistory(userId,prompt, prompt,chatId,"user");
        const aiResponse = await storeMessageInAiWritingHistory(userId,aiResp, aiResp,userInput.id ? userInput.id:chatId ,"ai");

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
        storeId : userInput.id,
        userInputId: userInput.documentId,
        aiResponseId: aiResponse.documentId
        });


    } catch (e) {
        console.log(e);
        return res.status(500).json({
        message: "Internal server error",
        status: 500,
        });
    }
}


