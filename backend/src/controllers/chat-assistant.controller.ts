import { Request, Response } from "express";
import { getSummarizeChatHistoryOpenAiRes } from "../open-ai";
import {
  storeMessageInChatHistory,
  getChatHistory,
  getUserChats,
  updateStoreMessageInChatHistory,
} from "../services/chatHistory";
import jwt from "jsonwebtoken";
import openAIClient from "../config/open-ai";
import { countTokens } from "../helpers";
import { ChatCompletionMessageParam } from "openai/resources";

export const getUserChatsController = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    // TODO: GET FROM REQUEST AFTER JWT AUTHENTICATION

    // get from MOngo Model
    const userChats = await getUserChats(userId);

    return res.status(200).json({
      message: "User chats fetched successfully",
      status: 200,
      data: userChats,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Internal server error",
      status: 500,
    });
  }
};

export const getChatHistoryController = async (req: Request, res: Response) => {
  const { chatId } = req.params;
  const token = req.header("Authorization");
  try {
    // TODO: GET FROM REQUEST AFTER JWT AUTHENTICATION
    // const userId = req.user.id;
    const { user } = jwt.verify(token, process.env.JWT_SECRET);
    // get from MOngo Model
    const chatHistory = await getChatHistory(chatId, user._id);
    if (!chatHistory) {
      return res.status(404).json({
        message: "Chat not found",
        status: 404,
      });
    }
    return res.status(200).json({
      message: "Chat history fetched successfully",
      status: 200,
      data: chatHistory,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Internal server error",
      status: 500,
    });
  }
};

export const getGPTReponseController = async (req: Request, res: Response) => {
  const { chatId, title, prompt, _id } = req.body;
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");

  try {
    if (!prompt) {
      return res
        .status(400)
        .write(`error: ${JSON.stringify("Prompt is required")}\n\n`);
    }
    // UNCOMMENT WHEN NEEDED
    const systemPrompt =
      "Please respond in Markdown format, when appropriate, avoiding unnecessary formatting in formal contexts like letters or applications. Include headings.";
    let assistantMessages: ChatCompletionMessageParam[] = [];

    if (chatId) {
      const chatHistory = await getChatHistory(chatId, _id);
      if (chatHistory && chatHistory.messages) {
        assistantMessages = chatHistory.messages
          .filter((item) => item.role === "assistant")
          .map((item) => ({ role: item.role, content: item.message }));
      }
    }

    let messages: ChatCompletionMessageParam[] = [
      { role: "system", content: systemPrompt },
      ...assistantMessages,
      { role: "user", content: prompt },
    ];
    const tokens = countTokens(messages, "gpt-3.5-turbo");
    const maxTokens = 2096;

    if (tokens > maxTokens - 500) {
      const messagesToSummarize = assistantMessages.slice(1, -7);
      const summarizedContent = await getSummarizeChatHistoryOpenAiRes(
        messagesToSummarize,
        "gpt-3.5-turbo-0125"
      );
      messages = [
        { role: "system", content: systemPrompt },
        { role: "assistant", content: summarizedContent },
        { role: "user", content: prompt },
      ];
    }

    const chatCompletion = await openAIClient.chat.completions.create({
      messages: messages,
      // model: model || CONFIG.OPENAI_GPT_MODEL,
      model: "gpt-3.5-turbo-0125",
      stream: true,
    });
    if (!chatCompletion) {
      console.log("Content not found");
      return res.write(`error: ${JSON.stringify("Content not found")}\n\n`);
    }

    let aiResp = "Thinking...";
    const userId = _id;
    const { newChatId, messageId: promptId } = await storeMessageInChatHistory(
      chatId,
      title,
      userId,
      "user",
      prompt
    );
    res.write(`chatId: ${newChatId ? newChatId : chatId}\n\n`);
    res.write(`promptMsgId: ${promptId}\n\n`);

    const { newChatId: sameChatId, messageId: responseMsgId } =
      await storeMessageInChatHistory(
        newChatId ? newChatId : chatId,
        title,
        userId,
        "assistant",
        aiResp
      );
    aiResp = "";
    res.write(`messageId: ${responseMsgId}\n\n`);
    for await (const chunks of chatCompletion) {
      if (chunks.choices[0]?.finish_reason === "stop") {
        res.write("data: [DONE]\n\n");
        await updateStoreMessageInChatHistory(
          newChatId ? newChatId : chatId,
          title,
          userId,
          responseMsgId,
          "assistant",
          aiResp
        );
        return res.end();
      }
      const content = chunks.choices[0]?.delta?.content;
      if (content) {
        aiResp += content;
        res.write(`data: ${JSON.stringify(content)}\n\n`);
      }
    }
  } catch (e) {
    console.log(e);
    return res.status(500).write(`error: ${JSON.stringify(e)}\n\n`);
  }
};
