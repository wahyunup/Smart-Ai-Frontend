import api from "../../../../shared/lib/Axios";

const logAuditApi = async (page: number, limit: number) => {
  try {
    const res = await api.get(
      `/admin/activity-logs?page=${page}&limit=${limit}`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

const companyListAuditApi = async () => {
  try {
    const res = await api.get("/admin/companies");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export { logAuditApi, companyListAuditApi };
