export const getUserSummarizesHistory = async (userId: string) => {
  return fetch(process.env.NEXT_PUBLIC_CONAI_BACKEND_URL+`/api/summarizer/summarizes/${userId}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken") || "",
    },
  }).then((res) => {
    return res.json();
  });
};
export const getUserSummarizeById = async (
  summarizeId: string,
  userId: string
) => {
  return fetch(
    process.env.NEXT_PUBLIC_CONAI_BACKEND_URL+`/api/summarizer/${summarizeId}/${userId}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken") || "",
      },
    }
  ).then((res) => {
    return res.json();
  });
};
export const createSummarize = async (
  intensity: string,
  content: string,
  userId: string
) => {
  return fetch(process.env.NEXT_PUBLIC_CONAI_BACKEND_URL+`/api/summarizer/create`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken") || "",
    },
    body: JSON.stringify({
      intensity,
      content,
      userId,
    }),
  }).then((res) => {
    return res.json();
  });
};
