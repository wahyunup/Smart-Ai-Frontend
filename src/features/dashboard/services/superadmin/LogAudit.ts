import api from "../../../../shared/lib/Axios";

const logAuditApi = async (
  page: number,
  limit: number,
  company_id?: number,
  category_activity?: string,
  date?: number
) => {
  try {
    const res = await api.get(
      `/admin/activity-logs?page=${page}&limit=${limit}&company_id=${company_id}&activity_type_category=${category_activity}&start_date=${date}&end_date=2026-12-31`
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

const typeActivityApi = async () => {
  try {
    const res = await api.get("/admin/activity-logs/type");
    return res.data;
  } catch (error) {
    throw error
  }
};

export { logAuditApi, companyListAuditApi,typeActivityApi };
