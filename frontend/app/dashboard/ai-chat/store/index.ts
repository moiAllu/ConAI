import { create } from 'zustand';
import _ from 'lodash';

// State types
export interface IMessage {
  id: string;
  role: string;
  message: string;
  createdAt: string;
}

export interface IChat {
  id: string;
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
  addMessageToChat: (message: IMessage, chatId: string) => void;
  setAllMessagesInChat: (messages: IMessage[], chatId: string) => void;
}

// useAIChatStore hook
export const useAIChatStore = create<States & Actions>((set) => ({
  chats: [],

  addMessageToChat: (message, chatId) => {
    set((state) => {
      const newState = _.cloneDeep(state);
      const existing = _.find(newState.chats, { id: chatId });

      if (existing) {
        existing.messages.push(message);
      } else {
        newState.chats.push({
          id: chatId,
          messages: [message],
          userId: '1',
          createdAt: new Date(),
        });
      }

      return newState;
    });
  },

  setAllMessagesInChat: (messages, chatId) => {
    set((state) => {
      const newState = _.cloneDeep(state);
      const existing = _.find(newState.chats, { id: chatId });

      if (existing) {
        existing.messages = messages;
      } else {
        newState.chats.push({
          id: chatId,
          messages,
          userId: '1',
          createdAt: new Date(),
        });
      }

      return newState;
    });
  },
}));
