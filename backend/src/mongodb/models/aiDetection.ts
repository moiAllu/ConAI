import { Document } from 'mongoose';
import { Schema, model } from 'mongoose';

interface aiDetection{
    _id?: string;
    prompt: string;
    createdAt?: Date;
    response: {
        aiDetected: boolean;
        confidence: number;
        aiPercentage: number;
        aiContent: string[];
        
    }
}
interface IAiDetection extends Document {
    method: string;
    userId: string;
    data: aiDetection[];
}

const contentDetectionSchema = new Schema<IAiDetection>({
    method: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    data: [
        {
            prompt: {
                type: String,
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
            response: {
                aiDetected: {
                    type: Boolean,
                    required: true,
                },
                confidence: {
                    type: Number,
                    required: true,
                },
                aiPercentage: {
                    type: Number,
                },
                aiContent: {
                    type: Array,
                },
            },
        },
    ],
});

export const AiDetection = model<IAiDetection>(
    'AiDetection',
    contentDetectionSchema
);