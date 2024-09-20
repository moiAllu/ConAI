import { Document } from 'mongoose';
import { Schema, model } from 'mongoose';
interface ISummarize {
    userId: string;
    input: string;
    output: string;
    created_at: Date;
}
interface ISummarizeHistory extends Document {
    userId: string;
    rewrites: ISummarize[];
}

const summarizeSchema = new Schema<ISummarizeHistory>({
    userId: {
        type: String,
        required: true
    },
    rewrites: [{
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
