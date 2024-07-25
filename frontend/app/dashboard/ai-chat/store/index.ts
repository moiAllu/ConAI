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
  addMessageToChat: (message: IMessage, chatId: string, _id: string) => void;
  setAllMessagesInChat: (messages: IMessage[], chatId: string, _id: string) => void;
}

// useAIChatStore hook
export const useAIChatStore = create<States & Actions>((set) => ({
  chats: [],
  
  addMessageToChat: (message, chatId ,_id) => {
    set((state) => {
      const newState = _.cloneDeep(state);
      const existing = _.find(newState.chats, { id: chatId });

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
}));
