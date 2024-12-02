import { Document } from 'mongoose';
import { Schema, model } from 'mongoose';
interface IRewrite {
    _id?: string;
    input: string;
    output: string;
    created_at: Date;
    intensity?: string;
    mode?: string;
    inputLanguage?: string;
}
interface IRewriteHistory extends Document {
    userId: string;
    rewrites: IRewrite[];
}

const rewriteSchema = new Schema<IRewriteHistory>({
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
        },
        intensity: {
            type: String,
        },
        mode: {
            type: String,
        },
        inputLanguage: {
            type: String,
        }

    }]
});

export const Rewrite = model<IRewriteHistory>('Rewrite', rewriteSchema);