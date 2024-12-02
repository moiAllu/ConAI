import { create } from 'zustand';
import _ from 'lodash';
import { persist } from 'zustand/middleware';
// State types
export interface IMessage {
  _id?: string;
  id: string;
  role: string;
  message: string;
  createdAt: string;
}

export interface IChat {
  id: string;
  _id?: string;
  messages: IMessage[];
  userId: string;
  title?: string;
  createdAt: Date;
}

interface States {
  chats: IChat[];
}

// Action types
interface Actions {
  addMessageToChat: (message: IMessage, chatId: string, _id: string) => void;
  setAllMessagesInChat: (messages: IMessage[], chatId: string, _id: string) => void;
  deleteMessageFromChat: (messageId: string, chatId: string) => void;
  pushMessageChunks: (messageId: string, chunk: string, chatId: string, _id: string) => void;
}

// useAIChatStore hook
export const useAIChatStore = create<States & Actions>()(persist((set) => ({
  chats: [],
  
  addMessageToChat: (message, chatId ,_id) => {
    set((state) => {
      const newState = _.cloneDeep(state);
      const existing = _.find(newState.chats, { id: chatId });
      console.log("existing",existing);
      if (existing) {
        existing.messages.push(message);
      } else {
        newState.chats.push({
          id: chatId,
          messages: [message],
          userId: _id,
          createdAt: new Date(),
        });
      }
      return newState;
    });
  },

  pushMessageChunks: (messageId:string, chunk:string, chatId:string ,_id:string) => {
    set((state) => {
      const newState = _.cloneDeep(state);
      const existing = _.find(newState.chats, { id: chatId });
      if (existing) {
        const message = existing.messages.find((m) => m.id === messageId);
        if (message) {
          console.log("message", message);
          message.message += chunk;
        }
      }
      return newState;
    });
  },
  
  deleteMessageFromChat: (messageId, chatId) => {
    set((state) => {
      const newState = _.cloneDeep(state);
      const existing = _.find(newState.chats, { id: chatId });

      if (existing) {
        existing.messages = existing.messages.filter((m) => m.id !== messageId);
      }

      return newState;
    });
  },

  setAllMessagesInChat: (messages, chatId,_id) => {
    set((state) => {
      const newState = _.cloneDeep(state);
      const existing = _.find(newState.chats, { id: chatId });

      if (existing) {
        existing.messages = messages;
      } else {
        newState.chats.push({
          id: chatId,
          messages,
          userId: _id,
          createdAt: new Date(),
        });
      }

      return newState;
    });
  },
}),{ name: "aiChatStore", getStorage: () => localStorage }));
