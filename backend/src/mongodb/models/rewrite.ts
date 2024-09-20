import { Document } from 'mongoose';
import { Schema, model } from 'mongoose';
interface IRewrite {
    userId: string;
    input: string;
    output: string;
    created_at: Date;
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
        userId: {
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

export const Rewrite = model<IRewriteHistory>('Rewrite', rewriteSchema);