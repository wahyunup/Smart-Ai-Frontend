import Swal from "sweetalert2";
import {
  deleteStaff,
  getStaff,
  toogleStatUsers,
} from "../../../services/admin/ManageStaff";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const useManageStaff = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initParams = Number(searchParams.get("page")) || 1;
  const initFilterParams = searchParams.get("filter") ?? "";
  const [value, setValue] = useState(initFilterParams);
  const [page, setPage] = useState(initParams);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(0);
  const [isLoadingStaff, setIsLoadingStaff] = useState(false);
  const [isOpenStat, setIsOpenStat] = useState<number | null>(null);

  const getRandomColor = (id: number) => {
    const colors = [
      "#E57373",
      "#81C784",
      "#64B5F6",
      "#FFD54F",
      "#BA68C8",
      "#4DB6AC",
      "#F06292",
      "#90A4AE",
    ];
    return colors[id % colors.length];
  };

  const fetchStaff = async () => {
    setIsLoadingStaff(true);
    try {
      const res = await getStaff(page, 4, value);

      setData(res.users);
      setTotalPage(res.total_pages);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingStaff(false);
    }
  };

  const handleStatUser = async (id: number, is_active: boolean) => {
    try {
      await toogleStatUsers(id, !is_active);
      await fetchStaff();
    } catch (error) {
      console.log(error);
    }
  };

  const handleToogleStatus = (id: number) => {
    setIsOpenStat((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    fetchStaff();
  }, [page, value]);

  const handleNextPage = () => {
    if (isLoadingStaff) return;
    if (page < totalPage) {
      setPage(page + 1);
    }
  };
  useEffect(() => {
    setSearchParams({ page: String(page), filter: String(value) });
  }, [page, value]);

  const handlePrevPage = () => {
    if (isLoadingStaff) return;
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleDelete = async (id: number) => {
    setIsLoading(id);
    try {
      Swal.fire({
        text: "yakin ingin menghapus staff?",
        icon: "question",
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
          await deleteStaff(id);
          Swal.fire({
            icon: "success",
            text: "user berhasil dihapus",
            confirmButtonText: "oke",
          }).then(async (response) => {
            if (response.isConfirmed) {
              await fetchStaff();
            }
          });
        }
      });
    } catch (error: any) {
      Swal.fire({
        text: error.response.data.message,
        icon: "warning",
        confirmButtonText: "oke",
        confirmButtonColor: "#DB3726",
        buttonsStyling: true,
        customClass: {
          confirmButton: "danger-button",
        },
      });
    } finally {
      setIsLoading(0);
    }
  };
  const handleEdit = (id: number) => {
    const userData = data.find((data: { id: number }) => data.id === id);
    navigate("/admin/manage-staff/edit", { state: { userData: userData } });
  };

  return {
    data,
    value,
    setValue,
    isLoadingStaff,
    page,
    totalPage,
    getRandomColor,
    isOpenStat,
    handleToogleStatus,
    handleStatUser,
    handleDelete,
    handleEdit,
    handleNextPage,
    handlePrevPage,
    navigate,
    isLoading,
    setIsOpenStat,
  };
};
