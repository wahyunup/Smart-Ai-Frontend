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
  pic_phone_number : number
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

export { authLoginApi, authCompanyRegisterApi, authEmployeeRegisterApi, userIsLoginApi };
