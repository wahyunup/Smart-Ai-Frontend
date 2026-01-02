import api from "../../../shared/lib/Axios";
import { getCookie } from "../../../shared/utils/Cookies";

const fetchAllConversation = async ( limit?:number, search?:string) => {
  try {
    const res = await api.get(`/chatlogs/conversations?search=${search}&limit=${limit}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

const refreshAllConversation = async () => {
  try {
    const res = await api.get(`/chatlogs/conversations`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

const planStatusApi = async () => {
  try {
    const res = await api.get("/subscriptions/my-status");
    return res.data;
  } catch (error) {
    throw error;
  }
};

const deleteConversationApi = async (conversation_id:string) => {
  try {
    const res = await api.delete(`/chatlogs/${conversation_id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

const fetchConversationApi = async (conversation_id: string) => {
  try {
    const res = await api.get(`/chatlogs/${conversation_id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

const createConversationAxApi = async (
  message: string,
  conversation_id: string
) => {
  try {
    const res = await api.post("/chat", {
      message: message,
      conversation_id: conversation_id,
    });

    return { data: res.data, status: res.status };
  } catch (error) {
    throw error
  }
};

const createConversationApi = async (
  message: string,
  conversation_id: string
) => {
  const token = getCookie("accesstoken");

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/sse/chat`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          message,
          conversation_id,
        }),
      }
    );

    if (response.status === 401) {
      console.error("accessToken Expired");
      throw new Error("Unauthorized");
    }

    return response;
  } catch (error) {
    console.error("createConversationApi error:", error);
    throw error;
  }
};

export { fetchAllConversation, createConversationApi, fetchConversationApi, createConversationAxApi, deleteConversationApi, planStatusApi, refreshAllConversation };
