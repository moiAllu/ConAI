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
   

// export const deleteMessageInAiWritingHistory = async (userId, id) => {
//     try {
//         const aiWritingHistory = await AiWriting.findOne({ userId });
//         if (aiWritingHistory) {
//             const documentIndex = aiWritingHistory.documents.findIndex(
//                 (doc) => doc._id === id
//             );
//             if (documentIndex !== -1) {
//                 aiWritingHistory.documents.splice(documentIndex, 1);
//                 await aiWritingHistory.save();
//                 return aiWritingHistory.documents;
//             }
//         }
//         return [];
//     }
//     catch (e) {
//         console.log(e);
//     }
// }