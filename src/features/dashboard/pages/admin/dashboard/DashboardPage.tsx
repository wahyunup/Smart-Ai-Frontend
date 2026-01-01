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
import { useEffect, useState } from "react";
import { SummaryApi } from "../../../services/admin/Dashboard";
import BasicArea from "../../../../../shared/components/common/Chart/LineChart";
import TableHeaderList from "../../../../../shared/components/common/Table/TableHeaderList";
import TableBody from "../../../../../shared/components/common/Table/TableBody";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../../../shared/store/useCookieAuth";
import { statUserCompanyApi } from "../../../../auth/services/authApis";
import Swal from "sweetalert2";
import { formatDate } from "../../../../../shared/utils/FormatDate";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [documentSummary, setDocumentSummary] = useState({
    completed_documents: 0,
    failed_documents: 0,
    processing_documents: 0,
    total_documents: 0,
    document_uploads_this_month: 0,
  });
  const [chatActivity, setChatActivity] = useState();
  const [chatBotActivity, setChatBotActivity] = useState();
  const [isLoadingFetch, setIsLoadingFetch] = useState(false);
  const [recentDocuments, setRecentDocuments] = useState([]);
  const { decoded } = useAuthStore();

  useEffect(() => {
    setIsLoadingFetch(true);
    const fetchSummary = async () => {
      try {
        const res = await SummaryApi();
        setDocumentSummary({
          completed_documents:
            res.dashboard_breakdown.document_summary.completed_documents,
          failed_documents:
            res.dashboard_breakdown.document_summary.failed_documents,
          processing_documents:
            res.dashboard_breakdown.document_summary.processing_documents,
          total_documents:
            res.dashboard_breakdown.document_summary.total_documents,
          document_uploads_this_month:
            res.dashboard_breakdown.document_uploads_this_month,
        });
        setRecentDocuments(res.dashboard_breakdown.recent_documents);
        setChatBotActivity(res.dashboard_breakdown.chat_activity_7d);
        setChatActivity(res.dashboard_breakdown.chat_activity_30d);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoadingFetch(false);
      }
    };
    fetchSummary();
  }, []);

  const dataChartWeekly = Object.values(chatBotActivity || {});
  const tanggal = Object.keys(chatBotActivity || {});
  const days = tanggal.map((t) => {
    const date = new Date(t);
    const namaHari = date.toLocaleDateString("id-ID", { weekday: "long" });
    return namaHari;
  });

  useEffect(() => {
    const fetchStatCompany = async () => {
      try {
        const res = await statUserCompanyApi();
        if (res.address === null || res.logo_s3_path === null) {
          Swal.fire({
            text: "lengkapi data perusahaan terlebih dahulu",
            icon: "info",
            confirmButtonText: "oke",
            confirmButtonColor: "#2BA54B",
            buttonsStyling: true,
            customClass: {
              confirmButton: "primary-button",
            },
          }).then(async (response) => {
            if (response.isConfirmed) {
              navigate("/auth/fill-biodata");
            }
          });

          return;
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchStatCompany();
  }, []);

  const dataChartMonthly = Object.values(chatActivity || {});
  const month = Object.keys(chatActivity || {}).map(
    (date) => date.split("-")[2]
  );

  return (
    <MainLayout>
      <div className="p-10">
        <p className="2xl:text-xl">
          Selamat Datang {decoded.name}, Admin {decoded.company}!
        </p>
        {/* breakdown */}
        <div className="mt-10 flex w-full gap-5">
          <BreakDownCard
            count={documentSummary.total_documents}
            title="Total Sumber Data"
            icon={
              <div className="p-4 bg-[#3BC152]/20 rounded-full">
                <FolderClosed color="#3BC152" size={25} />
              </div>
            }
            statCount={
              <>
                <span className="text-green-600 flex items-center gap-2">
                  <TrendingUp size={15} />
                  {documentSummary.document_uploads_this_month}
                </span>
                <span className="text-[#606060]">Unggahan Bulan Ini</span>
              </>
            }
          />
          <BreakDownCard
            count={documentSummary.processing_documents}
            title="Sedang Diproses"
            icon={
              <div className="p-4 bg-[#4496DE]/20 rounded-full">
                <ClockFading color="#4496DE" size={25} />
              </div>
            }
            statCount={
              <>
                <span className="text-[#1069C9]">Sisa Dalam Antrian</span>
              </>
            }
          />
          <BreakDownCard
            count={documentSummary.completed_documents}
            title="Dokumen Siap Jawab"
            icon={
              <div className="p-4 bg-[#3BC152]/15 rounded-full">
                <CircleCheck color="#3BC152" size={25} />
              </div>
            }
            statCount={
              <>
                <span className="text-[#0DB575]">Kesiapan Chatbot</span>
              </>
            }
          />
          <BreakDownCard
            count={documentSummary.failed_documents}
            title="Dokumen Gagal Proses"
            icon={
              <div className="p-4 bg-[#DB3726]/20 rounded-full">
                <CircleAlert color="#DB3726" size={25} />
              </div>
            }
            statCount={
              <>
                <span className="text-[#DB3726]">Perlu Diperbaiki</span>
              </>
            }
          />
        </div>
        {/* chart */}
        <div className="flex mt-10 gap-5">
          <BasicArea
            color="#22c55e"
            datas={dataChartWeekly.map(Number)}
            days={days.map(String)}
            heading="Pola Penggunaan Chatbot (Mingguan)"
          />
          <BasicArea
            color="#1069C9"
            datas={dataChartMonthly.map(Number)}
            days={month.map(String)}
            heading="Tren Pengguna Aktif Chatbot (30 Hari)"
          />
        </div>
        {/* table aktifitas dokumen */}
        <div className="bg-white p-5 rounded-2xl mt-10 flex flex-col gap-5 shadow-[0_10px_20px_rgba(0,0,0,0.10)]">
          <p className="text-2xl">Aktivitas Dokumen Terbaru</p>
          <div className=" rounded-2xl overflow-hidden">
            <TableHeaderList classname="grid-cols-3 bg-[#E3F9E8] text-[#126F3D] ">
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
                    <span>{item.title}</span>
                    {item.status === "COMPLETED" ? (
                      <div>
                        <span className="py-2 px-4 rounded-full bg-[#00AA58] text-white text-sm w-fit">
                          {item.status}
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                    <span>
                      {convertDate ? convertDate : "belum ada update"}
                    </span>
                  </>
                );
              }}
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => navigate("/admin/manage-documents")}
              className="flex items-center gap-2 hover:gap-4 transition-all duration-300 cursor-pointer font-semibold text-[#126F3D]">
              Lihat Semua Log & Aktivitas <CircleArrowRight />
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
