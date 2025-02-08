import { AiWriting } from "../mongodb/models";

export const getUserAiWritings = async (userId:string) => {
    try {
        const aiWritingHistory = await AiWriting.find({
             userId,
        });
        if (aiWritingHistory) {
            return aiWritingHistory.map((doc) => ({
                _id: doc._id,
                title: doc.title,
                createdAt: doc.createdAt,
                }));
        }
        return [];
    }
    catch (e) {
        console.log(e);
    }
}
export const getAiWritingsByIds = async (id:string, userId:string) => {
    try {
        const aiWritingHistory = await AiWriting.findOne({
            userId,
            _id: id,
        });
        if (aiWritingHistory) {
            return aiWritingHistory;
        }
        return null;
    }
    catch (e) {
        console.log(e);
    }
}

export const getAiWriting = async (userId, id) => {
   try{
    const aiWritingHistory = await AiWriting.findOne({
        userId,
    });
    // if (aiWritingHistory) {
    //     const document = aiWritingHistory.data.documents.find(
    //         (doc) => doc._id === id
    //     );
    //     return document;
    // }
    return null;
   }
    catch(e){
         console.log(e);
    }
}

export const storeMessageInAiWritingHistory = async( userId:string, title:string, content:string,id:string,role:"user"|"ai") => {
        if (id) {
            const aiWritingHistory = await AiWriting.findOne({ _id: id });
             aiWritingHistory.documents.push({
                role,
                content,
            });
            await aiWritingHistory.save();
            return { id: aiWritingHistory._id, documentId: aiWritingHistory.documents.at(-1)._id };
          
        }
        const newAiWriting = new AiWriting({
                userId,
                title,
                documents: [{ role, content,createdAt: Date.now() }],
                createdAt: Date.now(),
        });
        const newAiWritingHistory = await newAiWriting.save();
        return {id: newAiWritingHistory._id, documentId: newAiWritingHistory.documents.at(-1)._id};
      
    }
   
    export const deleteAiWritingByIdHandler = async (userId: string, id: string) => {
        try {
            const aiWritingHistory = await AiWriting.deleteOne({ _id:id, userId:userId });
            if (aiWritingHistory.deletedCount=== 1) {
                return aiWritingHistory;
            }
            return false;
        } catch (e) {
            console.log(e); 
            throw new Error("Failed to delete AI writing history.");
        }
    };