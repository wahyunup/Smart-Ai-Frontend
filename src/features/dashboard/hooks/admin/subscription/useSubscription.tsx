import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { mySubcriptionApi, myTransactionApi } from "../../../services/admin/Subcription";
import { formatDate } from "../../../../../shared/utils/FormatDate";

export const useSubscription = () => {
    const navigate = useNavigate();
  const [transaction, setTransaction] = useState<any>();
  const [searchParams, setSearchParams] = useSearchParams();
  const initParams = Number(searchParams.get("page")) || 1;
  const [page, setPage] = useState(initParams);
  const [totalPage, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [mySub, setMySub] = useState({
    current_documents: 0,
    current_users: 0,
    days_until_renewal: 0,
    document_quota: 0,
    end_date: "Free",
    max_users: 0,
    monthly_quota: 0,
    plan_name: "Trial",
    remaining_documents: 0,
    remaining_documents_percentage: 0,
    remaining_quota: 0,
    remaining_quota_percentage: 0,
    remaining_users: 0,
    remaining_users_percentage: 0,
    top_up_quota: 0,
    total_quota: 0,
  });

  useEffect(() => {
    setSearchParams({ page: String(page) });
  }, [page]);

  const fetchMySub = async () => {
    try {
      const res = await mySubcriptionApi();
      const roundedPrecentace = Math.floor(res.remaining_quota_percentage);
      const convertDate = formatDate(res.end_date);

      setMySub({
        end_date: convertDate,
        current_documents: res.current_documents,
        current_users: res.current_users,
        days_until_renewal: res.days_until_renewal,
        document_quota: res.document_quota,
        max_users: res.max_users,
        monthly_quota: res.monthly_quota,
        plan_name: res.plan_name,
        remaining_documents: res.remaining_documents,
        remaining_documents_percentage: res.remaining_documents_percentage,
        remaining_quota: res.remaining_quota,
        remaining_quota_percentage: roundedPrecentace,
        remaining_users: res.remaining_users,
        remaining_users_percentage: res.remaining_users_percentage,
        top_up_quota: res.top_up_quota,
        total_quota: res.total_quota,
      });
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };

  const fetchTransaction = async () => {
    setIsLoading(true);
    try {
      const res = await myTransactionApi(page, 2);
      setTotalPage(res.total_pages);
      setTransaction(res.items);
    } catch (error: any) {
      console.log(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMySub();
    fetchTransaction();
  }, [page]);

  const handleNextPage = () => {
    if (isLoading) return;
    if (page < totalPage) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (isLoading) return;
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return{
    mySub,
    transaction,
    isLoading,
    page,
    totalPage,
    handleNextPage,
    handlePrevPage,
    navigate,
  }
}