import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import { useNavigate, useSearchParams } from "react-router-dom";
import { deleteDocument, getDocuments } from "../../../services/admin/ManageDocuments";

export const useManageDocuments = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initParams = Number(searchParams.get("page")) || 1;
  const initFilterParams = searchParams.get("filter") ?? "";
  const [value, setValue] = useState(initFilterParams);
  const [page, setPage] = useState(initParams);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDocument = async () => {
    setIsLoading(true);
    try {
      const res = await getDocuments(page, 4, value);
      setData(res.documents);
      setTotalPage(res.total_pages);
    } catch (error) {
      console.log(Response.error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDocument();
  }, [page, value]);

  useEffect(() => {
    setSearchParams({ page: String(page), filter: String(value) });
  }, [page, value]);

  const handleEdit = (data_id: number) => {
    const selectedData = data.find(
      (data: { id: number }) => data.id === data_id
    );

    if (selectedData) {
      navigate("/admin/manage-documents/edit", {
        state: { datas: selectedData },
      });
    }
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

  const handleDelete = async (id: number) => {
    try {
      Swal.fire({
        text: "yakin ingin menghapus dokumen ini?",
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
          await deleteDocument(id);
          Swal.fire({
            text: "dokumen berhasil dihapus",
            icon: "warning",
            confirmButtonText: "oke",
            confirmButtonColor: "#2BA54B",
            buttonsStyling: true,
            customClass: {
              confirmButton: "primary-button",
            },
          }).then((response) => {
            if (response.isConfirmed) {
              fetchDocument();
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
    }
  };

  return {
    value,
    setValue,
    page,
    handleNextPage,
    handlePrevPage,
    isLoading,
    data,
    handleEdit,
    handleDelete,
    totalPage,
    navigate,
  };
};
