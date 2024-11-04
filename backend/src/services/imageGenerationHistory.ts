import { ImageGeneration } from "../mongodb/models";

export const storeGeneratedImageInHistory = async (userId :string, prompt:string, image_b64:String, revised_prompt:string ) => {
    try{
        if(!userId || !prompt || !image_b64){
            return {
                message: 'Please provide all the required fields',
                status: 400
            }
        }
        const imageGeneration = new ImageGeneration({
            userId,
            prompt,
            image: image_b64,
            revised_prompt
        });
        if(!imageGeneration){
            return {
                message: 'Failed to store image in history',
                status: 500
            }
        }
        const newImageGeneration = await imageGeneration.save();
        return {    
            message: 'Image stored in history successfully',
            status: 200, 
            data: newImageGeneration
        };
    }catch(e){
        return e;
    }
}
export const getUserImageHistory = async (userId:string) => {
    try{
        if(!userId){
            return {
                message: 'Please provide all the required fields',
                status: 400
            }
        }
        const imageGeneration = await ImageGeneration.find({userId}).select('_id').select('createdAt').select('prompt').select('revised_prompt');
        if(!imageGeneration){
            return {
                message: 'Failed to fetch image history',
                status: 500
            }
        }
        return {
            message: 'Image history fetched successfully',
            status: 200,
            data: imageGeneration
        }
    }catch(e){
        return e;
    }
}
export const getGeneratedImageByUserId = async (imageId:string, userId:string) => {
    try{
        if(!imageId || !userId){
            return {
                message: 'Please provide all the required fields',
                status: 400
            }
        }
        const imageGeneration = await ImageGeneration.findOne({_id:imageId, userId});
        if(!imageGeneration){
            return {
                message: 'Failed to fetch image',
                status: 500
            }
        }
        return {
            message: 'Image fetched successfully',
            status: 200,
            data: imageGeneration
        }
    }catch(e){
        return e;
    }
}