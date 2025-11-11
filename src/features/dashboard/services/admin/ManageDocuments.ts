import api from "../../../../shared/lib/Axios";

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

const getDocuments = async (page: number, limit: number) => {
  try {
    const res = await api.get(`/documents/?page=${page}&limit=${limit}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

const uploadDocuments = async (file: File, name: string, tags: string) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("name", name);
  formData.append("tags", tags);
  try {
    const res = await api.post("/documents/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

const editDocument = async (
  id: number,
  new_content: string,
  title: string,
  tags: string[]
) => {
  try {
    const res = await api.put(`/documents/${id}/content`, {
      new_content: new_content,
      title: title,
      tags: tags,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

const deleteDocument = async (id: number) => {
  try {
    const res = await api.delete(`/documents/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export {
  chatApi,
  aiChatResponse,
  getDocuments,
  uploadDocuments,
  editDocument,
  deleteDocument,
};
