import { Document } from 'mongoose';
import { Schema, model } from 'mongoose';
interface ISummarize {
    _id?: string;
    input: string;
    output: string;
    intensity: string;
    created_at: Date;
}
interface ISummarizeHistory extends Document {
    userId: string;
    summarizes: ISummarize[];
}

const summarizeSchema = new Schema<ISummarizeHistory>({
    userId: {
        type: String,
        required: true
    },
    summarizes : [{
        intensity: {
            type: String,
            required: true
        },
        input: {
            type: String,
            required: true
        },
        output: {
            type: String,
            required: true
        },
        created_at: {
            type: Date,
            default: Date.now
        }
    }]
});

export const Summarize = model<ISummarizeHistory>('Summarize', summarizeSchema);
