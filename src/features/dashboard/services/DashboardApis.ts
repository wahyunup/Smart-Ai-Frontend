import api from "../../../shared/lib/Axios";

const chatApi = async (content: string) => {
  try {
    const res = await api.post("/api/chat-bot", {
      content: content,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

const aiChatResponse = async () => {
  try {
    const res = await api.get("/api/chat-bot");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export { chatApi, aiChatResponse };
