import {
  Building2,
  ChevronDown,
  ChevronRight,
  CircleUser,
  ClipboardClock,
  EllipsisVertical,
  Files,
  House,
  LogOut,
  MessageCircleMore,
  Trash2,
  UserCog,
  UserPen,
} from "lucide-react";
import Button from "../ui/Button";
import useToggle from "../../store/isOpen";
import logo from "../../../assets/icons/LOGO FIX.svg";
import mascot from "../../../assets/icons/SmartAI-2.png";
import { getCookie, removeCookie } from "../../utils/Cookies";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  deleteConversationApi,
  fetchAllConversation,
} from "../../../features/aiChat/services/aiChat";
import { userIsLoginApi } from "../../../features/auth/services/authApis";
import { Icon } from "@iconify/react";
import { useAuthStore } from "../../store/useCookieAuth";

const Sidebar = () => {
  const { isOpen } = useToggle();
  const location = useLocation();
  const navigate = useNavigate();
  const [visibleIcon, setVisibleIcon] = useState<boolean | string>(false);
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [conversationList, setConversation] = useState([]);
  const [isVisibleConversation, setIsVisibleConversation] = useState(true);
  const [visibleAction, setVisibleAction] = useState(false);
  const [visibleActionProfile, setVisibleActionProfile] = useState(false);
  const { decoded } = useAuthStore();
  const isLogin = decoded.role;
  const initAuth = useAuthStore((state) => state.initAuth);
  const [loginUser, setLoginUser] = useState({
    division: "",
    username: "",
    profile_picture_url: "",
  });

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
  ];

  const navListSuperAdmin = [
    {
      icon: <House size={27} />,
      lable: "Dashboard",
      link: "/superadmin/dashboard",
      category: "Manajemen Klien",
    },
    {
      icon: <Building2  size={27} />,
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
      const confirmation = confirm("yakin ingin keluar?");
      if (confirmation) {
        removeCookie("accesstoken");
        navigate("/");
      }
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
          console.log(res);
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
        try {
          const res = await fetchAllConversation();
          setConversation(res);
        } catch (error) {
          console.log(error);
        }
      };
      fetchConversation();
    }
  }, [isLogin, isLoading]);

  const handleDeleteConversation = async (id: string) => {
    setVisibleAction(true);
    setIsLoading(id);
    try {
      await deleteConversationApi(id);
      alert("conversation berhasil di hapus");
    } catch (error) {
      console.log(error);
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

  console.log(isLogin, "<--- islogin");

  if (isLogin === null || undefined) {
    window.location.reload();
  }

  return (
    <>
      {isLogin === "admin" ? (
        <div
          className={`bg-[#F2F2F2] ${
            isOpen ? "2xl:w-[17%] md:w-[25%]" : "2xl:w-[7%] md:w-[10%]"
          }  h-screen items-center flex flex-col duration-300 py-3 sticky top-0 transition-all`}>
          <div className="flex items-center flex-col gap-8">
            <img className="2xl:size-15 md:size-10" src={logo} alt="" />
            <img className="2xl:size-15 md:size-10" src="/Logo.png" alt="" />
            <div className="flex flex-col items-start 2xl:gap-10 md:gap-5 font-inter">
              {navlist.map((item, i) => (
                <Button
                  key={i}
                  variant="link"
                  classname={`flex items-center gap-3 transition-all duration-300 py-3 px-5 justify-start hover:bg-[#1D8A45] hover:text-white rounded-full underline- ${
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
            !isOpen ? "2xl:w-[20%] md:w-[25%]" : "2xl:w-[7%] md:w-[10%]"
          }  h-screen items-center flex flex-col duration-300 py-3 sticky top-0 transition-all`}>
          <div className="flex items-center flex-col gap-8">
            <div
              className={`flex ${
                isOpen ? "justify-center" : "justify-start"
              }  w-full`}>
              <img className="size-15" src={logo} alt="" />
            </div>
            <div className="flex flex-col gap-2 items-center">
              <img className="size-25" src={mascot} alt="" />
              {isOpen ? "" : <span>Super Admin</span>}
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
                    <span className="border-b border-gray-200"></span>
                  ) : (
                    <p className="text-gray-500 text-sm mb-2">{category}</p>
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
                        ${!isOpen ? "" : "hidden"}
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
          ${!isOpen ? "" : "hidden"}
            `}>
                  Keluar
                </span>
              </Button>
            </div>
          </div>
        </div>
      ) : isLogin === "employee" ? (
        <div className="2xl:w-[17%] md:w-[25%] bg-[#F2F2F2] h-screen flex flex-col justify-between">
          <div className="p-5 flex flex-col gap-4">
            <img src={logo} className="2xl:w-13 md:w-10" alt="" />
            <Button
              variant="secondary"
              onclick={() => navigate("/chat")}
              classname="2xl:px-3 2xl:py-2 md:py-1.5 rounded-full">
              Obrolan Baru
            </Button>
            <button className="text-start 2xl:text-base md:text-sm">
              Cari Obrolan
            </button>
            <div className="flex flex-col gap-2">
              <Button
                classname="flex text-[#666666]"
                variant="link"
                onclick={() =>
                  setIsVisibleConversation(!isVisibleConversation)
                }>
                Obrolan <ChevronDown />
              </Button>

              {isVisibleConversation && (
                <>
                  <div className="flex flex-col gap-2 overflow-auto 2xl:max-h-130 md:max-h-50">
                    {conversationList.map(
                      (conversation: { title: string; id: string }) => (
                        <span
                          className={`text-[#211719] py-2 2xl:text-sm md:text-xs cursor-pointer ${
                            location.pathname.startsWith(
                              `/chat/conversation/${conversation.id}`
                            )
                              ? "bg-[#3BC15240]"
                              : ""
                          }  hover:bg-[#3BC15240]  px-3 rounded-full flex items-center justify-between relative`}
                          onClick={() => handleConversation(conversation.id)}
                          onMouseEnter={() => handleHover(conversation.id)}
                          onMouseLeave={() => handleHover(!visibleIcon)}>
                          {conversation.title}
                          {visibleIcon === conversation.id && (
                            <>
                              <EllipsisVertical
                                onClick={() => setVisibleAction(true)}
                                className="2xl:size-5 md:size-4"
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
                                      onClick={() => setVisibleAction(false)}>
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                        </span>
                      )
                    )}
                  </div>
                </>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-[#666666] text-sm">Dukungan</p>
              <span className="flex text-black px-3 py-2 hover:bg-gray-200 rounded-full 2xl:text-sm md:text-xs">
                Bantuan & FAQ
              </span>
            </div>
          </div>

          <div className="flex w-full flex-col p-3 gap-3">
            {visibleActionProfile && (
              <div
                onMouseLeave={() =>
                  setVisibleActionProfile(!visibleActionProfile)
                }
                className="md:p-1 bg-white 2xl:p-3 flex flex-col items-center gap-1 2xl:rounded-2xl md:rounded-xl text-sm outline outline-gray-200 2xl:static md:absolute md:bottom-21 md:w-62">
                <button className="2xl:p-4 md:p-3 hover:bg-gray-100 w-full 2xl:rounded-xl md:rounded-lg cursor-pointer flex justify-center gap-3 items-center md:text-xs 2xl:text-base">
                  Pusat bantuan & FAQ <ChevronRight size={15} />
                </button>
                <button
                  onClick={logout}
                  className="flex text-[#09976F] items-center justify-center gap-2 2xl:p-4 md:p-3 hover:bg-red-100 w-full 2xl:rounded-xl md:rounded-lg cursor-pointer md:text-xs 2xl:text-base hover:text-red-500">
                  <LogOut size={15} />
                  Keluar
                </button>
              </div>
            )}
            <div
              onClick={() => setVisibleActionProfile(!visibleActionProfile)}
              className="flex gap-3 items-center p-3  rounded-xl hover:bg-[#f7f7f7] hover:outline hover:outline-gray-200 cursor-pointer w-full">
              {!loginUser.profile_picture_url ? (
                <div className="2xl:w-12 2xl:h-12 md:w-9 md:h-9 overflow-hidden flex justify-center rounded-full items-center bg-red-400">
                  <p className="text-white mb-1 uppercase">
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
              <div>
                <span className="md:text-sm 2xl:text-base">
                  {loginUser.username}
                </span>
                <p className="2xl:text-sm md:text-xs text-[#666666]">
                  {loginUser.division}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Sidebar;
