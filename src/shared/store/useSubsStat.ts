import { create } from "zustand";
import { planStatusApi } from "../../features/aiChat/services/aiChat";

interface planState {
  plan: null;
  loading: boolean;
  fetchPlan: () => Promise<void>;
  monthly_quota: number;
}

export const usePlanStore = create<planState>((set, get) => ({
  loading: false,
  plan: null,
  monthly_quota: 0,

  fetchPlan: async () => {
    if (get().plan) return;

    set({ loading: true });
    try {
      const res = await planStatusApi();

      set({ plan: res.plan_name, monthly_quota: res.monthly_quota });
    } catch (error: any) {
      console.log(error.response.data.message);
    } finally {
      set({ loading: false });
    }
  },
}));
