import {
  CircleAlert,
  CircleArrowRight,
  CircleCheck,
  ClockFading,
  FolderClosed,
  TrendingUp,
} from "lucide-react";
import MainLayout from "../../../../../shared/layouts/MainLayout";
import BreakDownCard from "../../../components/admin/BreakDownCard";
import BasicArea from "../../../../../shared/components/common/Chart/LineChart";
import TableHeaderList from "../../../../../shared/components/common/Table/TableHeaderList";
import TableBody from "../../../../../shared/components/common/Table/TableBody";
import { formatDate } from "../../../../../shared/utils/FormatDate";
import { useDashboardAdmin } from "../../../hooks";

export const DashboardAdminPage = () => {
  const {
    documentSummary,
    recentDocuments,
    dataChartMonthly,
    dataChartWeekly,
    days,
    decoded,
    isLoadingFetch,
    month,
    navigate,
  } = useDashboardAdmin();

  return (
    <MainLayout>
      <div className="p-10">
        {/* ── Welcome ── */}
        <p className="font-dm text-[#6B8C80] 2xl:text-base md:text-sm mb-8">
          Selamat Datang{" "}
          <span className="text-[#E8F4F0] font-medium">{decoded.name}</span>,
          Admin{" "}
          <span className="text-[#16FF6E] font-medium">{decoded.company}</span>!
        </p>

        {/* ── Breakdown cards ── */}
        <div className="flex w-full gap-4 mb-8">
          <BreakDownCard
            count={documentSummary.total_documents}
            title="Total Sumber Data"
            icon={<FolderClosed size={20} />}
            statCount={
              <>
                <span className="text-[#16FF6E] flex items-center gap-1">
                  <TrendingUp size={13} />
                  {documentSummary.document_uploads_this_month}
                </span>
                <span className="text-[#6B8C80]">Unggahan Bulan Ini</span>
              </>
            }
          />
          <BreakDownCard
            count={documentSummary.processing_documents}
            title="Sedang Diproses"
            icon={<ClockFading size={20} />}
            statCount={
              <span className="text-blue-400">Sisa Dalam Antrian</span>
            }
          />
          <BreakDownCard
            count={documentSummary.completed_documents}
            title="Dokumen Siap Jawab"
            icon={<CircleCheck size={20} />}
            statCount={<span className="text-[#16FF6E]">Kesiapan Chatbot</span>}
          />
          <BreakDownCard
            count={documentSummary.failed_documents}
            title="Dokumen Gagal Proses"
            icon={<CircleAlert size={20} />}
            statCount={<span className="text-red-400">Perlu Diperbaiki</span>}
          />
        </div>

        {/* ── Charts ── */}
        <div className="flex gap-5 mb-8">
          <BasicArea
            color="#16FF6E"
            datas={dataChartWeekly.map(Number)}
            days={days.map(String)}
            heading="Pola Penggunaan Chatbot (Mingguan)"
          />
          <BasicArea
            color="#4BFFB8"
            datas={dataChartMonthly.map(Number)}
            days={month.map(String)}
            heading="Tren Pengguna Aktif Chatbot (30 Hari)"
          />
        </div>

        {/* ── Recent documents table ── */}
        <div
          className="relative bg-[#0A1A20] border border-[#16FF6E]/[.07]
                      p-6 rounded-[20px] flex flex-col gap-5 overflow-hidden"
        >
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#16FF6E]/20 to-transparent" />

          <h2 className="font-syne font-bold text-white text-xl">
            Aktivitas Dokumen Terbaru
          </h2>

          <div className="rounded-[14px] overflow-hidden border border-[#16FF6E]/[.07]">
            <TableHeaderList classname="grid-cols-3">
              <span>Judul</span>
              <span>Status</span>
              <span>Terakhir Diperbarui</span>
            </TableHeaderList>
            <TableBody
              isLoadingFetch={isLoadingFetch}
              classname="grid-cols-3"
              data={recentDocuments}
              canAction={false}
              renderItem={(item) => {
                const convertDate = formatDate(item.updated_at);
                return (
                  <>
                    <span className="font-dm text-[#E8F4F0] text-sm">
                      {item.title}
                    </span>
                    {item.status === "COMPLETED" ? (
                      <div>
                        <span
                          className="font-dm font-medium text-xs uppercase
                                     px-4 py-1.5 rounded-full
                                     bg-[#16FF6E]/10 text-[#16FF6E] border border-[#16FF6E]/20"
                        >
                          {item.status}
                        </span>
                      </div>
                    ) : (
                      <span className="font-dm text-[#6B8C80] text-sm">—</span>
                    )}
                    <span className="font-dm text-[#6B8C80] text-sm">
                      {convertDate ? convertDate : "Belum ada update"}
                    </span>
                  </>
                );
              }}
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => navigate("/admin/manage-documents")}
              className="group flex items-center gap-2 font-dm font-medium text-sm
                         text-[#6B8C80] hover:text-[#16FF6E] transition-colors duration-200"
            >
              Lihat Semua Log & Aktivitas
              <CircleArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
