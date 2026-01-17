import { useEffect, useState } from "react";
import {
  companyListAuditApi,
  DownloadCsvLog,
  logAuditApi,
  typeActivityApi,
} from "../../../services/superadmin/LogAudit";
import { useSearchParams } from "react-router-dom";

export const useLogAudit = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initParams = Number(searchParams.get("page")) || 1;
  const [dataLogs, setDataLogs] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const [type, setType] = useState([]);
  const [hoverEffect, setHoverEffect] = useState<number | boolean>(false);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(initParams);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState({
    dateStart: "",
    dateEnd: "",
    company: 0,
    type: "",
  });

  const fetchLogAudit = async () => {
    setIsLoading(true);
    try {
      const res = await logAuditApi(page, 4);
      setDataLogs(res.logs);
      setTotalPage(res.total_pages);
      setPage(res.current_page);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLogAuditFilter = async () => {
    const companyId = Number(filter.company);
    setIsLoading(true);
    try {
      const res = await logAuditApi(
        page,
        4,
        companyId,
        filter.type,
        filter.dateStart,
        filter.dateEnd
      );
      setDataLogs(res.logs);
      setTotalPage(res.total_pages);
      setPage(res.current_page);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCompanyLogAudit = async () => {
    try {
      const res = await companyListAuditApi();
      console.log(res, "company list audit");

      setCompanyList(res.companies);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTypeActivity = async () => {
    try {
      const res = await typeActivityApi();
      setType(res.categories);
    } catch (error) {
      console.log(error);
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

  useEffect(() => {
    setSearchParams({ page: String(page) });
  }, [page, setSearchParams]);

  useEffect(() => {
    if (filter) {
      fetchLogAuditFilter();
    } else {
      fetchLogAudit();
    }
  }, [page]);

  useEffect(() => {
    fetchCompanyLogAudit();
    fetchTypeActivity();
  }, []);

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFilter = async () => {
    setPage(1);
    const companyId = Number(filter.company);
    try {
      const res = await logAuditApi(
        page,
        4,
        companyId,
        filter.type,
        filter.dateStart,
        filter.dateEnd
      );
      setDataLogs(res.logs);
      setTotalPage(res.total_pages);
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };

  const exportCsv = async () => {
    setIsLoading(true);
    const companyId = Number(filter.company);
    try {
      if (filter) {
        const res = await DownloadCsvLog(
          page,
          4,
          companyId,
          filter.type,
          filter.dateStart,
          filter.dateEnd
        );
        const blob = new Blob([res], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "Audit Log & Aktivitas.csv";
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        const res = await DownloadCsvLog(page, 4);
        const blob = new Blob([res], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "Audit Log & Aktivitas.csv";
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error: any) {
      console.log(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    exportCsv,
    handleOnChange,
    handleFilter,
    handleNextPage,
    handlePrevPage,
    dataLogs,
    companyList,
    type,
    hoverEffect,
    setHoverEffect,
    totalPage,
    page,
    isLoading,
    filter,
  };
};
