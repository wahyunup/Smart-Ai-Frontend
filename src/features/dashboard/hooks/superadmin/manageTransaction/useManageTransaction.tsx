import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  allPlanApi,
  allTransactionApi,
  updateTransactionApi,
} from "../../../services/superadmin/Transaction";
import { formatDate } from "../../../../../shared/utils/FormatDate";
import { useSearchParams } from "react-router-dom";

export const useManageTransaction = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initParamsPage = Number(searchParams.get("page")) || 1;
  const initNav = searchParams.get("nav") ?? "Riwayat Transaksi";
  const [isActive, setIsActive] = useState(initNav);
  const [isLoadingFetch, setIsLoadingFetch] = useState(false);
  const [data, setData] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(initParamsPage);
  const [plans, setplans] = useState<any>([]);
  const [topUp, setTopUp] = useState<any>([]);
  const [date, setDate] = useState("");

  const fetchTransaction = async () => {
    try {
      const res = await allTransactionApi(page, 4);
      setTotalPage(res.total_pages);
      setPage(res.current_page);
      setData(res.items);
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    setSearchParams({ page: String(page), nav: String(isActive) });
  }, [page, isActive]);

  const handleChangePlan = (index: number, value: string) => {
    const cleanValue = Number(value.replace(/\D/g, ""));
    const updated = [...plans];
    updated[index].price = cleanValue;
    setplans(updated);
  };

  const handleChangeTopup = (index: number, value: string) => {
    const cleanValue = Number(value.replace(/\D/g, ""));
    const updated = [...topUp];
    updated[index].price = cleanValue;
    setTopUp(updated);
  };

  const fetchPlans = async () => {
    setIsLoadingFetch(true);
    try {
      const res = await allPlanApi();
      console.log(res);
      const convert_date = formatDate(res.updated_at);
      setDate(convert_date);
      setTopUp(res.top_up_packages);
      setplans(res.plans);
    } catch (error: any) {
      console.log(error.response.data.message);
    } finally {
      setIsLoadingFetch(false);
    }
  };

  const handleSubmitChange = async () => {
    try {
      const payload = {
        plans: plans.map((p: { name: string; price: number }) => ({
          name: p.name,
          price: Number(p.price),
        })),
        top_up_packages: topUp.map(
          (t: { package_type: string; price: number }) => ({
            package_type: t.package_type,
            price: Number(t.price),
          })
        ),
      };

      await updateTransactionApi(payload);

      Swal.fire({
        text: "Harga berhasil diperbarui!",
        icon: "success",
        confirmButtonText: "oke",
        confirmButtonColor: "#2BA54B",
        buttonsStyling: true,
        customClass: {
          confirmButton: "primary-button",
        },
      }).then(async (response) => {
        if (response.isConfirmed) {
          window.location.reload();
        }
      });
    } catch (error: any) {
      Swal.fire({
        text: error.response?.data?.message,
        icon: "error",
        confirmButtonText: "OKE",
      });
    }
  };

  useEffect(() => {
    fetchPlans();
    fetchTransaction();
  }, [page]);



  const nextPage = () => {
    if (page < totalPage) {
      setPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };
  return {
    isActive,
    setIsActive,
    data,
    isLoadingFetch,
    page,
    totalPage,
    nextPage,
    prevPage,
    plans,
    topUp,
    handleChangePlan,
    handleChangeTopup,
    date,
    handleSubmitChange,
  };
};
