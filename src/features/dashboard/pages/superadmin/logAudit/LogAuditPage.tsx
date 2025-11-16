import React, { useEffect, useState } from "react";
import Input from "../../../../../shared/components/ui/Input";
import MainLayout from "../../../../../shared/layouts/MainLayout";
import {
  companyListAuditApi,
  logAuditApi,
  typeActivityApi,
} from "../../../services/superadmin/LogAudit";
import TableHeaderList from "../../../../../shared/components/common/Table/TableHeaderList";
import TableBody from "../../../../../shared/components/common/Table/TableBody";
import { useSearchParams } from "react-router-dom";
import Button from "../../../../../shared/components/ui/Button";

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
    date: 0,
    company: "",
    type: "",
  });

  const fetchLogAudit = async () => {
    setIsLoading(true);
    try {
      const res = await logAuditApi(page, 4);
      setDataLogs(res.logs);
      setTotalPage(res.total_pages);
      setPage(res.current_page);
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCompanyLogAudit = async () => {
    try {
      const res = await companyListAuditApi();
      setCompanyList(res);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTypeActivity = async () => {
    try {
      const res = await typeActivityApi();
      setType(res.categories);
      console.log(res.categories);
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
    fetchLogAudit();
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
    // const companyId = Number(filter.company);
    
    await logAuditApi(page, 4, 1, filter.type, filter.date);
  };

  return (
    <MainLayout>
      <div className="p-10">
        <div className="flex gap-2 flex-col">
          <h1 className="text-4xl font-semibold">Audit Log & Aktivitas</h1>
          <p className="text-xl">
            Melacak semua aktivitas penting sistem, transaksi data, dan
            kegagalan
          </p>
        </div>

        <div className="mt-10 flex gap-10 items-center">
          <Input
            type="date"
            onchange={handleOnChange}
            value={filter.date}
            variant="secondary"
            iconPosition="left"
            label="Filter Tanggal"
            labelLayout="inline"
            htmlFor="date"
            name="date"
          />
          <div className="flex items-center h-full w-full">
            <label
              htmlFor="filtercompany"
              className="font-semibold 2xl:text-md md:text-sm">
              Filter Perusahaan
            </label>
            <select
              name="company"
              id="company"
              value={filter.company}
              onChange={handleOnChange}
              className="outline w-full p-3 rounded-xl outline-gray-400 h-full">
              <option value="">Semua perusahaan</option>
              {companyList.map((item: { name: string; id: number }) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center h-full w-full">
            <label
              htmlFor="filtercompany"
              className="font-semibold 2xl:text-md md:text-sm">
              Filter Tipe Aktivitas:
            </label>
            <select
              name="type"
              id="type"
              value={filter.type}
              onChange={handleOnChange}
              className="outline w-full p-3 rounded-xl outline-gray-400">
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
            classname="px-7 rounded-xl ">
            Terapkan Filter
          </Button>
        </div>

        <div className="border border-[#B2B2B2] rounded-2xl overflow-hidden mt-10">
          <TableHeaderList classname="grid-cols-5 bg-[#E3F9E8]">
            <span>waktu</span>
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
              console.log(firstText);
              return (
                <>
                  <span>{item?.timestamp}</span>
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
