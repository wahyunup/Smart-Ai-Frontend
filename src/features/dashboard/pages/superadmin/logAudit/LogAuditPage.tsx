import React, { useEffect, useState } from "react";
import Input from "../../../../../shared/components/ui/Input";
import MainLayout from "../../../../../shared/layouts/MainLayout";
import {
  companyListAuditApi,
  DownloadCsvLog,
  logAuditApi,
  typeActivityApi,
} from "../../../services/superadmin/LogAudit";
import TableHeaderList from "../../../../../shared/components/common/Table/TableHeaderList";
import TableBody from "../../../../../shared/components/common/Table/TableBody";
import { useSearchParams } from "react-router-dom";
import Button from "../../../../../shared/components/ui/Button";
import { formatDate } from "../../../../../shared/utils/FormatDate";

const LogAuditPage = () => {
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
      console.log(res);

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
    } catch (error) {
      console.log(error);
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
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="p-10">
        <div className="flex justify-between items-end">
          <div className="flex gap-2 flex-col">
            <h1 className="2xl:text-2xl md:text-xl font-semibold">
              Audit Log & Aktivitas
            </h1>
            <p className="2xl:text-xl font-medium">
              Melacak semua aktivitas penting sistem, transaksi data, dan
              kegagalan
            </p>
          </div>
          <Button
            onclick={exportCsv}
            variant="secondary"
            classname="2xl:px-10 2xl:py-4 md:px-5 md:py-3 bg-blue-500 rounded-xl h-fit">
            Export CSV
          </Button>
        </div>

        <div className="mt-10 flex gap-10 items-center">
          <Input
            type="date"
            onchange={handleOnChange}
            value={filter.dateStart}
            variant="secondary"
            iconPosition="left"
            label="Filter Tanggal Awal"
            labelLayout="inline"
            htmlFor="dateStart"
            name="dateStart"
          />
          <Input
            type="date"
            onchange={handleOnChange}
            value={filter.dateEnd}
            variant="secondary"
            iconPosition="left"
            label="Filter Tanggal Akhir"
            labelLayout="inline"
            htmlFor="dateEnd"
            name="dateEnd"
          />
          <div className="flex gap-2 items-center h-full w-full">
            <label
              htmlFor="filtercompany"
              className="2xl:font-semibold 2xl:text-md md:text-xs md:font-medium">
              Filter Perusahaan
            </label>
            <select
              name="company"
              id="company"
              value={filter.company}
              onChange={handleOnChange}
              className="outline w-full p-3 rounded-xl outline-gray-400 h-full 2xl:text-base md:text-xs">
              <option value="">Semua perusahaan</option>
              {companyList.map((item: { name: string; id: number }) => (
                <option
                  className="h-10 overflow-auto"
                  key={item.id}
                  value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2 items-center h-full w-full">
            <label
              htmlFor="filtercompany"
              className="2xl:font-semibold 2xl:text-md md:text-xs md:font-medium">
              Filter Tipe Aktivitas
            </label>
            <select
              name="type"
              id="type"
              value={filter.type}
              onChange={handleOnChange}
              className="outline w-full p-3 rounded-xl outline-gray-400 2xl:text-base md:text-xs">
              <option value="">Semua Tipe</option>
              {type.map((item) => (
                <>
                  <option value={item}>{item}</option>
                </>
              ))}
            </select>
          </div>

          <Button
            onclick={handleFilter}
            variant="secondary"
            classname="2xl:px-7 md:px-10 rounded-xl ">
            Terapkan Filter
          </Button>
        </div>

        <div className="border border-[#B2B2B2] rounded-2xl overflow-hidden mt-10">
          <TableHeaderList classname="grid-cols-5 bg-[#E3F9E8]">
            <span>Waktu</span>
            <span>ID Aktor</span>
            <span>Aktivitas & Detail</span>
            <span>Perusahaan</span>
            <span>Tipe</span>
          </TableHeaderList>
          <TableBody
            isLoadingFetch={isLoading}
            classname="grid-cols-5"
            nextPage={handleNextPage}
            prevPage={handlePrevPage}
            page={page}
            totalPage={totalPage}
            data={dataLogs}
            canEdit={false}
            canAction={false}
            renderItem={(item, i) => {
              const firstText = item.activity_type_category.split("/")[0];
              const convertDate = formatDate(item.timestamp);
              return (
                <>
                  <span>{convertDate}</span>
                  {item.user === null ? (
                    <span>user tidak diketahui</span>
                  ) : (
                    <span>{item?.user?.id}</span>
                  )}
                  {item.activity_description.length > 25 ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setHoverEffect(i)}
                      onMouseLeave={() => setHoverEffect(false)}>
                      {hoverEffect === i && (
                        <div className="transition-all duration-300 fixed left-1/2 top-1/2 -translate-x-1/2 bg-orange-100 rounded-xl p-3 z-50 outline outline-orange-400">
                          {item?.activity_description}
                        </div>
                      )}
                      <span className="z-10">
                        {item?.activity_description.slice(0, 25)}...
                      </span>
                    </div>
                  ) : (
                    <span>{item?.activity_description}</span>
                  )}
                  <span>
                    {item.company === null
                      ? "tidak diketahui"
                      : item?.company?.name}
                  </span>
                  <div>
                    <span
                      className={`uppercase py-2 px-5 rounded-full text-white ${
                        firstText === "Login"
                          ? "bg-[#13D376]"
                          : firstText === "Data"
                          ? "bg-[#DBBE03]"
                          : firstText === "Error"
                          ? "bg-[#DB3726]"
                          : firstText === "Proses "
                          ? "bg-[#1069C9]"
                          : ""
                      }`}>
                      {firstText}
                    </span>
                  </div>
                </>
              );
            }}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default LogAuditPage;
