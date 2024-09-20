import { Document } from 'mongoose';
import { Schema, model } from 'mongoose';

interface IPlagrismDetection{
    querywords: number;
    count: number;
    cost: number;
    result: {
        url: string;
        index: number;
        title   : string;
        textsnippet: string;
        htmlsnippet: string;
        minwordsmatched: number;
        viewurl: string;
    }[];
}
interface IPlagrismDetectionHistory extends Document {
    method:string;
    userId: string;
    data: IPlagrismDetection[];
}

const plagrismDetectionSchema = new Schema<IPlagrismDetectionHistory>({
    method: {
        type: String,
        required: true
    },

    userId: {
        type: String,
        required: true
    },
    data: [
        {
            querywords: {
                type: Number,
                required: true
            },
            count: {
                type: Number,
                required: true
            },
            cost: {
                type: Number,
                required: true
            },
            result: [
                {
                    url: {
                        type: String,
                        required: true
                    },
                    index: {
                        type: Number,
                        required: true
                    },
                    title: {
                        type: String,
                        required: true
                    },
                    textsnippet: {
                        type: String,
                        required: true
                    },
                    htmlsnippet: {
                        type: String,
                        required: true
                    },
                    minwordsmatched: {
                        type: Number,
                        required: true
                    },
                    viewurl: {
                        type: String,
                        required: true
                    }
                }
            ]
        }
    ]
});

export const PlagrismDetection = model<IPlagrismDetectionHistory>(
    'PlagrismDetection',
    plagrismDetectionSchema
);