import _ from 'lodash';
import { create } from 'zustand';

interface IPlagrismDetection{
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
interface IAiDetection{
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
interface ICompare{

}
interface IAiDetectionHistory {
    method:string;
    userId: string;
    aiDetectionHistory: IAiDetection[];
}
interface IPlagrismDetectionHistory {
    method:string;
    userId: string;
    plagrismDetectionHistory: IPlagrismDetection[];
}
interface ICompareHistory {
    method:string;
    userId: string;
    compareHistory: ICompare[];
}

interface States {
    aiHistory: IAiDetectionHistory;
    plagrismHistory: IPlagrismDetectionHistory;
    compareHistory: ICompareHistory;
}

interface Actions {
    addAiHistory: (aiHistory: IAiDetection, userId:string, method:string) => void;
    addPlagrismHistory: (plagrismHistory: IPlagrismDetection, userId:string, method:string) => void;
    addCompareHistory: (compareHistory: ICompare, userId:string, method:string) => void;
    removeAiHistory: (userId: string) => void;
    removePlagrismHistory: (userId: string) => void;
    removeCompareHistory: (userId: string) => void;
}

export const useContentDetectorStore = create<States & Actions>((set) => (
    {
        aiHistory:{
            method:'',
            userId:'',
            aiDetectionHistory: []
        },
        plagrismHistory:{
            method:'',
            userId:'',
            plagrismDetectionHistory: []
        },
        compareHistory:{
            method:'',
            userId:'',
            compareHistory: []
        },
        addAiHistory: (aiHistory, userId, method) => {
            set((state) => {
                const newState = _.cloneDeep(state);
                const existing = _.find(newState.aiHistory.aiDetectionHistory, { _id: aiHistory._id });
                if (existing) {
                    return newState
                } else {
                    newState.aiHistory = {
                        method,
                        userId,
                        aiDetectionHistory: [...newState.aiHistory.aiDetectionHistory, aiHistory]
                    }
                    return newState;
                }
            });
        },
        addPlagrismHistory: (plagrismHistory, userId, method) => {
            set((state) => {
                const newState = _.cloneDeep(state);
                const existing = _.find(newState.plagrismHistory.plagrismDetectionHistory, { _id: plagrismHistory._id });
                if (existing) {
                    return newState
                } else {newState.plagrismHistory = {
                    method,
                    userId,
                    plagrismDetectionHistory: [...newState.plagrismHistory.plagrismDetectionHistory, plagrismHistory]
                }
                return newState;
            }
            });
        },
        addCompareHistory: (compareHistory, userId, method) => {
            set((state) => {
                const newState = _.cloneDeep(state);
                newState.compareHistory = {
                    method,
                    userId,
                    compareHistory: [...newState.compareHistory.compareHistory, compareHistory]
                }
                return newState;
            });
        },
        removeAiHistory: (userId) => {
            set((state) => {
                const newState = _.cloneDeep(state);
                newState.aiHistory = {
                    method:'',
                    userId:'',
                    aiDetectionHistory: []
                }
                return newState;
            });
        },
        removePlagrismHistory: (userId) => {
            set((state) => {
                const newState = _.cloneDeep(state);
                newState.plagrismHistory = {
                    method:'',
                    userId:'',
                    plagrismDetectionHistory: []
                }
                return newState;
            });
        },
        removeCompareHistory: (userId) => {
            set((state) => {
                const newState = _.cloneDeep(state);
                newState.compareHistory = {
                    method:'',
                    userId:'',
                    compareHistory: []
                }
                return newState;
            });
        }
        
    }
));