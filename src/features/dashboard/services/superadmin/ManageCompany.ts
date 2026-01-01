import api from "../../../../shared/lib/Axios";

const allCompanyApi = async (page: number, limit: number, filter: string) => {
  try {
    const res = await api.get(
      `/admin/companies?search=${filter}&page=${page}&limit=${limit}`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

const CompanyByIdApi = async (id: number) => {
  try {
    const res = await api.get(`/admin/companies/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

const UpdateCompanyApi = async (
  id: number,
  company_name: string,
  company_email: string,
  company_address: string,
  admin_name: string,
  company_is_active: boolean,
  admin_profile_picture: File | null
) => {
  const formData = new FormData();
  if (company_email) formData.append("company_email", company_email);
  if (company_name) formData.append("company_name", company_name);
  if (company_address) formData.append("company_address", company_address);
  if (admin_name) formData.append("admin_name", admin_name);
  if (company_is_active)
    formData.append("company_is_active", String(company_is_active));
  if (admin_profile_picture)
    formData.append("admin_profile_picture", admin_profile_picture);
  try {
    const res = await api.put(`/admin/companies/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

const CreateCompanyApi = async (
  name: string,
  company_email: string,
  admin_name: string,
  address: string,
  admin_password: string,
  is_active: boolean,
  admin_profile_picture: File | null
) => {
  try {
    const formData = new FormData();
    if (name) formData.append("name", name);
    if (company_email) formData.append("company_email", company_email);
    if (admin_name) formData.append("admin_name", admin_name);
    if (address) formData.append("address", address);
    if (admin_password) formData.append("password", admin_password);
    if (is_active) formData.append("is_active", String(is_active));
    if (admin_profile_picture)
      formData.append("admin_profile_picture", admin_profile_picture);

    const res = await api.post("/admin/companies", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

const deleteCompanyApi = async (id: number) => {
  try {
    const res = await api.delete(`/admin/companies/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

const toggleIsActiveApi = async (company_id: number, is_active: boolean) => {
  try {
    const res = await api.patch(`/admin/companies/${company_id}/status`, {
      is_active: is_active,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export {
  allCompanyApi,
  CompanyByIdApi,
  UpdateCompanyApi,
  CreateCompanyApi,
  toggleIsActiveApi,
  deleteCompanyApi,
};
