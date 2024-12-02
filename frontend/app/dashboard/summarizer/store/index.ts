import _ from "lodash";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Summarizer {
  _id?: string;
  input: string;
  output: string;
  created_at: Date;
  intensity?: string;
}

export interface SummarizerHistory {
  summarizers: Summarizer[];
}

export interface Action {
  setSummarizers: (summarizers: Summarizer[]) => void;
  addSummarizer: (summarizer: Summarizer) => void;
  deleteSummarizer: (id: string) => void;
}

export const useSummarizerStore = create<SummarizerHistory & Action>()(
  persist((set) => ({
    summarizers: [],
    setSummarizers: (summarizers) => {
      set({ summarizers });
    },
    addSummarizer: (summarizer) => {
      set((state) => {
        const existingSummarizer = state.summarizers.find(
          (rw) => rw._id === summarizer._id
        );
        if (existingSummarizer) {
          existingSummarizer.output = summarizer.output;
          return state;
        }
        state.summarizers.push(summarizer);
        return state;
      });
    },
    deleteSummarizer: (id) => {
      set((state) => ({
        summarizers: state.summarizers.filter(
          (summarizer) => summarizer._id !== id
        ),
      }));
    },
  }),
  {
    name: "summarizerStore",
    getStorage() {
      return localStorage;
    },
  })
);