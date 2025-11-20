import api from "../../../../shared/lib/Axios";

const SummaryApi = async () => {
  try {
    const res = await api.get("/dashboard/summary");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export { SummaryApi };
