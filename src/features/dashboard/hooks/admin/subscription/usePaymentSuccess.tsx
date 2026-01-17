import { useEffect, useState } from "react";
import { formatDate } from "../../../../../shared/utils/FormatDate";
import { paymentStatus } from "../../../services/admin/Subcription";
import { useNavigate, useSearchParams } from "react-router-dom";

export const usePaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const trx_id = Number(searchParams.get("trx_id")) || 0;
  const [status, setStatus] = useState({
    plan_name: "",
    active_end: "",
    subscription_status: "",
  });
  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        const res = await paymentStatus(trx_id);
        const date = formatDate(res.active_end);

        setStatus({
          active_end: date,
          plan_name: res.plan_name,
          subscription_status: res.subscription_status,
        });
      } catch (error: any) {
        console.log(error.response.data.message);
      }
    };
    fetchPaymentStatus();
  }, []);

  return { navigate, trx_id, status };
};
