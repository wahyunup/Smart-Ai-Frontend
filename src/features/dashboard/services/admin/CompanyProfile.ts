import api from "../../../../shared/lib/Axios";

const CompanyInformationApi = async () => {
  try {
    const res = await api.get("/companies/me");
    return res.data;
  } catch (error) {
    throw error;
  }
};

const EditCompanyInformationApi = async (
  admin_name: string,
  address: string,
  logo_file: File | null,
  admin_password: string
) => {
  const formData = new FormData();
  formData.append("admin_name", admin_name);
  formData.append("address", address);
  formData.append("admin_password", admin_password);
  if (logo_file) formData.append("logo_file", logo_file);

  try {
    const res = await api.put("/companies/me", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export { CompanyInformationApi, EditCompanyInformationApi };
