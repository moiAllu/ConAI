import { ChatHistory } from '../mongodb/models';

export const storeMessageInChatHistory = async (
  id: string,
  title: string,
  userId: string,
  role: 'user' | 'assistant',
  message: string
) => {
  const chatHistory = await ChatHistory.findOne({ id });

  if (!chatHistory) {
    const newChatHistory = new ChatHistory({
      userId,
      title,
      messages: [{ role, message }],
    });
    await newChatHistory.save();
  } else {
    chatHistory.messages.push({ role, message });
    await chatHistory.save();
  }
};
