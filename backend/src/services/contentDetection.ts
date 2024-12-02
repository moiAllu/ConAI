import { AiDetection } from "../mongodb/models";
import { PlagrismDetection } from "../mongodb/models";

export const getAiDetctionHistory = async (userId:string) => {
    try{
        const aiDetctionHistory = await AiDetection.findOne({
            userId,
        });
        if (aiDetctionHistory) {
            return aiDetctionHistory.data.map((doc) => ({
                userId: aiDetctionHistory.userId,
                _id: doc._id,
                prompt: doc.prompt,
            }));
        }
        return [];
    }
    catch(e){
        return e;
    }
}
export const getPlagrismDetectionHistory = async (userId:string) => {
    try{
        const plagrismDetectionHistory = await PlagrismDetection.findOne({
            userId,
        });
        if (plagrismDetectionHistory) {
            return plagrismDetectionHistory.data.map((doc) => ({
                userId: plagrismDetectionHistory.userId,
                _id: doc._id,
                prompt: doc.prompt,
            }));
        }
        return [];
    }
    catch(e){
        return e;
    }
}
export const getAiDetectionById= async(userId:string, id:string) => {
    try{
        const response = await AiDetection.findOne({userId})
        const aiDetection = response.data.find((doc) => doc._id.toString() === id);
        if(aiDetection){
            return aiDetection;
        }
        return null;
    }catch(e){
        return e;
    }
}
export const getPlagDetectionById= async(userId:string, id:string) => {
    try{
        const response = await PlagrismDetection.findOne({userId})
        const plagrismDetection = response.data.find((doc) => doc._id.toString() === id);
        if(plagrismDetection){
            return plagrismDetection;
        }
        return null;
    }catch(e){
        return e;
    }
}
