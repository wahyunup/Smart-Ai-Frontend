import api from "../../../../shared/lib/Axios";

const mySubcriptionApi = async () => {
  try {
    const res = await api.get("/subscriptions/my-status");
    return res.data;
  } catch (error) {
    throw error
  }
};

const planSubcriptionApi = async () => {
  try {
    const res = await api.get("/plans")
    return res.data
  } catch (error) {
    throw error
  }
}

export {mySubcriptionApi, planSubcriptionApi}
