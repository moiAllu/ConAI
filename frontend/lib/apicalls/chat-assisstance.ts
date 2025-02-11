const BACKEND_API_URL = process.env.NEXT_PUBLIC_CONAI_BACKEND_URL || "https://api.conai.me";
export const  addMessageInChat= async (input:string, chatId:string, _id:string) => {
    return fetch(
        `${BACKEND_API_URL}/api/chat/ai-assistant/open-ai`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("accessToken") || "",
          },
          body: JSON.stringify({ prompt: input, chatId, _id }),
          method: "POST",
        }
    )
}
export const getChatByID= async (chatId:string,) => {
    return fetch(
         `${BACKEND_API_URL}/api/chat/ai-assistant/` + chatId,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("accessToken") || "",
          },
        }
      ).then(res=>{
        return res.json();
    }
    )
}
export const getChatHistory=async (userId:string)=>{
   return fetch(
      `${BACKEND_API_URL}/api/chat/ai-assistant/chats/` + userId,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("accessToken") || "",
        },
        method: "GET",
        credentials: "include",
      }
    ).then(res=>{
      return res.json();
    }
   )
  }