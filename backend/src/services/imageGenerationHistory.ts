import { ImageGeneration } from "../mongodb/models";
import sharp from 'sharp';

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
export const deleteGeneratedImageByUserId = async (id:string) => {
    try{
        if(!id){
            return {
                message: 'Please provide all the required fields',
                status: 400
            }
        }
        const imageGeneration = await ImageGeneration.findByIdAndDelete(id);
        if(!imageGeneration){
            return {
                message: 'Failed to delete image',
                status: 500
            }
        }
        return {
            message: 'Image deleted successfully',
            status: 200
        }
    }catch(e){
        return e;
    }
}
export const getDownloadableImage = async (imageId:string, resolution:string) => {
    try{
        if(!imageId || !resolution){
            return {
                message: 'Please provide all the required fields',
                status: 400
            }
        }
        const imageGeneration = await ImageGeneration.findOne({_id:imageId});
        if(!imageGeneration){
            return {
                message: 'Failed to fetch image',
                status: 500
            }
        }
        const imgBuffer = Buffer.from(imageGeneration.image, 'base64');
        let resizedBuffer;
        if (resolution === '720') {
        resizedBuffer = await sharp(imgBuffer)
            .resize({ width: 1280 }) // Adjust width for 720p
            .toBuffer();
        } else if (resolution === '1080') {
        resizedBuffer = await sharp(imgBuffer)
            .resize({ width: 1920 }) // Adjust width for 1080p
            .toBuffer();
        } else {
        // Original size
        resizedBuffer = imgBuffer;
        }
        return resizedBuffer;
    }catch(e){
        return e;
    }
}
