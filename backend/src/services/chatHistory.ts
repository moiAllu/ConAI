import { ChatHistory } from "../mongodb/models";

export const storeMessageInChatHistory = async (
  id: string,
  title: string,
  userId: string,
  role: "user" | "assistant",
  message: string
) => {
  if (id) {
    const chatHistory = await ChatHistory.findOne({ _id: id });
    chatHistory.messages.push({ role, message });

    await chatHistory.save();
    return { newChatId: null, messageId: chatHistory.messages.at(-1)._id };
  }

  const newChatHistory = new ChatHistory({
    userId,
    title,
    messages: [{ role, message }],
  });
  const newChat = await newChatHistory.save();
  return {
    newChatId: newChatHistory._id,
    messageId: newChat.messages.at(-1)._id,
  };
};
export const updateChatHistorySummary = async (
  id: string,
  userId: string,
  chatSummary: string
) => {
  const chatHistory = await ChatHistory.findOne({ _id: id }).select(
    "chatSummary"
  );
  if (!chatHistory) {
    return null;
  }
  chatHistory.chatSummary = chatSummary;
  await chatHistory.save();
  return chatHistory;
};
export const updateStoreMessageInChatHistory = async (
  id: string,
  title: string,
  userId: string,
  messageId: string,
  role: "user" | "assistant",
  message: string
) => {
  const chatHistory = await ChatHistory.findOne({ _id: id });
  if (!chatHistory) {
    return null;
  }
  chatHistory.messages.find((msg) => {
    if (msg._id.toString() === messageId.toString()) {
      msg.message = message;
      msg.role = role;
    }
  });
  await chatHistory.save();
  return { chatId: chatHistory._id, messageId };
};
export const deleteMessageInChatHistory = async (
  id: string,
  userId: string,
  messageId: string
) => {
  const chatHistory = await ChatHistory.findOne({ _id: id, userId });
  if (!chatHistory) {
    return null;
  }
  //find message and delete
  chatHistory.messages = chatHistory.messages.filter(
    (msg) => msg._id !== messageId
  );
  await chatHistory.save();
  return { chatId: chatHistory._id, messageId };
};

export const getChatHistory = async (id: string, userId: string) => {
  const chatHistory = await ChatHistory.findOne({ _id: id, userId });
  if (!chatHistory) {
    return null;
  }
  return chatHistory;
};
export const getChatHistorySummary = async (id: string, userId: string) => {
  if (!id) {
    return null;
  }
  if (!userId) {
    return null;
  }
  const chatHistorySummary = await ChatHistory.findOne({
    _id: id,
    userId,
  }).select("chatSummary");
  if (!chatHistorySummary) {
    return null;
  }
  return chatHistorySummary;
};

export const getUserChats = async (userId: string) => {
  const userChats = await ChatHistory.find({ userId });
  return userChats.map((chat) => ({
    chatId: chat._id,
    title:
      chat.messages
        .at(-1)
        .message.replace(/[*_`#>]/g, "")
        .substring(0, 50)
        .trim() + (chat.messages.at(-1).message.length > 50 ? "..." : ""),
    createdAt: chat.createdAt,
  }));
};
export const deleteChatById = async (id: string, userId: string) => {
  const chatHistory = await ChatHistory.findOneAndDelete({ _id: id, userId });
  if (!chatHistory) {
    return null;
  }
  return chatHistory;
};
