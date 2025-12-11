import api from "../../../../shared/lib/Axios";

const allTransactionApi = async () => {
  try {
    const res = await api.get("/admin/transactions");
    return res.data;
  } catch (error) {
    throw error;
  }
};
const allPlanApi = async () => {
  try {
    const res = await api.get("/admin/plan");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export { allTransactionApi, allPlanApi };
