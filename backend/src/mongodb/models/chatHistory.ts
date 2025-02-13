import { Document } from "mongoose";
import { Schema, model } from "mongoose";

interface IChatMessage {
  _id?: string;
  role: "user" | "assistant";
  message: string;
  createdAt?: Date;
}

interface IChatHistory extends Document {
  userId: string;
  title?: string;
  messages: IChatMessage[];
  createdAt?: Date;
  chatSummary?: string;
}

const chatHistorySchema = new Schema<IChatHistory>({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
  },
  chatSummary: {
    type: String,
    default: "...",
  },
  userId: {
    type: String,
    required: true,
  },
  messages: [
    {
      role: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

export const ChatHistory = model<IChatHistory>(
  "ChatHistory",
  chatHistorySchema
);
