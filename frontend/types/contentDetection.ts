export interface IPlagrismDetection{
    prompt?: string;
    _id?: string;
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
export interface IAiDetection{
    method?:string
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