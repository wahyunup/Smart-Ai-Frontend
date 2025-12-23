import {
  Building2,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  CircleUser,
  ClipboardClock,
  Ellipsis,
  Files,
  House,
  LogOut,
  Menu,
  MessageCircleMore,
  PanelLeftClose,
  Search,
  SquarePen,
  Trash2,
  UserCog,
  UserPen,
  X,
} from "lucide-react";
import Button from "../ui/Button";
import useToggle from "../../store/isOpen";
import logo from "../../../assets/icons/LOGO FIX.svg";
import mascot from "../../../assets/icons/SmartAI-2.png";
import { getCookie, removeCookie } from "../../utils/Cookies";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  deleteConversationApi,
  fetchAllConversation,
} from "../../../features/aiChat/services/aiChat";
import { userIsLoginApi } from "../../../features/auth/services/authApis";
import { Icon } from "@iconify/react";
import { useAuthStore } from "../../store/useCookieAuth";
import Swal from "sweetalert2";
import { formatDate } from "../../utils/FormatDate";

const Sidebar = () => {
  const { isOpen, setIsOpen } = useToggle();
  const location = useLocation();
  const navigate = useNavigate();
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
  const [isloadingScroll, setIsLoadingScroll] = useState(false);
  const [loginUser, setLoginUser] = useState({
    division: "",
    username: "",
    profile_picture_url: "",
  });

  const isLocalhost = window.location.hostname === "localhost";

  const handleInfinitScroll = () => {
    const el = contentRef.current;
    const ov = contentOverlayRef.current;

    const target = visibleSearchConversation ? ov : el;
    if (!target) return;

    const scrollBottom = target.scrollTop + target.clientHeight;

    if (scrollBottom >= target.scrollHeight - 10) {
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

  const navlist = [
    {
      icon: <House className="2xl:size-[27px] md:size-[24px]" />,
      lable: "Dashboard",
      link: "/admin/dashboard",
    },
    {
      icon: <Files className="2xl:size-[27px] md:size-[24px]" />,
      lable: "Kelola Dokumen",
      link: "/admin/manage-documents",
    },
    {
      icon: <MessageCircleMore className="2xl:size-[27px] md:size-[24px]" />,
      lable: "Log Chat/Riwayat",
      link: "/admin/chat-log",
    },
    {
      icon: <UserCog className="2xl:size-[27px] md:size-[24px]" />,
      lable: "Kelola Staff",
      link: "/admin/manage-staff",
    },
    {
      icon: <CircleUser className="2xl:size-[27px] md:size-[24px]" />,
      lable: "Profil Perusahaan",
      link: "/admin/company-profile",
    },
    {
      icon: <CircleDollarSign className="2xl:size-[27px] md:size-[24px]" />,
      lable: "Subcription",
      link: "/admin/subcription",
    },
  ];

  const navListSuperAdmin = [
    {
      icon: <House size={27} />,
      lable: "Dashboard",
      link: "/superadmin/dashboard",
      category: "Manajemen Klien",
    },
    {
      icon: <Building2 size={27} />,
      lable: "Kelola Perusahaan",
      link: "/superadmin/manage-company",
      category: "Manajemen Klien",
    },
    {
      icon: <UserPen size={27} />,
      lable: "Kelola Admin Perusahaan",
      link: "/superadmin/manage-admin-company",
      category: "Manajemen Klien",
    },
    {
      icon: <CircleDollarSign size={27} />,
      lable: "Manajemen Transaksi",
      link: "/superadmin/manage-transaction",
      category: "Manajemen Klien",
    },
    {
      icon: <ClipboardClock size={27} />,
      lable: "Audit Log & Aktivitas",
      link: "/superadmin/log-audit",
      category: "Sistem & Keamanan",
    },
    {
      icon: <UserCog size={27} />,
      lable: "Pengaturan Sistem Dasar",
      link: "/superadmin/settings",
      category: "Sistem & Keamanan",
    },
  ];

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
  console.log(conversationList, "conv list");

  return (
    <>
      {isLogin === "admin" ? (
        <div
          className={`bg-[#F2F2F2] ${
            isOpen ? "2xl:w-[17%] md:w-[25%]" : "2xl:w-[7%] md:w-[10%]"
          }  h-screen items-center flex flex-col duration-300 py-3 sticky top-0 transition-all`}>
          <div className="flex items-center flex-col gap-8">
            <img className="2xl:size-15 md:size-10" src={logo} alt="" />
            <img
              className="2xl:w-23 h-fit"
              src={`${
                isLocalhost
                  ? `https://145.79.15.190${companyImage}`
                  : companyImage
              }`}
              alt=""
            />
            <div className="flex flex-col items-start gap-5 font-inter">
              {navlist.map((item, i) => (
                <Button
                  key={i}
                  variant="link"
                  classname={`flex items-center gap-3 transition-all duration-300 py-3 px-5 justify-start hover:bg-[#1D8A45] w-full hover:text-white rounded-full underline- ${
                    location.pathname.startsWith(item.link)
                      ? " bg-[#1D8A45] text-white rounded-full"
                      : ""
                  }`}
                  onclick={() => handleNavigate(item.link)}>
                  {item.icon}
                  <span
                    className={` font-medium
          ${isOpen ? "" : "hidden"}
            `}>
                    {item.lable}
                  </span>
                </Button>
              ))}

              <Button
                variant="link"
                classname="flex items-center gap-3 text-red-500 py-3 px-5"
                onclick={logout}>
                <LogOut size={27} />
                <span
                  className={` font-medium
          ${isOpen ? "" : "hidden"}
            `}>
                  Keluar
                </span>
              </Button>
            </div>
          </div>
        </div>
      ) : isLogin == "super_admin" ? (
        <div
          className={`bg-[#F2F2F2] ${
            isOpen ? "2xl:w-[20%] md:w-[25%]" : "2xl:w-[7%] md:w-[10%]"
          }  h-screen items-center flex flex-col duration-300 py-3 sticky top-0 transition-all`}>
          <div className="flex items-center flex-col gap-8">
            <div
              className={`flex ${
                isOpen ? "justify-start" : " justify-center"
              }  w-full`}>
              <img className="size-15" src={logo} alt="" />
            </div>
            <div className="flex flex-col gap-2 items-center">
              <img className="size-25" src={mascot} alt="" />
              {isOpen ? <span>Super Admin</span> : ""}
            </div>

            <div className="flex flex-col items-start gap-5 font-inter">
              {Object.entries(
                navListSuperAdmin.reduce((acc, item) => {
                  if (!acc[item.category]) acc[item.category] = [];
                  acc[item.category].push(item);
                  return acc;
                }, {} as Record<string, typeof navListSuperAdmin>)
              ).map(([category, items]) => (
                <div key={category} className="flex flex-col gap-2">
                  {isOpen ? (
                    <p className="text-gray-500 text-sm mb-2">{category}</p>
                  ) : (
                    <span className="border-b border-gray-200"></span>
                  )}
                  {items.map((item, i) => (
                    <Button
                      key={i}
                      variant="link"
                      classname={`flex w-full items-center gap-3 transition-all duration-300 py-3 px-5 justify-start hover:bg-[#1D8A45] hover:text-white rounded-full underline- ${
                        location.pathname.startsWith(item.link)
                          ? " bg-[#1D8A45] text-white rounded-full"
                          : ""
                      }`}
                      onclick={() => navigate(item.link)}>
                      {item.icon}
                      <span
                        className={` font-medium
                        ${isOpen ? "" : "hidden"}
                        `}>
                        {item.lable}
                      </span>
                    </Button>
                  ))}
                </div>
              ))}

              <Button
                variant="link"
                classname="flex items-center gap-3 text-red-500 py-3 px-5"
                onclick={logout}>
                <LogOut size={27} />
                <span
                  className={` font-medium
          ${isOpen ? "" : "hidden"}
            `}>
                  Keluar
                </span>
              </Button>
            </div>
          </div>
        </div>
      ) : isLogin === "employee" ? (
        <>
          {/* desktop */}
          <div
            className={`${
              isOpen ? "2xl:w-80 md:w-70" : "w-[5%]"
            } bg-white border-r top-0 md:flex flex-col ${
              location.pathname === "/chat" ? "fixed h-screen" : "sticky h-screen"
            } z-10 justify-between hidden`}>
            <div
              className={`p-5 flex flex-col gap-4 w-full ${
                isOpen ? "" : "items-center"
              } `}>
              <div className="flex items-center justify-between">
                {isOpen ? (
                  <img src={logo} className="2xl:w-13 md:w-10" alt="" />
                ) : (
                  <>
                    <div>
                      <img
                        onMouseEnter={handleEnter}
                        onMouseLeave={handleLeave}
                        src={logo}
                        className={`w-10  ${isHidden ? "hidden" : ""}`}
                        alt=""
                      />
                    </div>
                    <div onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
                      <button
                        onClick={() => setIsOpen()}
                        className={`cursor-pointer transition-all duration-700  ${
                          isHidden ? "" : "hidden"
                        }`}>
                        <PanelLeftClose
                          color="#126F3D"
                          className="size-[34px]"
                        />
                      </button>
                    </div>
                  </>
                )}
                {isOpen && (
                  <button
                    onClick={() => setIsOpen()}
                    className="cursor-pointer">
                    <PanelLeftClose color="#126F3D" size={28} />
                  </button>
                )}
              </div>
              {isOpen ? (
                <>
                  <Button
                    variant="secondary"
                    onclick={() => navigate("/chat")}
                    classname="2xl:px-3 2xl:py-2 md:py-1.5 rounded-full">
                    Obrolan Baru
                  </Button>
                  <Button
                    onclick={() => setVisibleSearchConversation(true)}
                    variant="link"
                    classname="text-start 2xl:text-base md:text-sm">
                    Cari Obrolan
                  </Button>

                  <div className="flex flex-col gap-2 w-full">
                    <Button
                      classname="flex text-[#666666]"
                      variant="link"
                      onclick={() =>
                        setIsVisibleConversation(!isVisibleConversation)
                      }>
                      Obrolan <ChevronDown />
                    </Button>

                    {isVisibleConversation && (
                      <div
                        ref={contentRef}
                        onScroll={handleInfinitScroll}
                        className="flex flex-col gap-2 overflow-auto 2xl:max-h-[35vh] md:max-h-[30vh]">
                        {conversationList.map(
                          (conversation: { title: string; id: string }) => (
                            <div
                              className={`text-[#211719]  2xl:text-sm md:text-xs cursor-pointer w-full ${
                                location.pathname.startsWith(
                                  `/chat/conversation/${conversation.id}`
                                )
                                  ? "bg-[#3BC15240]"
                                  : ""
                              }  hover:bg-[#3BC15240] px-5 min-h-12 rounded-full flex items-center justify-between`}
                              onClick={() =>
                                handleConversation(conversation.id)
                              }
                              onMouseEnter={() => handleHover(conversation.id)}
                              onMouseLeave={() => handleHover(!visibleIcon)}>
                              <span className="w-full overflow-hidden truncate">
                                {conversation.title}
                              </span>
                              {visibleIcon === conversation.id && (
                                <>
                                  <Ellipsis
                                    onClick={() => setVisibleAction(true)}
                                    className="2xl:size-8 md:size-6"
                                    color="#1D8A45"
                                  />
                                  {visibleAction && (
                                    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-xs z-10">
                                      <div className="bg-[#f7f7f7] p-1.5 w-50 top-[37px] flex flex-col gap-2 z-50 rounded-xl outline outline-gray-300">
                                        {isLoading ? (
                                          <div className="p-3 bg-red-100 rounded-xl flex justify-center">
                                            <Icon
                                              icon="line-md:loading-loop"
                                              width="20"
                                              height="20"
                                              color="#DB3726"
                                            />
                                          </div>
                                        ) : (
                                          <button
                                            className="flex items-center px-14 text-sm gap-2 hover:bg-red-100 p-3 rounded-lg cursor-pointer w-full"
                                            onClick={() =>
                                              handleDeleteConversation(
                                                conversation.id
                                              )
                                            }>
                                            <Trash2 size={17} color="#DB3726" />
                                            <p>Delete</p>
                                          </button>
                                        )}
                                        <button
                                          className="px-1.5 py-3 hover:bg-gray-200 w-full rounded-xl cursor-pointer"
                                          onClick={() =>
                                            setVisibleAction(false)
                                          }>
                                          Cancel
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                </>
                              )}
                            </div>
                          )
                        )}

                        {isloadingScroll && (
                          <div className="flex justify-center">
                            <Icon
                              icon="line-md:loading-loop"
                              width="24"
                              height="24"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="text-[#666666] text-sm">Dukungan</p>
                    <Button
                      onclick={() => navigate("/chat/faq")}
                      variant="link"
                      classname={`flex text-black px-5 py-3 hover:bg-gray-200 ${
                        location.pathname.startsWith("/chat/faq")
                          ? "bg-gray-200"
                          : ""
                      } rounded-full 2xl:text-sm md:text-xs`}>
                      Bantuan & FAQ
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-10 mt-5">
                  <button
                    className="cursor-pointer"
                    onClick={() => navigate("/chat")}>
                    <SquarePen color="#126F3D" />
                  </button>
                  <button
                    onClick={() => setVisibleSearchConversation(true)}
                    className="cursor-pointer">
                    <Search color="#126F3D" />
                  </button>
                </div>
              )}
            </div>

            <div className="p-3 absolute md:bottom-18 w-full">
              {visibleActionProfile && (
                <div
                  onMouseLeave={() =>
                    setVisibleActionProfile(!visibleActionProfile)
                  }
                  className="md:p-1 bg-white flex flex-col items-center gap-1 2xl:rounded-2xl md:rounded-xl text-sm outline outline-gray-200  ">
                  <button className="2xl:p-4 md:p-3 hover:bg-gray-100 w-full 2xl:rounded-xl md:rounded-lg cursor-pointer flex justify-center gap-3 items-center md:text-xs 2xl:text-sm">
                    Pusat bantuan & FAQ <ChevronRight size={15} />
                  </button>
                  <button
                    onClick={logout}
                    className="flex text-[#09976F] items-center justify-center gap-2 2xl:p-4 md:p-3 hover:bg-red-100 w-full 2xl:rounded-xl md:rounded-lg cursor-pointer md:text-xs 2xl:text-sm hover:text-red-500">
                    <LogOut size={15} />
                    Keluar
                  </button>
                </div>
              )}
            </div>

            <div className="flex w-full flex-col p-3 gap-3">
              <div
                onClick={() => setVisibleActionProfile(!visibleActionProfile)}
                className="flex gap-3 items-center p-3  rounded-xl hover:bg-[#f7f7f7] hover:outline hover:outline-gray-200 cursor-pointer w-full">
                {!loginUser.profile_picture_url ? (
                  <div className="2xl:w-12 2xl:h-12 md:w-9 md:h-9 overflow-hidden flex justify-center rounded-full items-center bg-[#3BC15240]">
                    <p className="text-[#1D8A45] mb-1 uppercase">
                      {loginUser.username.slice(0, 1)}
                    </p>
                  </div>
                ) : (
                  <div className="w-12 h-12 md:w-9 md:h-9 overflow-hidden flex justify-center rounded-full items-center bg-gray-300">
                    <img
                      className="w-12"
                      src={loginUser.profile_picture_url}
                      alt="profile-picture"
                    />
                  </div>
                )}
                <div className={`${isOpen ? "" : "hidden"}`}>
                  <span className="md:text-sm 2xl:text-base">
                    {loginUser.username}
                  </span>
                  <p className="2xl:text-sm md:text-xs text-[#666666]">
                    {loginUser.division}
                  </p>
                </div>
              </div>
            </div>

            {/* overlay search */}
            {visibleSearchConversation && (
              <div className="fixed inset-0 flex justify-center items-center">
                <div className="bg-white absolute rounded-2xl w-200 border">
                  <div className="flex justify-between p-4 border-b">
                    <input
                      placeholder="Cari Obrolan..."
                      onChange={(e) => setValue(e.target.value)}
                      value={value}
                      className=" font-inter placeholder:text-[#B2B2B2] outline-0 w-full"
                    />
                    <X
                      color="#B2B2B2"
                      size={20}
                      onClick={() => setVisibleSearchConversation(false)}
                      className="cursor-pointer"
                    />
                  </div>

                  <div className="px-4 pt-7 flex flex-col gap-7">
                    <button
                      className="flex items-center gap-2 font-medium cursor-pointer"
                      onClick={() => {
                        navigate("/chat");
                        setIsOpen();
                        setVisibleSearchConversation(false);
                      }}>
                      <SquarePen size={20} color="#2F2F2F" />
                      <span className="font-inter text-[#2F2F2F]">
                        Chat Baru
                      </span>
                    </button>

                    <div
                      ref={contentOverlayRef}
                      onScroll={handleInfinitScroll}
                      className="flex flex-col gap-1 h-100 overflow-auto">
                      {conversationListSearch.map(
                        (
                          conv: {
                            title: string;
                            convertDate: string;
                            id: number;
                          },
                          i: number
                        ) => {
                          const prevDate =
                            conversationListSearch[i - 1]?.convertDate;

                          const isSameDate = conv.convertDate === prevDate;

                          return (
                            <div key={conv.id} className="flex flex-col gap-1">
                              {!isSameDate && (
                                <p className="text-xs text-[#B2B2B2]">
                                  {conv.convertDate}
                                </p>
                              )}

                              <button
                                className="text-sm text-start hover:bg-gray-50 py-3 px-4 rounded-xl cursor-pointer"
                                onClick={() => {
                                  setVisibleSearchConversation(false);
                                  navigate(`/chat/conversation/${conv.id}`);
                                }}>
                                {conv.title}
                              </button>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                </div>
                <div className="bg-black/10 w-full h-full"></div>
              </div>
            )}
          </div>

          {/* mobile */}
          {isOpen ? (
            <>
            <div
              className={` md:bg-[#F2F2F2] border-r bg-white h-full fixed z-10 md:hidden w-[80%] p-3 flex flex-col justify-between`}>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                  <img src={logo} alt="" className="w-10" />
                  <button onClick={() => setIsOpen()}>
                    <X />
                  </button>
                </div>
                <div className="flex rounded-full outline px-3 py-1.5 gap-2 items-center">
                  <Search color="#126F3D"/>
                  <input
                    type="text"
                    className="outline-0 w-full"
                    placeholder="Cari"
                  />
                </div>
                <Button
                  onclick={() => navigate("/chat")}
                  variant="secondary"
                  classname="py-2 rounded-full">
                  Chat Baru
                </Button>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() =>
                      setIsVisibleConversation(!isVisibleConversation)
                    }
                    className="flex text-sm items-center gap-1 text-[#888888]">
                    <span>Obrolan</span>
                    <ChevronDown size={20} />
                  </button>
                  {isVisibleConversation && (
                    <div
                      ref={contentRef}
                      onScroll={handleInfinitScroll}
                      className="flex flex-col gap-2 h-70 overflow-auto ">
                      {conversationList.map((conv) => (
                        <div className=" flex justify-between items-center px-3 active:bg-gray-100 rounded-xl">
                          <span
                            onClick={() => {
                              navigate(`/chat/conversation/${conv.id}`),
                                setIsOpen();
                            }}
                            className="text-start py-3 text-sm truncate w-full font-medium font-inter">
                            {conv.title}
                          </span>
                          <Ellipsis size={33} color="#1D8A45"/>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-red-100">
                <button onClick={logout}>logout</button>
              </div>
            </div>
            <div className="bg-black/10 fixed inset-0 z-1"></div>
            </>
          ) : (
            <button
              onClick={() => setIsOpen()}
              className="bg-transparent fixed p-5 md:hidden z-10">
              <Menu size={25} />
            </button>
          )}
        </>
      ) : null}
    </>
  );
};

export default Sidebar;
