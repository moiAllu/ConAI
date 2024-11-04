import _ from "lodash";
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Image {
    _id?: string;
    userId: string;
    prompt: string;
    image?: Buffer;
    createdAt?: Date;
    revised_prompt: string;
}

interface ImageHistory {
    images: Image[];
}

interface Action {
    setImagesIds: (images: Image[]) => void;
    addImage: (image: Image) => void;
    deleteImage: (id: string) => void;
}

// export const useImageStore = create<ImageHistory & Action>()(persist((set) => ({
//     images: [],
//     setImagesIds: (images) => {
//         set({images});
//     },
//     addImage: (image) => {
//         set((state) => {
//             const existingImage = state.images.find((img) => img._id === image._id);
//             if (existingImage) {
//                 existingImage.image = image.image;
//                 return state;
//             }
//             state.images.push(image);
//             return state;
//         });
//     },
    
//     deleteImage: (id) => {
//         set((state) => ({
//             images: state.images.filter((image) => image._id !== id),
//         }));
//     },
// }),{ name :"imageStore", getStorage() {
//     return localStorage;
// },} ));
export const useImageStore = create<ImageHistory & Action>()((set) => ({
    images: [],
    setImagesIds: (images) => {
        set({images});
    },
    addImage: (image) => {
        set((state) => {
            const existingImage = state.images.find((img) => img._id === image._id);
            if (existingImage) {
                existingImage.image = image.image;
                return state;
            }
            state.images.push(image);
            return state;
        });
    },
    
    deleteImage: (id) => {
        set((state) => ({
            images: state.images.filter((image) => image._id !== id),
        }));
    },
}));



