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
  name: string,
  companyEmail: string
) => {
  const formData = new FormData();
  if (companyEmail) formData.append("email", companyEmail);
  if (name) formData.append("name", name);
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
  // name: string,
  // company_email: string,
  // admin_name: string,
  // admin_password: string,
  // code: string,
  // address: string,
  // pic_phone_number: string,
  // is_active: boolean
) => {
  const formData = new FormData();
  try {
    const res = await api.put("/admin/companies", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export { allCompanyApi, CompanyByIdApi, UpdateCompanyApi, CreateCompanyApi };
