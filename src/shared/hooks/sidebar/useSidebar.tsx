import Swal from "sweetalert2";
import { deleteConversationApi, fetchAllConversation, planStatusApi } from "../../../features/aiChat/services/aiChat";
import { countDownDate, formatDate } from "../../utils/FormatDate";
import { useEffect, useRef, useState } from "react";
import { userIsLoginApi } from "../../../features/auth/services/authApis";
import { getCookie, removeCookie } from "../../utils/Cookies";
import { useAuthStore } from "../../store/useCookieAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useToggle from "../../store/isOpen";

export const useSidebar = () => {
      const { isOpen, setIsOpen } = useToggle();
  const location = useLocation();
  const navigate = useNavigate();
  const [isVisiblePlan, setIsVisiblePlan] = useState(false);
  const [visibleIcon, setVisibleIcon] = useState<boolean | string>(false);
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [conversationList, setConversationList] = useState<any[]>([]);
  const [conversationListSearch, setConversationListSearch] = useState<any>([]);
  const [isVisibleConversation, setIsVisibleConversation] = useState(true);
  const [visibleAction, setVisibleAction] = useState(false);
  const [visibleSearchConversation, setVisibleSearchConversation] =
    useState(false);
  const [visibleActionProfile, setVisibleActionProfile] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const { decoded } = useAuthStore();
  const isLogin = decoded.role;
  const companyImage = decoded.logo_s3_path;
  const initAuth = useAuthStore((state) => state.initAuth);
  const hideTimer = useRef<any>(null);
  const [limit, setLimit] = useState(10);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const contentOverlayRef = useRef<HTMLDivElement | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [value, setValue] = useState("");
  const [planStatus, setPlanStatus] = useState({
    plan_name: "",
    current_question_quota: 0,
    total_question_quota: 0,
    current_doc_quota: 0,
    total_doc_quota: 0,
    current_users_quota: 0,
    total_users_quota: 0,
    exp_date: "",
    cd_exp_plan: 0,
    remaining_documents_percentage: 0,
    remaining_quota_percentage: 0,
    remaining_users_percentage: 0,
  });
  const [isloadingScroll, setIsLoadingScroll] = useState(false);
  const [loginUser, setLoginUser] = useState({
    division: "",
    username: "",
    profile_picture_url: "",
  });

  const handleInfinitScroll = () => {
    const el = contentRef.current;
    const ov = contentOverlayRef.current;

    const target = visibleSearchConversation ? ov : el;
    if (!target) return;

    const scrollBottom = target.scrollTop + target.clientHeight;

    if (scrollBottom >= target.scrollHeight) {
      if (hasMore && !isloadingScroll) {
        setLimit((prev) => prev + 5);
      }
    }
  };

  const handleEnter = () => {
    clearTimeout(hideTimer.current);
    setIsHidden(true);
  };

  const handleLeave = () => {
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      setIsHidden(false);
    }, 100);
  };

  const handlePlanStatusApi = async () => {
    try {
      const res = await planStatusApi();
      const dateExpired = formatDate(res.end_date);
      const countDown = countDownDate(res.end_date);
      const roundedQuestionQuotaPercentage = Math.floor(
        res.remaining_quota_percentage
      );
      const roundedDocQuotaPercentage = Math.floor(
        res.remaining_documents_percentage
      );

      const roundedUserQuotaPercentage = Math.floor(
        res.remaining_users_percentage
      );

      setPlanStatus({
        exp_date: dateExpired,
        cd_exp_plan: countDown,
        current_doc_quota: res.current_documents,
        current_question_quota: res.remaining_quota,
        current_users_quota: res.current_users,
        plan_name: res.plan_name,
        total_doc_quota: res.document_quota,
        total_question_quota: res.total_quota,
        total_users_quota: res.max_users,
        remaining_documents_percentage: roundedDocQuotaPercentage,
        remaining_users_percentage: roundedUserQuotaPercentage,
        remaining_quota_percentage: roundedQuestionQuotaPercentage,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    const token = getCookie("accesstoken");

    if (token) {
      Swal.fire({
        text: "yakin ingin keluar?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "Batal",
        confirmButtonColor: "#DB3726",
        cancelButtonColor: "#F2F2F2",
        buttonsStyling: true,
        customClass: {
          confirmButton: "danger-button",
          cancelButton: "disable-button",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          removeCookie("accesstoken");
          navigate("/");
          setIsOpen();
        }
      });
    }
  };

  const handleHover = (id: boolean | string) => {
    setVisibleIcon(id);
    if (!isLoading) {
      setVisibleAction(false);
    }
  };

  useEffect(() => {
    initAuth();
  }, []);

  useEffect(() => {
    if (isLogin === "employee") {
      const fetchUserIsLogin = async () => {
        try {
          const res = await userIsLoginApi();
          if (res) {
            setLoginUser({
              division: res.division,
              profile_picture_url: res.profile_picture_url,
              username: res.username,
            });
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchUserIsLogin();
    }
  }, [isLogin]);

  useEffect(() => {
    if (isLogin === "employee") {
      const fetchConversation = async () => {
        setIsLoadingScroll(true);
        try {
          const res = await fetchAllConversation(limit, value);
          const conversationWithDate = res.conversations.map(
            (conv: { created_at: string }) => ({
              ...conv,
              convertDate: formatDate(conv.created_at),
            })
          );
          setConversationList(res.conversations);
          setConversationListSearch(conversationWithDate);
          if (res.conversations.length < limit) {
            setHasMore(false);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoadingScroll(false);
        }
      };
      fetchConversation();
    }
  }, [isLogin, isLoading, limit, value]);

  const handleDeleteConversation = async (id: string) => {
    setVisibleAction(true);
    setIsLoading(id);
    try {
      await deleteConversationApi(id);
      Swal.fire({
        text: "ingin menghapus conversation??",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "Batal",
        confirmButtonColor: "#DB3726",
        cancelButtonColor: "#F2F2F2",
        buttonsStyling: true,
        customClass: {
          confirmButton: "danger-button",
          cancelButton: "disable-button",
        },
      }).then((response) => {
        if (response.isConfirmed) {
          Swal.fire({
            text: "conversation berhasil di hapus",
            icon: "success",
            confirmButtonText: "oke",
            confirmButtonColor: "#2BA54B",
            buttonsStyling: true,
            customClass: {
              confirmButton: "primary-button",
            },
          });
        }
      });
    } catch (error: any) {
      Swal.fire({
        text: error.response.data.message,
        icon: "error",
        confirmButtonText: "oke",
        confirmButtonColor: "#DB3726",
        buttonsStyling: true,
        customClass: {
          confirmButton: "danger-button",
        },
      });
    } finally {
      setIsLoading(null);
      setVisibleAction(false);
    }
  };

  const handleNavigate = (link: string) => {
    navigate(link);
  };

  const handleConversation = (conversation_id: string) => {
    navigate(`/chat/conversation/${conversation_id}`);
  };

  if (isLogin === null || undefined) {
    window.location.reload();
  }
return {
isLogin,
isOpen,
setIsOpen,
isVisiblePlan,
visibleIcon,
isLoading,
conversationList,
conversationListSearch,
isVisibleConversation,
visibleAction,
visibleSearchConversation,
visibleActionProfile,
isHidden,
planStatus,
loginUser,
contentRef,
contentOverlayRef,
handleInfinitScroll,
handleEnter,
handleLeave,
handlePlanStatusApi,
logout,
handleHover,
handleDeleteConversation,
handleNavigate,
handleConversation,
companyImage,
navigate,
setIsVisibleConversation,
setVisibleAction,
isloadingScroll,
setVisibleSearchConversation,
setIsVisiblePlan,
setVisibleActionProfile,
setValue,
value,
location
}
}