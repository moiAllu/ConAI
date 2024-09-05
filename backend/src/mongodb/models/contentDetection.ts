import { Document } from 'mongoose';
import { Schema, model } from 'mongoose';

interface contentDetection{
    _id?: string;
    prompt: string;
    userId: string;
    createdAt?: Date;
    response: {
        plagrismDetected: boolean;
        plagrismPercentage: number;
        plagrismContent: string[];
    }
}
interface IContentDetection extends Document {
    data: contentDetection[];
}

const contentDetectionSchema = new Schema<IContentDetection>({
    data: [
        {
            prompt: {
                type: String,
                required: true,
            },
            userId: {
                type: String,
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
            response: {
                percentage: {
                    type: Number,
                    
                },
                plagrismDetected: {
                    type: Boolean,
                    required: true,
                },
                plagrismPercentage: {
                    type: Number,
                },
                plagrismContent: {
                    type: Array,
                },
            },
        },
    ],
});

export const ContentDetection = model<IContentDetection>(
    'ContentDetection',
    contentDetectionSchema
);