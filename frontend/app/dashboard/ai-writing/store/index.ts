import { create } from 'zustand';
import _ from 'lodash';

interface IDocumnet{
    role: 'user' | 'ai'; 
    content: string;
    createdAt?: Date;
    _id:string
}

interface IWritingHistory {
    userId: string;
    title?: string;
    documents: IDocumnet[];   
    createdAt?: Date;
    _id:string
}

interface States{
    history:IWritingHistory[]
}

interface Actions{
    addDocumentToHistory:(document:IDocumnet, storeId:string,userId:string)=>void;
    setAllDocumentsInHistory:(documents:IDocumnet[],title:string, storeId:string, userId:string )=>void;
    deleteDocumentFromHistory:(documentId:string, storeId:string)=>void;
}

export const useAIWritingStore = create<States & Actions>((set) => ({
    history: [],
    
    addDocumentToHistory: (document, storeId , userId) => {
        set((state) => {
            const newState = _.cloneDeep(state);
            const existing = _.find(newState.history, { _id: storeId });
            
            if (existing) {
                existing.documents.push(document);
            } else {
                newState.history.push({
                    _id: storeId,
                    documents: [document],
                    userId  ,
                    createdAt: new Date(),
                });
            }
            
            return newState;
        });
    },

    
    deleteDocumentFromHistory: (documentId, storeId) => {
        set((state) => {
            const newState = _.cloneDeep(state);
            const existing = _.find(newState.history, { _id: storeId });
            
            if (existing) {
                _.remove(existing.documents, { _id: documentId });
            }
            
            return newState;
        });
    },
    
    setAllDocumentsInHistory: (documents,title, storeId, _id) => {
        set((state) => {
            const newState = _.cloneDeep(state);
            const existing = _.find(newState.history, { _id: storeId });
            
            if (existing) {
                existing.documents = documents;
            } else {
                newState.history.push({
                    title,
                    _id: storeId,
                    documents: documents,
                    userId: _id,
                    createdAt: new Date(),
                });
            }
            
            return newState;
        });
    },
}));
