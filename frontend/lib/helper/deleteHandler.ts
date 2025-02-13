import { deleteAiWritingById } from "../apicalls/ai-writing";
import { deleteChatById } from "../apicalls/chat-assisstance";
import { deleteImageById } from "../apicalls/image-generation";
import { deleteRewriteById } from "../apicalls/rewrite";
import { deleteSummarizeById } from "../apicalls/summarize";

interface Props {
  mode: string;
  userId: string;
  _id: string;
}
export const deleteHistoryByIdHandler = ({ mode, userId, _id }: Props) => {
  if (mode === "aiwriting") {
    return deleteAiWritingById(_id, userId);
  }
  if (mode === "aichat") {
    return deleteChatById(_id, userId);
  }
  if (mode === "imagegeneration") {
    return deleteImageById(_id, userId);
  }
  if (mode === "summarizer") {
    return deleteSummarizeById(_id, userId);
  }
  if (mode === "rewrite") {
    return deleteRewriteById(_id, userId);
  }
  if (mode === "plagiarism") {
    // return deletePlagiarismById(_id,userId)
  }
  if (mode === "aidetection") {
    // return deleteAIDetectionById(_id,userId)
  }
};
