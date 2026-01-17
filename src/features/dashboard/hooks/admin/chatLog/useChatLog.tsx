import Swal from "sweetalert2";
import {
  chatLog,
  deleteChatlogApi,
  downloadCsv,
} from "../../../services/admin/ChatLog";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { ChatLogProps } from "../../../../../shared/types/type";

export const useChatLog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initParams = Number(searchParams.get("page")) || 1;
  const initFilterParams = searchParams.get("filter") ?? "";

  const [value, setValue] = useState(initFilterParams);
  const [page, setPage] = useState(initParams);
  const navigate = useNavigate();
  const [data, setData] = useState<ChatLogProps[]>([]);
  const [totalPage, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDoc, setIsLoadingDoc] = useState(false);

  const fetchChatLog = async () => {
    setIsLoadingDoc(true);
    try {
      const res = await chatLog(page, 4, value);

      setData(res.chatlogs);
      setTotalPage(res.total_pages);
    } catch (error: any) {
      console.log(error.response.data.message);
    } finally {
      setIsLoadingDoc(false);
    }
  };

  useEffect(() => {
    fetchChatLog();
  }, [page, value]);

  const handleNextPage = () => {
    if (isLoadingDoc) return;
    if (page < totalPage) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (isLoadingDoc) return;
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const exportCsv = async () => {
    setIsLoading(true);
    const date = new Date();
    const getDays = String(date.getDate()).padStart(2, "0");
    const getMonth = String(date.getMonth()).padStart(2, "0");
    const getYear = date.getFullYear();

    const dateNow = `${getYear}-${getMonth}-${getDays}`;
    try {
      const res = await downloadCsv(dateNow);
      const blob = new Blob([res], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "chat_log.csv";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      console.log(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditChatLog = (id: number) => {
    const getChatLogId = data.find((chat: any) => chat.id === id);

    if (getChatLogId) {
      const conversation_id = getChatLogId.conversation_id;
      navigate(`/admin/chat-log/detail/${conversation_id}`);
    }
  };

  useEffect(() => {
    setSearchParams({ page: String(page), filter: String(value) });
  }, [page, value]);

  const handleDeleteChatLog = async (id: number) => {
    try {
      Swal.fire({
        text: "yakin ingin menghapus chat log ini?",
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
          await deleteChatlogApi(id);
          Swal.fire({
            text: "berhasil menghapus chat log",
            icon: "success",
            confirmButtonText: "oke",
          });
          fetchChatLog();
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
    handleEditChatLog,
    handleDeleteChatLog,
    totalPage,
    exportCsv,
    isLoadingDoc,
  };
};
