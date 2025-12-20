import api from "../../../shared/lib/Axios";

const authLoginApi = async (username: string, password: string) => {
  try {
    const res = await api.post("/auth/user/token", {
      username: username,
      password: password,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

const authCompanyRegisterApi = async (
  name: string,
  email: string,
  password: string,
  company_name: string,
  pic_phone_number: number
) => {
  try {
    const res = await api.post("/auth/register", {
      name: name,
      email: email,
      password: password,
      company_name: company_name,
      pic_phone_number: pic_phone_number,
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

const authEmployeeRegisterApi = async (
  name: string,
  email: string,
  password: string,
  role: string,
  company_id: number,
  DivisionId: number
) => {
  try {
    const res = await api.post("/auth/register", {
      name: name,
      email: email,
      password: password,
      role: role,
      company_id: company_id,
      DivisionId: DivisionId,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

const userIsLoginApi = async () => {
  try {
    const res = await api.get("/auth/me");
    return res.data;
  } catch (error) {
    throw error;
  }
};

const statUserCompanyApi = async () => {
  try {
    const res = await api.get("/companies/me");
    return res.data;
  } catch (error) {
    throw error;
  }
};

const fillInfoCompanyApi = async (
  name?: string,
  company_email?: string,
  admin_name?: string,
  admin_email?: string,
  image?: File | null,
  admin_password?: string,
  address?: string,
  pic_phone_number?: string
) => {
  const formData = new FormData();
  if (name) formData.append("name", name);
  if (company_email) formData.append("company_email", company_email);
  if (admin_name) formData.append("admin_name", admin_name);
  if (admin_email) formData.append("admin_email", admin_email);
  if (image) formData.append("logo_file", image);
  if (admin_password) formData.append("admin_password", admin_password);
  if (address) formData.append("address", address);
  if (pic_phone_number) formData.append("pic_phone_number", pic_phone_number);
  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }
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

const resetPassword = async (
  email: string,
  token: string,
  newPassword: string
) => {
  try {
    const res = await api.post("/auth/reset-password", {
      email: email,
      token: token,
      new_password: newPassword,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

const resetPasswordEmail = async (
  email: string,
) => {
  try {
    const res = await api.post(`/auth/request-password-reset?email=${email}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export {
  authLoginApi,
  authCompanyRegisterApi,
  authEmployeeRegisterApi,
  userIsLoginApi,
  statUserCompanyApi,
  fillInfoCompanyApi,
  resetPassword,
  resetPasswordEmail
};
