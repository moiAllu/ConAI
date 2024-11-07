import _ from 'lodash';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Rewrite {
    _id?: string;
    input: string;
    output: string;
    created_at: Date;
    intensity?: string;
    mode?: string;
    inputLanguage?: string;
}
export interface RewriteHistory {
    rewrites: Rewrite[];
}
export interface Action {
    setRewrites: (rewrites: Rewrite[]) => void;
    addRewrite: (rewrite: Rewrite) => void;
    deleteRewrite: (id: string) => void;
}
export const useRewriteStore = create<RewriteHistory & Action>()(persist((set) => ({

    rewrites: [],
    setRewrites: (rewrites) => {
        set({rewrites});
    },
    addRewrite: (rewrite) => {
        set((state) => {
            const existingRewrite = state.rewrites.find((rw) => rw._id === rewrite._id);
            if (existingRewrite) {
                existingRewrite.output = rewrite.output;
                return state;
            }
            state.rewrites.push(rewrite);
            return state;
        });
    },
    deleteRewrite: (id) => {
        set((state) => ({
            rewrites: state.rewrites.filter((rewrite) => rewrite._id !== id),
        }));
    },
}),{ name :"rewriteStore", getStorage() {
    return localStorage;
},} ));
