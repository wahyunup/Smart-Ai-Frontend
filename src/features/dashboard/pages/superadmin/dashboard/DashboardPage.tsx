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
import { useAuthStore } from "../../../../../shared/store/useCookieAuth";
import BreakDownCard from "../../../components/admin/BreakDownCard";
import { useEffect, useState } from "react";
import { summaryApi } from "../../../services/superadmin/Dashboard";
import BasicArea from "../../../../../shared/components/common/Chart/LineChart";
import TableHeaderList from "../../../../../shared/components/common/Table/TableHeaderList";
import TableBody from "../../../../../shared/components/common/Table/TableBody";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../../../shared/utils/FormatDate";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [breakdown, setBreakDown] = useState({
    totalClientActive: {
      active_company_admins: 0,
      active_companies_this_month: 0,
    },
    totalUser: {
      total_users: 0,
      user_wow_change_pct: 0,
      user_wow_change_pct_status: "",
    },
    totalDocument: {
      total: 0,
      completed_documents_change_status: "",
      completed: 0,
    },
    chatMonthly: {
      chats_this_month: 0,
      chat_mom_change_pct: 0,
      chat_mom_change_pct_status: "",
    },
  });
  const [isLoadingFetch, setIsLoadingFetch] = useState(false);
  const [dataTable, setDataTable] = useState([]);
  const [dailyChat, setDailyChat] = useState();
  const [companyRegistered, setCompanyRegistered] = useState();
  const { decoded } = useAuthStore();

  useEffect(() => {
    const fetchSummary = async () => {
      setIsLoadingFetch(true);
      try {
        const res = await summaryApi();
        console.log(res);

        const roundPercent = {
          chatPercentase: Math.floor(res.dashboard_summary.chat_mom_change_pct),
          totalUserPercentase: Math.floor(
            res.dashboard_summary.user_wow_change_pct
          ),
        };
        setBreakDown({
          totalClientActive: {
            active_company_admins: res.dashboard_summary.active_company_admins,
            active_companies_this_month:
              res.dashboard_summary.active_companies_this_month,
          },
          chatMonthly: {
            chat_mom_change_pct: roundPercent.chatPercentase,
            chat_mom_change_pct_status:
              res.dashboard_summary.chat_mom_change_pct_status,
            chats_this_month: res.dashboard_summary.chats_this_month,
          },
          totalDocument: {
            completed_documents_change_status:
              res.dashboard_summary.document_distribution
                .completed_documents_change_status,
            completed: res.dashboard_summary.document_distribution.completed,
            total: res.dashboard_summary.document_distribution.total,
          },
          totalUser: {
            total_users: res.dashboard_summary.total_users,
            user_wow_change_pct: roundPercent.totalUserPercentase,
            user_wow_change_pct_status:
              res.dashboard_summary.user_wow_change_pct_status,
          },
        });
        setDailyChat(res.dashboard_summary.daily_chat_counts);
        setDataTable(res.dashboard_summary.top_user_logs);
        setCompanyRegistered(res.dashboard_summary.daily_company_registrations_7d);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoadingFetch(false);
      }
    };
    fetchSummary();
  }, []);

  const chartDataChatDaily = Object.values(dailyChat || {});
  const chartDaysChatDaily = Object.keys(dailyChat || {});

  const chartDataCompanyRegist = Object.values(companyRegistered || {})
  const chartDaysCompanyRegist = Object.keys(companyRegistered || {})

  const daysChatDaily = chartDaysChatDaily.map((t) => {
    const date = new Date(t);
    const namaHari = date.toLocaleDateString("id-ID", { day: "numeric" });
    return namaHari;
  });

  const daysCompanyRegist = chartDaysCompanyRegist.map((t) => {
    const date = new Date(t);
    const namaHari = date.toLocaleDateString("id-ID", { day: "numeric" });
    return namaHari;
  });


  return (
    <MainLayout>
      <div className="p-10">
        <div>
          <h1 className="2xl:text-2xl md:text-xl">
            Selamat Datang Kembali, {decoded.name}!
          </h1>
          <p className="text-[#666666] 2xl:text-base md:text-sm">
            Ringkasan kinerja sistem SMART AI secara keseluruhan (Global
            Monitoring).
          </p>
        </div>
        <div className="flex gap-3 mt-8">
          <BreakDownCard
            icon={
              <div className="p-4 bg-[#3BC152]/20 rounded-full">
                <Building2 color="#004D38" size={25} />
              </div>
            }
            count={breakdown.totalClientActive.active_company_admins}
            statCount={
              <>
                <span className="text-[#09976F] flex items-center gap-1">
                  <TrendingUp size={15} />
                  {breakdown.totalClientActive.active_companies_this_month}
                </span>
                klien aktif bulan ini
              </>
            }
            title="Total Klien Aktif"
          />
          <BreakDownCard
            icon={
              <div className="p-4 bg-[#003F91]/20 rounded-full">
                <Users color="#003F91" size={25} />
              </div>
            }
            count={breakdown.totalUser.total_users}
            statCount={
              <>
                {breakdown.totalUser.user_wow_change_pct_status === "flat" ? (
                  <span className="text-gray-400 flex items-center gap-1">
                    <span className="text-2xl">~</span>
                    {breakdown.totalUser.user_wow_change_pct}%
                  </span>
                ) : breakdown.totalUser.user_wow_change_pct_status === "up" ? (
                  <span className="text-[#09976F] flex items-center gap-1">
                    <TrendingUp size={15} />
                    {breakdown.totalUser.user_wow_change_pct}%
                  </span>
                ) : breakdown.totalUser.user_wow_change_pct_status ===
                  "down" ? (
                  <span className="text-red-500 flex items-center gap-1">
                    <TrendingDown size={15} />
                    {breakdown.totalUser.user_wow_change_pct}%
                  </span>
                ) : null}
                {breakdown.totalUser.user_wow_change_pct_status === "up" ? (
                  <p> Naik dari minggu lalu</p>
                ) : breakdown.totalUser.user_wow_change_pct_status ===
                  "down" ? (
                  <p> Turun dari minggu lalu</p>
                ) : breakdown.totalUser.user_wow_change_pct_status ===
                  "flat" ? (
                  <p> belum ada perubahan</p>
                ) : null}
              </>
            }
            title="Total Pengguna"
          />
          <BreakDownCard
            icon={
              <div className="p-4 bg-[#0DB575]/20 rounded-full">
                <LibraryBig color="#0DB575" size={25} />
              </div>
            }
            count={breakdown.totalDocument.total}
            statCount={
              <>
                {breakdown.totalDocument.completed_documents_change_status ===
                "up" ? (
                  <>
                    <div className="flex gap-1 items-center text-[#09976F]">
                      <TrendingUp size={15} />
                      <span>{breakdown.totalDocument.completed}</span>
                      Dok.
                    </div>
                    <span>berhasil diproses</span>
                  </>
                ) : breakdown.totalDocument
                    .completed_documents_change_status === "down" ? (
                  <>
                    <div className="flex gap-1 items-center text-red-400">
                      <TrendingDown size={15} />
                      <span>{breakdown.totalDocument.completed}</span>
                      Dok.
                    </div>
                    <span>berhasil diproses</span>
                  </>
                ) : breakdown.totalDocument
                    .completed_documents_change_status === "flat" ? (
                  <>
                    <div className="flex gap-1 items-center text-gray-400">
                      <span className="text-2xl">~</span>
                      <span>{breakdown.totalDocument.completed}</span>
                      Dok.
                    </div>
                    <span>berhasil diproses</span>
                  </>
                ) : null}
              </>
            }
            title="Sumber Data Tersedia"
          />
          <BreakDownCard
            icon={
              <div className="p-4 bg-[#DBBE03]/20 rounded-full">
                <MessagesSquare color="#DBBE03" size={25} />
              </div>
            }
            count={breakdown.chatMonthly.chats_this_month}
            statCount={
              <>
                {breakdown.chatMonthly.chat_mom_change_pct_status === "flat" ? (
                  <span className="text-gray-400 flex items-center gap-1">
                    <span className="text-2xl">~</span>
                    {breakdown.chatMonthly.chat_mom_change_pct}%
                  </span>
                ) : breakdown.chatMonthly.chat_mom_change_pct_status ===
                  "up" ? (
                  <span className="text-[#09976F] flex items-center gap-1">
                    <TrendingUp size={15} />
                    {breakdown.chatMonthly.chat_mom_change_pct}%
                  </span>
                ) : breakdown.chatMonthly.chat_mom_change_pct_status ===
                  "down" ? (
                  <span className="text-red-500 flex items-center gap-1">
                    <TrendingDown size={15} />
                    {breakdown.chatMonthly.chat_mom_change_pct}%
                  </span>
                ) : null}
                Rendah dari bulan lalu
              </>
            }
            title="Pertanyaan Bulan Ini"
          />
        </div>
        {/* chart */}
        <div className="flex mt-7 gap-5">
          <BasicArea
            heading="Tren Pertanyaan Chatbot (Harian)"
            color="#4379EE"
            datas={chartDataChatDaily.map(Number)}
            days={daysChatDaily.map(String)}
          />
          <BasicArea
            heading="Statistik Pendaftaran Perusahaan (Mingguan)"
            color="#2BA54B"
            datas={chartDataCompanyRegist.map(Number)}
            days={daysCompanyRegist.map(String)}
          />
        </div>
        {/* table */}
        <div className="mt-10 bg-white p-10 shadow-2xl rounded-3xl">
          <h1 className="2xl:text-2xl md:text-xl">
            Aktivitas Penting Sistem Terbaru
          </h1>
          <div className=" overflow-hidden rounded-2xl mt-5">
            <TableHeaderList classname="grid-cols-5 bg-[#E3F9E8]">
              <span>Waktu (Timestamp)</span>
              <span>ID Aktor</span>
              <span>Aktivitas & Detail</span>
              <span>Perusahaan</span>
              <span>Tipe</span>
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
                    <span className="text-center">{convertDate}</span>
                    {item.user_id == null ? (
                      <span className="text-center">user tidak diketahui</span>
                    ) : (
                      <span className="text-center">{item.user_id}</span>
                    )}
                    <span className="text-center">
                      {item.activity_description}
                    </span>
                    {item.company_name === null ? (
                      <span className="text-center">
                        perusahaan tidak ditemukan
                      </span>
                    ) : (
                      <span className="text-center">{item.company_name}</span>
                    )}
                    <div>
                      <span
                        className={`uppercase py-2 px-5 rounded-full text-white ${
                          typeText === "Login"
                            ? "bg-[#13D376]"
                            : typeText === "Data"
                            ? "bg-[#DBBE03]"
                            : typeText === "Error"
                            ? "bg-[#DB3726]"
                            : typeText === "Proses "
                            ? "bg-[#1069C9]"
                            : ""
                        }`}>
                        {typeText}
                      </span>
                    </div>
                  </>
                );
              }}
            />
            <div className="flex justify-end mt-3">
              <button
                onClick={() => navigate("/superadmin/log-audit")}
                className="flex items-center gap-2 hover:gap-4 transition-all duration-300 cursor-pointer font-semibold text-[#126F3D]">
                Lihat Semua Log & Aktivitas <CircleArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
