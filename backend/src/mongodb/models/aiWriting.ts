import { Schema, model } from 'mongoose';
import { Document } from 'mongoose';

interface IWritingChat {
    _id?: string;
    role: 'user' | 'ai'; 
    content: string;
    createdAt?: Date;
    }


interface IWritingHistory extends Document {
        userId: string;
        title: string;
        documents: IWritingChat[];   
        createdAt?: Date;
}
const aiWritingSchema = new Schema<IWritingHistory>({
        userId: {
            type: String,
            required: true,
        },
        title: {
            type: String,
        },
        documents: [
            {   
              role: {
                    type: String,
                    required: true,
                },
                content: {
                    type: String,
                    required: true,
                },
                createdAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        createdAt: {
            type: Date,
            default: Date.now,
        },
});

export const AiWriting = model<IWritingHistory>(
    'AiWriting',
    aiWritingSchema
);