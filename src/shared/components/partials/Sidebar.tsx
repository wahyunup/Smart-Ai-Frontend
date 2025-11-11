import {
  ChevronDown,
  ChevronRight,
  CircleUser,
  EllipsisVertical,
  Files,
  House,
  LogOut,
  MessageCircleMore,
  Trash2,
  UserCog,
} from "lucide-react";
import Button from "../ui/Button";
import useToggle from "../../store/isOpen";
import logo from "../../../assets/icons/LOGO FIX.svg";
import mascot from "../../../assets/icons/SmartAI-2.png";
import { getCookie, removeCookie } from "../../utils/Cookies";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { decodeJwt } from "../../utils/Decode";
import {
  deleteConversationApi,
  fetchAllConversation,
} from "../../../features/aiChat/services/aiChat";
import { userIsLoginApi } from "../../../features/auth/services/authApis";
import { Icon } from "@iconify/react";

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
  const [role, setRole] = useState({
    role: "",
  });
  const [loginUser, setLoginUser] = useState({
    division: "",
    username: "",
    profile_picture_url: "",
  });

  const navlist = [
    {
      icon: <House size={27} />,
      lable: "Dashboard",
      link: "/admin/dashboard",
    },
    {
      icon: <Files size={27} />,
      lable: "Kelola Dokumen",
      link: "/admin/manage-documents",
    },
    {
      icon: <MessageCircleMore size={27} />,
      lable: "Log Chat/Riwayat",
      link: "/admin/chat-log",
    },
    {
      icon: <UserCog size={27} />,
      lable: "Kelola Staff",
      link: "/admin/manage-staff",
    },
    {
      icon: <CircleUser size={27} />,
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
      icon: <Files size={27} />,
      lable: "Kelola Perusahaan",
      link: "/superadmin/manage-company",
      category: "Manajemen Klien",
    },
    {
      icon: <MessageCircleMore size={27} />,
      lable: "Kelola Admin Perusahaan",
      link: "/superadmin/manage-company-admin",
      category: "Manajemen Klien",
    },
    {
      icon: <UserCog size={27} />,
      lable: "Audit Log & Aktivitas",
      link: "/superadmin/log-audit",
      category: "Sistem & Keamanan",
    },
    {
      icon: <CircleUser size={27} />,
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
        window.location.reload();
      }
    }
  };

  useEffect(() => {
    const getToken = getCookie("accesstoken");
    if (getToken) {
      const decode = decodeJwt(getToken);
      console.log(decode);

      setRole({
        role: decode.role,
      });
    }
  }, []);

  const handleHover = (id: boolean | string) => {
    setVisibleIcon(id);
    if (!isLoading) {
      setVisibleAction(false);
    }
  };

  useEffect(() => {
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
  }, [role.role]);

  useEffect(() => {
    if (role.role === "employee") {
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
  }, [role.role]);

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
    }
  };

  const handleConversation = (conversation_id: string) => {
    navigate(`/chat/conversation/${conversation_id}`);
  };
  return (
    <>
      {role.role === "admin" ? (
        <div
          className={`bg-[#F2F2F2] ${
            isOpen ? "2xl:w-[17%] md:w-[25%]" : "2xl:w-[7%] md:w-[10%]"
          }  h-screen items-center flex flex-col duration-300 py-3 sticky top-0 transition-all`}>
          <div className="flex items-center flex-col gap-8">
            <img className="size-15" src={logo} alt="" />
            <img className="size-15" src="/Logo.png" alt="" />
            <div className="flex flex-col items-start gap-10 font-inter">
              {navlist.map((item, i) => (
                <Button
                  key={i}
                  variant="link"
                  classname={`flex items-center gap-3 transition-all duration-300 py-3 px-5 justify-start hover:bg-[#1D8A45] hover:text-white rounded-full underline- ${
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
      ) : role.role === "super_admin" ? (
        <div
          className={`bg-[#F2F2F2] ${
            !isOpen ? "2xl:w-[20%] md:w-[25%]" : "2xl:w-[7%] md:w-[10%]"
          }  h-screen items-center flex flex-col duration-300 py-3 sticky top-0 transition-all`}>
          <div className="flex items-center flex-col gap-8">
            <div className={`flex ${isOpen ? "justify-center" :"justify-start"}  w-full`}>
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
      ) : (
        <>
          <div className="2xl:w-[17%] md:w-[25%] bg-[#F2F2F2] h-screen flex flex-col justify-between">
            <div className="p-5 flex flex-col gap-4">
              <img src={logo} className="w-13" alt="" />
              <Button
                variant="secondary"
                onclick={() => navigate("/chat")}
                classname="px-3 py-2 text-sm rounded-full">
                Obrolan Baru
              </Button>
              <p>Cari Obrolan</p>
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
                    <div className="flex flex-col gap-2 overflow-auto max-h-130">
                      {conversationList.map(
                        (conversation: { title: string; id: string }) => (
                          <span
                            className={`text-[#211719] text-sm cursor-pointer ${
                              location.pathname.startsWith(
                                `/chat/conversation/${conversation.id}`
                              )
                                ? "bg-[#3BC15240]"
                                : ""
                            }  hover:bg-[#3BC15240] py-2 px-3 rounded-full flex items-center justify-between relative`}
                            onClick={() => handleConversation(conversation.id)}
                            onMouseEnter={() => handleHover(conversation.id)}
                            onMouseLeave={() => handleHover(!visibleIcon)}>
                            {conversation.title}
                            {visibleIcon === conversation.id && (
                              <>
                                <EllipsisVertical
                                  onClick={() => setVisibleAction(true)}
                                  className="size-5"
                                  color="#1D8A45"
                                />
                                {visibleAction && (
                                  <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-xs z-10">
                                    <div className="bg-[#f7f7f7] p-1.5 w-50 top-[37px] right-2 z-50 rounded-xl outline outline-gray-300">
                                      {isLoading ? (
                                        <div className="p-3 bg-red-100 rounded-xl">
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
                <span className="flex text-black px-3 py-2 hover:bg-gray-200 rounded-full text-sm">
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
                  className=" bg-white p-3 flex flex-col items-center gap-1 rounded-2xl text-sm outline outline-gray-200">
                  <button className="py-4 hover:bg-gray-100 w-full rounded-xl cursor-pointer flex justify-center gap-3 items-center">
                    Pusat bantuan & FAQ <ChevronRight size={15} />
                  </button>
                  <button
                    onClick={logout}
                    className="flex text-[#09976F] items-center justify-center gap-2 py-4 hover:bg-red-100 w-full rounded-xl cursor-pointer hover:text-red-500">
                    <LogOut size={15} />
                    Keluar
                  </button>
                </div>
              )}
              <div
                onClick={() => setVisibleActionProfile(!visibleActionProfile)}
                className="flex gap-3 items-center p-3  rounded-xl hover:bg-[#f7f7f7] hover:outline hover:outline-gray-200 cursor-pointer w-full">
                {!loginUser.profile_picture_url ? (
                  <div className="w-12 h-12 overflow-hidden flex justify-center rounded-full items-center bg-red-400">
                    <p className="text-white mb-1 uppercase">
                      {loginUser.username.slice(0, 1)}
                    </p>
                  </div>
                ) : (
                  <div className="w-12 h-12 overflow-hidden flex justify-center rounded-full items-center bg-gray-300">
                    <img
                      className="w-12"
                      src={loginUser.profile_picture_url}
                      alt="profile-picture"
                    />
                  </div>
                )}
                <div>
                  <span>{loginUser.username}</span>
                  <p className="text-sm text-[#666666]">{loginUser.division}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;
