import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../../../shared/store/useCookieAuth";
import { SummaryApi } from "../../../services/admin/Dashboard";
import { statUserCompanyApi } from "../../../../auth/services/authApis";
import Swal from "sweetalert2";

export const useDashboardAdmin = () => {
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

  return {
    documentSummary,
    recentDocuments,
    decoded,
    dataChartWeekly,
    days,
    dataChartMonthly,
    month,
    isLoadingFetch,
    navigate
  };
};
