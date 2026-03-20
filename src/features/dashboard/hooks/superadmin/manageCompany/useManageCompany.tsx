import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  allCompanyApi,
  deleteCompanyApi,
  toggleIsActiveApi,
} from "../../../services/superadmin/ManageCompany";
import { useNavigate, useSearchParams } from "react-router-dom";

export const useManageCompany = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initParamsPage = Number(searchParams.get("page")) || 1;
  const initParamsSearch = searchParams.get("search") ?? "";
  const [filter, setFilter] = useState(initParamsSearch);
  const [page, setPage] = useState(initParamsPage);
  const [totalPage, setTotalPage] = useState(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingToggle, setIsLoadingToggle] = useState<number | null>(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState<number>(0);
  const [isOpenStat, setIsOpenStat] = useState<number | null>(null);
  const [debounceSearch, setDebounceSearch] = useState<string>("");

  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFilter(value);
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      setDebounceSearch(filter)
    }, 500)
    return () => clearTimeout(debounce)
  },[filter])

  const fetchAllCompany = async () => {
    setIsLoading(true);
    try {
      const res = await allCompanyApi(page, 4, debounceSearch);
      const destructerCompany = res.companies.map((item: any) => ({
        ...item,
        id: item.company_id,
      }));
      setData(destructerCompany);
      setPage(res.current_page);
      setTotalPage(res.total_page);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCompany();
  }, [debounceSearch, page]);

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

  const handleStatUser = async (id: number, is_active: boolean) => {
    setIsLoadingToggle(id);
    try {
      await toggleIsActiveApi(id, is_active);
      await fetchAllCompany();
    } catch (error: any) {
      Swal.fire({
        text: error.response.data.message,
        icon: "error",
        confirmButtonText: "oke",
        confirmButtonColor: "#DB3726",
        buttonsStyling: true,
        customClass: {
          confirmButton: "danger-button",
        },
      });
    } finally {
      setIsLoadingToggle(null);
    }
  };

  const handleToogleStatus = (id: number) => {
    setIsOpenStat((prev) => (prev === id ? null : id));
  };

  const deleteCompany = async (id: number) => {
    setIsLoadingDelete(id);
    try {
      Swal.fire({
        text: "yakin ingin menghapus perusahaan?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "Batal",
        confirmButtonColor: "#DB3726",
        cancelButtonColor: "#F2F2F2",
        buttonsStyling: true,
        customClass: {
          confirmButton: "danger-button",
          cancelButton: "disable-button",
        },
      }).then(async (response) => {
        if (response.isConfirmed) {
          await deleteCompanyApi(id);
          Swal.fire({
            text: "perusahaan berhasil dihapus",
            icon: "success",
            confirmButtonText: "oke",
            confirmButtonColor: "#2BA54B",
            buttonsStyling: true,
            customClass: {
              confirmButton: "primary-button",
            },
          }).then(async (response) => {
            if (response.isConfirmed) {
              fetchAllCompany();
            }
          });
        }
      });
    } catch (error: any) {
      Swal.fire({
        text: error.response.data.message,
        icon: "error",
        confirmButtonText: "oke",
        confirmButtonColor: "#DB3726",
        buttonsStyling: true,
        customClass: {
          confirmButton: "danger-button",
        },
      });
    } finally {
      setIsLoadingDelete(0);
    }
  };

  useEffect(() => {
    setSearchParams({ page: String(page), filter: String(filter) });
  }, [page, filter]);
  return {
    navigate,
    setFilter,
    setIsOpenStat,
    page,
    totalPage,
    isLoading,
    isLoadingToggle,
    isLoadingDelete,
    isOpenStat,
    data,
    handleNextPage,
    handlePrevPage,
    handleToogleStatus,
    handleStatUser,
    deleteCompany,
    handleOnChange,
  };
};
