import { useEffect, useState } from "react";
import {
  myPaymentApi,
  planSubcriptionApi,
} from "../../../services/admin/Subcription";

export const useSelectSubcription = () => {
  const [data, setData] = useState([]);
  const [optionPlan, setOptionPlan] = useState<any | []>([]);
  const [currentPlan, setCurrentPlan] = useState();
  const [isLoading, setIsLoading] = useState<string | boolean>(false);
  const isLocalhost = window.location.hostname === "localhost";

  useEffect(() => {
    const fetchSubPlan = async () => {
      try {
        const res = await planSubcriptionApi();
        console.log(res);
        setCurrentPlan(res?.current_subscription?.plan_name);
        setData(res?.plans);
        setOptionPlan(res?.top_up_packages);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSubPlan();
  }, [isLoading]);

  const handlePayment = async (id: number, package_type?: string) => {
    const loadId = package_type ? `topup-${id}` : `plan-${id}`;
    setIsLoading(loadId);
    const baseURL = !isLocalhost
      ? import.meta.env.VITE_VERCEL_URL ?? import.meta.env.VITE_VPS_URL
      : "http://localhost:5173";
    const successRoute = `${baseURL}/admin/subcription/payment-success`;
    const failedRoute = `${baseURL}/admin/subcription/payment-failed`;

    try {
      if (!package_type) {
        const res = await myPaymentApi(id, successRoute, failedRoute, "");

        if (res) {
          window.open(res.payment_url, "_blank");
        }
      } else {
        if (!package_type) {
          return;
        }
        const res = await myPaymentApi(
          0,
          successRoute,
          failedRoute,
          package_type
        );
        if (res) {
          window.open(res.payment_url, "_blank");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, optionPlan, currentPlan, isLoading, handlePayment };
};
