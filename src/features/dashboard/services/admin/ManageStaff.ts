import api from "../../../../shared/lib/Axios";

const getStaff = async (page: number, limit: number, filter: string) => {
  try {
    const res = await api.get(
      `/companies/users?search=${filter}&page=${page}&limit=${limit}`
    );
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
  division: string
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
    formData.append("division", division);
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
  profile_picture_file?: File | null,
  name?: string,
  email?: string,
  username?: string,
  password?: string,
  role?: string,
  division?: string
) => {
  const formData = new FormData();
  if (profile_picture_file) formData.append("profile_picture_file", profile_picture_file);
  if (name) formData.append("name", name);
  if (email) formData.append("email", email);
  if (username) formData.append("username", username);
  if (password) formData.append("password", password);
  if (role) formData.append("role", role);
  if (division) formData.append("division", division);
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

const toogleStatUsers =  async(id:number, is_active:boolean) => {
  try {
    const res = await api.patch(`/companies/employees/${id}/status`, {
      is_active : is_active
    })
    return res.data
  } catch (error) {
    throw error
  }
}

export { getStaff, deleteStaff, createStaff, editStaff, toogleStatUsers };
