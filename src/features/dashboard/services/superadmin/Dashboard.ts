import api from "../../../../shared/lib/Axios";

const summaryApi = async () => {
  try {
    const res = await api.get("/dashboard/admin/summary");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export { summaryApi };
