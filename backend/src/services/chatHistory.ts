import { ChatHistory } from '../mongodb/models';

export const storeMessageInChatHistory = async (
  id: string,
  title: string,
  userId: string,
  role: 'user' | 'assistant',
  message: string
) => {
  if (id) {
    const chatHistory = await ChatHistory.findOne({ _id: id });
    chatHistory.messages.push({ role, message });
    await chatHistory.save();
    return null;
  }

  const newChatHistory = new ChatHistory({
    userId,
    title,
    messages: [{ role, message }],
  });
  const newChat = await newChatHistory.save();
  return newChat._id;
};

export const getChatHistory = async (id: string, userId: string) => {
  const chatHistory = await ChatHistory.findOne({ _id: id, userId });
  return chatHistory;
};

export const getUserChats = async (userId: string) => {
  const userChats = await ChatHistory.find({ userId });
  return userChats;
};
