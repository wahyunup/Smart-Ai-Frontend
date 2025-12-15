import api from "../../../../shared/lib/Axios";
import type { updateTransactionApiProps } from "../../../../shared/types/type";

const allTransactionApi = async (page: number, limit: number) => {
  try {
    const res = await api.get(
      `/admin/transactions?page=${page}&limit=${limit}`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
const allPlanApi = async () => {
  try {
    const res = await api.get("/admin/plans-pricing");
    return res.data;
  } catch (error) {
    throw error;
  }
};

const updateTransactionApi = async (payload: updateTransactionApiProps) => {
  try {
    const res = await api.patch("/admin/plans-pricing", payload);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export { allTransactionApi, allPlanApi, updateTransactionApi };
