import _ from 'lodash';
import { create } from 'zustand';

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
interface IAiDetection{
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
    aiHistory: IAiDetectionHistory[];
    plagrismHistory: IPlagrismDetectionHistory[];
    compareHistory: ICompareHistory[];
}

interface Actions {
    setAiHistory: (aiHistory: IAiDetectionHistory[]) => void;
    setPlagrismHistory: (plagrismHistory: IPlagrismDetectionHistory[]) => void;
    setCompareHistory: (compareHistory: ICompareHistory[]) => void;
    addAiHistory: (aiHistory: IAiDetectionHistory) => void;
    addPlagrismHistory: (plagrismHistory: IPlagrismDetectionHistory) => void;
    addCompareHistory: (compareHistory: ICompareHistory) => void;
    removeAiHistory: (userId: string) => void;
    removePlagrismHistory: (userId: string) => void;
    removeCompareHistory: (userId: string) => void;
}

export const useContentDetectorStore = create<States & Actions>((set) => ({
    aiHistory: [],
    plagrismHistory: [],
    compareHistory: [],
    setAiHistory: (aiHistory) => set({aiHistory}),
    setPlagrismHistory: (plagrismHistory) => set({plagrismHistory}),
    setCompareHistory: (compareHistory) => set({compareHistory}),
    addAiHistory: (aiHistory) => set((state) => ({aiHistory: [...state.aiHistory, aiHistory]})),
    addPlagrismHistory: (plagrismHistory) => set((state) => ({plagrismHistory: [...state.plagrismHistory, plagrismHistory]})),
    addCompareHistory: (compareHistory) => set((state) => ({compareHistory: [...state.compareHistory, compareHistory]})),
    removeAiHistory: (userId) => set((state) => ({aiHistory: state.aiHistory.filter((history) => history.userId !== userId)})),
    removePlagrismHistory: (userId) => set((state) => ({plagrismHistory: state.plagrismHistory.filter((history) => history.userId !== userId)})),
    removeCompareHistory: (userId) => set((state) => ({compareHistory: state.compareHistory.filter((history) => history.userId !== userId)})),
}));