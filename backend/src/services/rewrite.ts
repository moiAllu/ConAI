import { Rewrite } from '../mongodb/models';
export const storeAiGeneratedRewrite= async (input:string,output:string, userId:string, intensity:string, mode:string,inputLanguage:string) => {
    try{
        if(!input || !output || !userId){
            throw new Error("Missing required fields");
        }
        const rewrite = await Rewrite.findOneAndUpdate({userId}, {$push: {rewrites: {userId, input, output, created_at: new Date(), intensity, mode, inputLanguage}}});
        if(rewrite){
            return rewrite.rewrites.at(-1);
        }
        const newRewrite = new Rewrite({userId, rewrites:[{userId, input, output, created_at: new Date(), intensity, mode, inputLanguage}]});
        await newRewrite.save();
        return newRewrite.rewrites.at(-1);
    }
    catch(e){
        throw e;
    }
}
export const getAiGeneratedRewriteHistory = async (userId:string) => {
    try{
        if(!userId){
            throw new Error("Missing required fields");
        }
        return await Rewrite.find({userId});
    }
    catch(e){
        throw e;
    }
}
export const getAiGeneratedRewriteById = async (docId:string, userId:string) => {
    try{
        if(!docId || !userId){
            throw new Error("Missing required fields");
        }
        return await Rewrite.findOne({userId}, {rewrites: {$elemMatch: {_id: docId}}});
    }
    catch(e){
        throw e;
    }
}
export const deleteAiGeneratedRewriteById = async (docId:string, userId:string) => {
    try{
        if(!docId || !userId){
            throw new Error("Missing required fields");
        }
        return await Rewrite.findOneAndDelete({userId}, {rewrites: {$elemMatch: {_id: docId}}});
    }
    catch(e){
        throw e;
    }
}

