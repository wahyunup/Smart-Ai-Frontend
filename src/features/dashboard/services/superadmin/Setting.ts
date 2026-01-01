import api from "../../../../shared/lib/Axios";

const getSetting = async () => {
  try {
    const res = await api.get("/auth/me");
    return res.data;
  } catch (error) {
    throw error;
  }
};

const updateProfile = async (
  name: string,
  username: string,
  email: string,
  password: string
) => {
  try {
    const res = await api.put("/admin/superadmin/me", {
      name: name,
      username: username,
      email: email,
      password: password,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export { getSetting, updateProfile };
