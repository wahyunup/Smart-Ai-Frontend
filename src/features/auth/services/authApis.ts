import api from "../../../shared/lib/Axios";

const authLoginApi = async (email: string, password: string) => {
  try {
    const res = await api.post("/auth/token", {
      email: email,
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
  company_code: string
) => {
  try {
    const res = await api.post("/auth/register", {
      name: name,
      email: email,
      password: password,
      company_name: company_name,
      company_code: company_code,
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

export { authLoginApi, authCompanyRegisterApi, authEmployeeRegisterApi, userIsLoginApi };
