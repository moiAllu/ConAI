import { Document } from 'mongoose';
import { Schema, model } from 'mongoose';

interface IChatMessage {
  user: string;
  role: 'user' | 'assistant';
  message: string;
  created_at: Date;
}

interface IChatHistory extends Document {
  createdAt: Date;
  title: string;
  messages: IChatMessage[];
}

const chatHistorySchema = new Schema<IChatHistory>({
  createdAt: {
    type: Date,
    default: Date.now,
  },

  title: {
    type: String,
    required: true,
  },

  messages: [
    {
      user: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      created_at: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

export const ChatHistory = model<IChatHistory>(
  'ChatHistory',
  chatHistorySchema
);
