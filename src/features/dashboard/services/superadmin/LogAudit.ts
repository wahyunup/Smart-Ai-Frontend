import api from "../../../../shared/lib/Axios";

const logAuditApi = async (
  page: number,
  limit: number,
  company_id?: number,
  category_activity?: string,
  startDate?: string,
  endDate?: string
) => {
  try {
    const params: any = {
      page,
      limit,
    };

    if (company_id) params.company_id = company_id;
    if (category_activity) params.activity_type_category = category_activity;
    if (startDate) params.start_date = startDate;
    if (startDate) params.end_date = endDate;

    const res = await api.get("/admin/activity-logs", { params });
    return res.data;
  } catch (error) {
    throw error;
  }
};

// Companies
const companyListAuditApi = async () => {
  try {
    const res = await api.get("/admin/companies");
    return res.data;
  } catch (error) {
    throw error;
  }
};

// Activity Types
const typeActivityApi = async () => {
  try {
    const res = await api.get("/admin/activity-logs/type");
    return res.data;
  } catch (error) {
    throw error;
  }
};

const DownloadCsvLog = async (
  page?: number,
  limit?: number,
  company_id?: number,
  category_activity?: string,
  startDate?: string,
  endDate?: string
) => {
  try {
    const params: any = {
      page,
      limit,
    };

    if (company_id) params.company_id = company_id;
    if (category_activity) params.activity_type_category = category_activity;
    if (startDate) params.start_date = startDate;
    if (startDate) params.end_date = endDate;

    const res = await api.get(
      `/admin/export-logs`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export { logAuditApi, companyListAuditApi, typeActivityApi, DownloadCsvLog };
