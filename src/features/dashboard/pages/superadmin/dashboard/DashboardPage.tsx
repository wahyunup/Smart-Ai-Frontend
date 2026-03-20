import {
  Building2,
  CircleArrowRight,
  LibraryBig,
  MessagesSquare,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import MainLayout from "../../../../../shared/layouts/MainLayout";
import BreakDownCard from "../../../components/admin/BreakDownCard";
import BasicArea from "../../../../../shared/components/common/Chart/LineChart";
import TableHeaderList from "../../../../../shared/components/common/Table/TableHeaderList";
import TableBody from "../../../../../shared/components/common/Table/TableBody";
import { formatDate } from "../../../../../shared/utils/FormatDate";
import { useDashboardSuperadmin } from "../../../hooks";

export const DashboardSuperadminPage = () => {
  const {
    breakdown,
    chartDataChatDaily,
    chartDataCompanyRegist,
    dataTable,
    daysChatDaily,
    daysCompanyRegist,
    decoded,
    isLoadingFetch,
  } = useDashboardSuperadmin();

  return (
    <MainLayout>
      <div className="p-10">
        {/* ── Page header ── */}
        <div className="mb-8">
          <h1 className="font-syne font-extrabold text-white 2xl:text-2xl md:text-xl">
            Selamat Datang Kembali, {decoded.name}!
          </h1>
          <p className="font-dm text-[#6B8C80] 2xl:text-base md:text-sm mt-1">
            Ringkasan kinerja sistem SMART AI secara keseluruhan (Global
            Monitoring).
          </p>
        </div>

        {/* ── Breakdown cards ── */}
        <div className="flex gap-4 mt-8">
          <BreakDownCard
            icon={<Building2 size={22} />}
            count={breakdown.totalClientActive.active_company_admins}
            statCount={
              <>
                <span className="text-[#16FF6E] flex items-center gap-1">
                  <TrendingUp size={13} />
                  {breakdown.totalClientActive.active_companies_this_month}
                </span>
                <span className="text-[#6B8C80]">klien aktif bulan ini</span>
              </>
            }
            title="Total Klien Aktif"
          />
          <BreakDownCard
            icon={<Users size={22} />}
            count={breakdown.totalUser.total_users}
            statCount={
              <>
                {breakdown.totalUser.user_wow_change_pct_status === "flat" ? (
                  <span className="text-[#6B8C80] flex items-center gap-1">
                    <span className="text-xl">~</span>
                    {breakdown.totalUser.user_wow_change_pct}%
                  </span>
                ) : breakdown.totalUser.user_wow_change_pct_status === "up" ? (
                  <span className="text-[#16FF6E] flex items-center gap-1">
                    <TrendingUp size={13} />
                    {breakdown.totalUser.user_wow_change_pct}%
                  </span>
                ) : breakdown.totalUser.user_wow_change_pct_status ===
                  "down" ? (
                  <span className="text-red-400 flex items-center gap-1">
                    <TrendingDown size={13} />
                    {breakdown.totalUser.user_wow_change_pct}%
                  </span>
                ) : null}
                {breakdown.totalUser.user_wow_change_pct_status === "up" ? (
                  <span className="text-[#6B8C80]">Naik dari minggu lalu</span>
                ) : breakdown.totalUser.user_wow_change_pct_status ===
                  "down" ? (
                  <span className="text-[#6B8C80]">Turun dari minggu lalu</span>
                ) : breakdown.totalUser.user_wow_change_pct_status ===
                  "flat" ? (
                  <span className="text-[#6B8C80]">Belum ada perubahan</span>
                ) : null}
              </>
            }
            title="Total Pengguna"
          />
          <BreakDownCard
            icon={<LibraryBig size={22} />}
            count={breakdown.totalDocument.total}
            statCount={
              <>
                {breakdown.totalDocument.completed_documents_change_status ===
                "up" ? (
                  <>
                    <div className="flex gap-1 items-center text-[#16FF6E]">
                      <TrendingUp size={13} />
                      <span>{breakdown.totalDocument.completed}</span> Dok.
                    </div>
                    <span className="text-[#6B8C80]">berhasil diproses</span>
                  </>
                ) : breakdown.totalDocument
                    .completed_documents_change_status === "down" ? (
                  <>
                    <div className="flex gap-1 items-center text-red-400">
                      <TrendingDown size={13} />
                      <span>{breakdown.totalDocument.completed}</span> Dok.
                    </div>
                    <span className="text-[#6B8C80]">berhasil diproses</span>
                  </>
                ) : breakdown.totalDocument
                    .completed_documents_change_status === "flat" ? (
                  <>
                    <div className="flex gap-1 items-center text-[#6B8C80]">
                      <span className="text-xl">~</span>
                      <span>{breakdown.totalDocument.completed}</span> Dok.
                    </div>
                    <span className="text-[#6B8C80]">berhasil diproses</span>
                  </>
                ) : null}
              </>
            }
            title="Sumber Data Tersedia"
          />
          <BreakDownCard
            icon={<MessagesSquare size={22} />}
            count={breakdown.chatMonthly.chats_this_month}
            statCount={
              <>
                {breakdown.chatMonthly.chat_mom_change_pct_status === "flat" ? (
                  <span className="text-[#6B8C80] flex items-center gap-1">
                    <span className="text-xl">~</span>
                    {breakdown.chatMonthly.chat_mom_change_pct}%
                  </span>
                ) : breakdown.chatMonthly.chat_mom_change_pct_status ===
                  "up" ? (
                  <span className="text-[#16FF6E] flex items-center gap-1">
                    <TrendingUp size={13} />
                    {breakdown.chatMonthly.chat_mom_change_pct}%
                  </span>
                ) : breakdown.chatMonthly.chat_mom_change_pct_status ===
                  "down" ? (
                  <span className="text-red-400 flex items-center gap-1">
                    <TrendingDown size={13} />
                    {breakdown.chatMonthly.chat_mom_change_pct}%
                  </span>
                ) : null}
                <span className="text-[#6B8C80]">dari bulan lalu</span>
              </>
            }
            title="Pertanyaan Bulan Ini"
          />
        </div>

        {/* ── Charts ── */}
        <div className="flex mt-7 gap-5">
          <BasicArea
            heading="Tren Pertanyaan Chatbot (Harian)"
            color="#16FF6E"
            datas={chartDataChatDaily.map(Number)}
            days={daysChatDaily.map(String)}
          />
          <BasicArea
            heading="Statistik Pendaftaran Perusahaan (Mingguan)"
            color="#4BFFB8"
            datas={chartDataCompanyRegist.map(Number)}
            days={daysCompanyRegist.map(String)}
          />
        </div>

        {/* ── Activity table ── */}
        <div
          className="mt-10 bg-[#0A1A20] border border-[#16FF6E]/[.07]
                      rounded-[20px] p-8 relative overflow-hidden"
        >
          {/* shimmer top line */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#16FF6E]/20 to-transparent" />

          <h2 className="font-syne font-bold text-white 2xl:text-xl md:text-lg mb-5">
            Aktivitas Penting Sistem Terbaru
          </h2>

          <div className="overflow-hidden rounded-[14px] border border-[#16FF6E]/[.07]">
            <TableHeaderList classname="grid-cols-5 bg-[#16FF6E]/[.05]">
              <span className="font-dm text-[#6B8C80] text-xs uppercase tracking-wider">
                Waktu (Timestamp)
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
              classname="grid-cols-5"
              data={dataTable}
              isLoadingFetch={isLoadingFetch}
              canAction={false}
              renderItem={(item) => {
                const typeText = item.activity_type_category.split("/")[0];
                const convertDate = formatDate(item.timestamp, true);
                return (
                  <>
                    <span className="font-dm text-[#6B8C80] text-center text-sm">
                      {convertDate}
                    </span>
                    {item.user_id == null ? (
                      <span className="font-dm text-[#6B8C80]/50 text-center text-sm italic">
                        tidak diketahui
                      </span>
                    ) : (
                      <span className="font-dm text-[#E8F4F0] text-center text-sm">
                        {item.user_id}
                      </span>
                    )}
                    <span className="font-dm text-[#6B8C80] text-center text-sm">
                      {item.activity_description}
                    </span>
                    {item.company_name === null ? (
                      <span className="font-dm text-[#6B8C80]/50 text-center text-sm italic">
                        tidak ditemukan
                      </span>
                    ) : (
                      <span className="font-dm text-[#E8F4F0] text-center text-sm">
                        {item.company_name}
                      </span>
                    )}
                    <div className="flex justify-center">
                      <span
                        className={`font-dm font-medium text-xs uppercase px-4 py-1.5 rounded-full ${
                          typeText === "Login"
                            ? "bg-[#16FF6E]/10 text-[#16FF6E] border border-[#16FF6E]/20"
                            : typeText === "Data"
                              ? "bg-yellow-400/10 text-yellow-400 border border-yellow-400/20"
                              : typeText === "Error"
                                ? "bg-red-500/10 text-red-400 border border-red-500/20"
                                : typeText === "Proses "
                                  ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                  : "bg-white/5 text-[#6B8C80] border border-white/10"
                        }`}
                      >
                        {typeText}
                      </span>
                    </div>
                  </>
                );
              }}
            />
            <div className="flex justify-end mt-3 px-4 pb-3">
              <button className="group flex items-center gap-2 font-dm font-medium text-sm text-[#6B8C80] hover:text-[#16FF6E] transition-colors duration-200">
                Lihat Semua Log & Aktivitas
                <CircleArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
