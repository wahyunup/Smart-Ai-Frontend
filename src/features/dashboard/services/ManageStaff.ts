import api from "../../../shared/lib/Axios";

const getStaff = async () => {
  try {
    const res = await api.get("/companies/users");
    return res.data;
  } catch (error) {
    throw error;
  }
};

const deleteStaff = async (user_id: number) => {
  try {
    const res = await api.delete(`/companies/employees/${user_id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

const createStaff = async (
  profile_picture_file: File | null,
  name: string,
  email: string,
  username: string,
  password: string,
  role: string,
  division_name: string
) => {
  try {
    const formData = new FormData();
    if (profile_picture_file) {
      formData.append("profile_picture_file", profile_picture_file);
    }
    formData.append("name", name);
    formData.append("email", email);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("division_name", division_name);
    const res = await api.post("/companies/employees/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

const editStaff = async (
  user_id: number,
  profile_picture_file: File,
  name : string,
  email : string,
  username : string,
  password: string,
  role: string,
  division : string
) => {
  const formData = new FormData();
  formData.append("profile_picture_file", profile_picture_file);
  formData.append("name", name);
  formData.append("email", email);
  formData.append("username", username);
  formData.append("password", password);
  formData.append("role", role);
  formData.append("division", division);
  try {
    const res = await api.put(`/companies/employees/${user_id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export { getStaff, deleteStaff, createStaff, editStaff };
