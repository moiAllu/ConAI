import { Summarize } from "../mongodb/models";

export const getSummarizerByUserId = async (summarizeId: string, userId: string) => {
    try{
        const userSummarizer= await Summarize.findOne({ userId}, {summarizes: {$elemMatch: {_id: summarizeId}}});
        if(!userSummarizer){
            return new Error('Document not found');
        }
        return userSummarizer;
    } catch(e){
        console.log(e);
        return null;
    }
}
export const getSummarizerHistory = async (userId: string) => {
    try{
        const userSummarizerHistory = await Summarize.find({ userId });
        return userSummarizerHistory;
    } catch(e){
        console.log(e);
        return null;
    }
}
export const deleteSummarizerById = async (id: string, userId: string) => {
    try{
        const userSummarizer = await Summarize.findOneAndDelete({ _id: id, userId });
        if(!userSummarizer){
            return new Error('Document not found');
        }
        return userSummarizer;
    } catch(e){
        console.log(e);
        return null;
    }
}
export const storeAiGeneratedSummarize= async (intensity:string, content:string, userId:string , output:string) => {
    try{
        if(!content|| !output || !userId){
            throw new Error("Missing required fields");
        }
        const summarize = await Summarize.findOne({
            userId
            });
    
        if(summarize){
            summarize.summarizes.push({input:content, output, created_at: new Date(), intensity});
            await summarize.save();
            return summarize.summarizes.at(-1);
        }
        const newSummarize = new Summarize({userId:userId, rewrites: [{input:content, output, created_at: new Date(), intensity}]});
        await newSummarize.save();
        return newSummarize.summarizes.at(-1); 
    }
    catch(e){
        throw e;
    }
}