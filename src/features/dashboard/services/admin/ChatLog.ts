import api from "../../../../shared/lib/Axios";

const chatLog = async (page: number, limit: number, filter: string) => {
  try {
    const res = await api.get(
      `/company/chatlogs?search=${filter}&page=${page}&limit=${limit}`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

const downloadCsv = async (dateNow:string) => {
  try {
    const res = await api.get(
      `/company/chatlogs/export?start_date=2025-01-01&end_date=${dateNow}`,
      {
        responseType: "blob",
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

const chatLogDetail = async (conversation_id: string) => {
  try {
    const res = await api.get(`/company/chatlogs/${conversation_id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

const deleteChatlogApi = async (id: number) => {
  try {
    const res = await api.delete(`/company/chatlogs/${id}`);
    return res.data;
  } catch (error) {
    throw error
  }
}

export { chatLog, downloadCsv, chatLogDetail,deleteChatlogApi };
