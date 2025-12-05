import api from "../../../../shared/lib/Axios";

const mySubcriptionApi = async () => {
  try {
    const res = await api.get("/subscriptions/my-status");
    return res.data;
  } catch (error) {
    throw error;
  }
};

const myTransactionApi = async (page: number, limit: number) => {
  try {
    const res = await api.get(
      `/subscriptions/transactions?page=${page}&limit=${limit}`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

const myPaymentApi = async (
  plan_id?: number,
  success_return_url?: string,
  failed_return_url?: string,
  package_type?: string
) => {
  try {
    if (!package_type) {
      const res = await api.post("/subscriptions/create-payment", {
        plan_id: plan_id,
        success_return_url: success_return_url,
        failed_return_url: failed_return_url,
      });
      return res.data;
    } else {
      const res = await api.post("/subscriptions/create-payment", {
        transaction_type: "topup",
        package_type: package_type,
        success_return_url: success_return_url,
        failed_return_url: failed_return_url,
      });
      return res.data;
    }
  } catch (error) {
    throw error;
  }
};

const paymentStatus = async (trx_id:number) => {
  try {
    const res = await api.get(
      `/subscriptions/transactions/payment-success?trx_id=${trx_id}`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

const planSubcriptionApi = async () => {
  try {
    const res = await api.get("/plans");
    return res.data;
  } catch (error) {
    throw error;
  }
};

const receiptApi = async (trx_id: number) => {
  try {
    const res = await api.get(
      `/subscriptions/transactions/receipt?trx_id=${trx_id}`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export {
  mySubcriptionApi,
  planSubcriptionApi,
  myTransactionApi,
  myPaymentApi,
  receiptApi,
  paymentStatus
};
