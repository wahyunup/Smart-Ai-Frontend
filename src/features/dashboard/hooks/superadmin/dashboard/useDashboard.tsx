import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../../../shared/store/useCookieAuth";
import { summaryApi } from "../../../services/superadmin/Dashboard";

export const useDashboardSuperadmin = () => {
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
        setCompanyRegistered(
          res.dashboard_summary.daily_company_registrations_7d
        );
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

  const chartDataCompanyRegist = Object.values(companyRegistered || {});
  const chartDaysCompanyRegist = Object.keys(companyRegistered || {});

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
  return {
    decoded,
    navigate,
    breakdown,
    isLoadingFetch,
    dataTable,
    chartDataChatDaily,
    daysChatDaily,
    chartDataCompanyRegist,
    daysCompanyRegist,
  };
};
