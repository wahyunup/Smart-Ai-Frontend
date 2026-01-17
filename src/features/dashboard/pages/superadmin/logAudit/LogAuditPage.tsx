import Input from "../../../../../shared/components/ui/Input";
import MainLayout from "../../../../../shared/layouts/MainLayout";
import TableHeaderList from "../../../../../shared/components/common/Table/TableHeaderList";
import TableBody from "../../../../../shared/components/common/Table/TableBody";
import Button from "../../../../../shared/components/ui/Button";
import { formatDate } from "../../../../../shared/utils/FormatDate";
import { useLogAudit } from "../../../hooks/superadmin/logAudit/useLogAudit";
const LogAuditPage = () => {
  const {
    companyList,
    dataLogs,
    exportCsv,
    handleOnChange,
    handleFilter,
    filter,
    type,
    handleNextPage,
    handlePrevPage,
    hoverEffect,
    isLoading,
    page,
    setHoverEffect,
    totalPage,
  } = useLogAudit();

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
              {companyList.map((item: { company_name: string; company_id: number }) => (
                <option
                  className="h-10 overflow-auto"
                  key={item.company_id}
                  value={item.company_id}>
                  {item.company_name}
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
