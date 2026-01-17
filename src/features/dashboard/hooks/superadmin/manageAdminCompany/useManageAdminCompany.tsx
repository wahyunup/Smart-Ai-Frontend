import { useEffect, useState } from "react";
import { allAdminApi } from "../../../services/superadmin/ManageAdmin";
import { useNavigate, useSearchParams } from "react-router-dom";

export const useManageAdminCompany = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initParamsPage = Number(searchParams.get("page")) || 1;
  const [page, setPage] = useState(initParamsPage);
  const [totalPage, setTotalPage] = useState(120);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState([]);
  const [isLoadingDelete, setIsLoadingDelete] = useState<number>(0);
  const [isOpenStat, setIsOpenStat] = useState<number | null>(null);

  const navigate = useNavigate();

  const fetchAllAdmin = async () => {
    setIsLoading(true);
    try {
      const res = await allAdminApi(page, 4);
      setPage(res.current_page);
      setData(res.admins);
      setTotalPage(res.total_page);
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchAllAdmin();
  }, [page]);

  const handleStatUser = async (id: number, is_active: boolean) => {
    console.log(id);
    console.log(is_active);

    try {
      await fetchAllAdmin();
    } catch (error) {
      console.log(error);
    }
  };

  const handleToogleStatus = (id: number) => {
    setIsOpenStat((prev) => (prev === id ? null : id));
  };

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

  const deleteCompany = (id: number) => {
    setIsLoadingDelete(id);
  };

  useEffect(() => {
    setSearchParams({ page: String(page) });
  }, []);

  return {
    navigate,
    handleNextPage,
    handlePrevPage,
    data,
    page,
    totalPage,
    isLoading,
    isLoadingDelete,
    deleteCompany,
    handleToogleStatus,
    isOpenStat,
    handleStatUser,
    setIsOpenStat
  };
};
