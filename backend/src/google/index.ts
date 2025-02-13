export const getGoogleResponse = async (text: string) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?${new URLSearchParams({
        key: process.env.GOOGLE_SEARCH_CLOUD_API_KEY!,
        cx: process.env.GOOGLE_SEARCH_CLOUD_ENGINE_ID!,
        q: text,
      }).toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json", // optional, not necessary for GET requests
        },
      }
    );

    const result = await response.json();
    return result;
  } catch (error) {
    console.log("getGoogleResponse Error:", error);
    return "Error generating Google response";
  }
};
