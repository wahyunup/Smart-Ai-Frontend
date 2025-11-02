import {
  CircleUser,
  Files,
  House,
  LogOut,
  MessageCircleMore,
  UserCog,
} from "lucide-react";
import Button from "../ui/Button";
import useToggle from "../../store/isOpen";
import logo from "../../../assets/icons/LOGO FIX.svg";
import { getCookie, removeCookie } from "../../utils/Cookies";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { isOpen } = useToggle();
  const location = useLocation();
  const navigate = useNavigate();

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
  return (
    <div
      className={`bg-[#E3F9E8] ${
        isOpen ? "2xl:w-[17%] md:w-[25%]" : "2xl:w-[7%] md:w-[10%]"
      }  h-screen items-center flex flex-col duration-300 py-3 sticky top-0 transition-all`}>
      <div className="flex items-center flex-col gap-8">
        <img className="size-15" src={logo} alt="" />
        <img className="size-15" src="/Logo.png" alt="" />
        <div className="flex flex-col gap-10 font-inter">
          {navlist.map((item,i) => (
            <Button
            key={i}
              variant="link"
              classname={`flex items-center gap-3 ${location.pathname.startsWith(item.link) ? " border-b-2" : ""}`}
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
            classname="flex items-center gap-3 text-red-500 "
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
  );
};

export default Sidebar;
