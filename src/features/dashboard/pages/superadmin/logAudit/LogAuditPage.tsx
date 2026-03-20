import Input from "../../../../../shared/components/ui/Input";
import MainLayout from "../../../../../shared/layouts/MainLayout";
import TableHeaderList from "../../../../../shared/components/common/Table/TableHeaderList";
import TableBody from "../../../../../shared/components/common/Table/TableBody";
import Button from "../../../../../shared/components/ui/Button";
import { formatDate } from "../../../../../shared/utils/FormatDate";
import { useLogAudit } from "../../../hooks";

export const LogAuditPage = () => {
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
        {/* ── Page header ── */}
        <div className="flex justify-between items-end mb-10">
          <div className="flex gap-2 flex-col">
            <h1 className="font-syne font-extrabold text-white 2xl:text-2xl md:text-xl">
              Audit Log & Aktivitas
            </h1>
            <p className="font-dm text-[#6B8C80] 2xl:text-base md:text-sm">
              Melacak semua aktivitas penting sistem, transaksi data, dan
              kegagalan
            </p>
          </div>
          <Button
            onclick={exportCsv}
            variant="info"
            classname="2xl:px-8 2xl:py-3 md:px-5 md:py-2.5 rounded-[10px] font-dm font-medium h-fit"
          >
            Export CSV
          </Button>
        </div>

        {/* ── Filters ── */}
        <div
          className="bg-[#0A1A20] border border-[#16FF6E]/[.07] rounded-[20px]
                      p-6 flex flex-wrap gap-6 items-end mb-8 relative overflow-hidden"
        >
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#16FF6E]/15 to-transparent" />

          <Input
            type="date"
            onchange={handleOnChange}
            value={filter.dateStart}
            variant="primary"
            iconPosition="left"
            label="Tanggal Awal"
            labelLayout="inline"
            htmlFor="dateStart"
            name="dateStart"
          />
          <Input
            type="date"
            onchange={handleOnChange}
            value={filter.dateEnd}
            variant="primary"
            iconPosition="left"
            label="Tanggal Akhir"
            labelLayout="inline"
            htmlFor="dateEnd"
            name="dateEnd"
          />

          {/* Company select */}
          <div className="flex flex-col gap-2 flex-1">
            <label className="font-dm font-medium text-[#6B8C80] md:text-xs 2xl:text-sm">
              Filter Perusahaan
            </label>
            <select
              name="company"
              id="company"
              value={filter.company}
              onChange={handleOnChange}
              className="w-full px-4 py-3 rounded-[10px]
                         bg-[#0D1F27] border border-[#16FF6E]/[.10]
                         font-dm text-[#E8F4F0] text-sm
                         outline-none
                         focus:border-[#16FF6E]/40
                         focus:shadow-[0_0_0_3px_rgba(22,255,110,0.07)]
                         transition-all duration-200
                         [&>option]:bg-[#0D1F27]"
            >
              <option value="">Semua perusahaan</option>
              {companyList.map(
                (item: { company_name: string; company_id: number }) => (
                  <option key={item.company_id} value={item.company_id}>
                    {item.company_name}
                  </option>
                ),
              )}
            </select>
          </div>

          {/* Type select */}
          <div className="flex flex-col gap-2 flex-1">
            <label className="font-dm font-medium text-[#6B8C80] md:text-xs 2xl:text-sm">
              Filter Tipe Aktivitas
            </label>
            <select
              name="type"
              id="type"
              value={filter.type}
              onChange={handleOnChange}
              className="w-full px-4 py-3 rounded-[10px]
                         bg-[#0D1F27] border border-[#16FF6E]/[.10]
                         font-dm text-[#E8F4F0] text-sm
                         outline-none
                         focus:border-[#16FF6E]/40
                         focus:shadow-[0_0_0_3px_rgba(22,255,110,0.07)]
                         transition-all duration-200
                         [&>option]:bg-[#0D1F27]"
            >
              <option value="">Semua Tipe</option>
              {type.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <Button
            onclick={handleFilter}
            variant="primary"
            classname="group px-6 py-3 rounded-[10px] flex items-center gap-2"
          >
            Terapkan Filter
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Button>
        </div>

        {/* ── Table ── */}
        <div className="bg-[#0A1A20] border border-[#16FF6E]/[.07] rounded-[20px] overflow-hidden relative">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#16FF6E]/20 to-transparent" />
          <TableHeaderList classname="grid-cols-5 bg-[#16FF6E]/[.05]">
            <span className="font-dm text-[#6B8C80] text-xs uppercase tracking-wider">
              Waktu
            </span>
            <span className="font-dm text-[#6B8C80] text-xs uppercase tracking-wider">
              ID Aktor
            </span>
            <span className="font-dm text-[#6B8C80] text-xs uppercase tracking-wider">
              Aktivitas & Detail
            </span>
            <span className="font-dm text-[#6B8C80] text-xs uppercase tracking-wider">
              Perusahaan
            </span>
            <span className="font-dm text-[#6B8C80] text-xs uppercase tracking-wider">
              Tipe
            </span>
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
                  <span className="font-dm text-[#6B8C80] text-sm">
                    {convertDate}
                  </span>
                  {item.user === null ? (
                    <span className="font-dm text-[#6B8C80]/50 text-sm italic">
                      tidak diketahui
                    </span>
                  ) : (
                    <span className="font-dm text-[#E8F4F0] text-sm">
                      {item?.user?.id}
                    </span>
                  )}
                  {item.activity_description.length > 25 ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setHoverEffect(i)}
                      onMouseLeave={() => setHoverEffect(false)}
                    >
                      {hoverEffect === i && (
                        <div
                          className="transition-all duration-300 fixed left-1/2 top-1/2 -translate-x-1/2
                                      bg-[#0A1A20] border border-[#16FF6E]/20 rounded-[14px] p-4 z-50
                                      font-dm text-[#E8F4F0] text-sm shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
                        >
                          {item?.activity_description}
                        </div>
                      )}
                      <span className="font-dm text-[#6B8C80] text-sm">
                        {item?.activity_description.slice(0, 25)}...
                      </span>
                    </div>
                  ) : (
                    <span className="font-dm text-[#6B8C80] text-sm">
                      {item?.activity_description}
                    </span>
                  )}
                  <span className="font-dm text-[#E8F4F0] text-sm">
                    {item.company === null
                      ? "tidak diketahui"
                      : item?.company?.name}
                  </span>
                  <div>
                    <span
                      className={`font-dm font-medium text-xs uppercase px-4 py-1.5 rounded-full ${
                        firstText === "Login"
                          ? "bg-[#16FF6E]/10 text-[#16FF6E] border border-[#16FF6E]/20"
                          : firstText === "Data"
                            ? "bg-yellow-400/10 text-yellow-400 border border-yellow-400/20"
                            : firstText === "Error"
                              ? "bg-red-500/10 text-red-400 border border-red-500/20"
                              : firstText === "Proses "
                                ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                : "bg-white/5 text-[#6B8C80] border border-white/10"
                      }`}
                    >
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
