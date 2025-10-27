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
  const path = location.pathname;
  const navigate = useNavigate()
  console.log(
    location.pathname.startsWith(path),
    `<-------- tetsing routing ${path}`
  );

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
      }  h-screen items-center flex flex-col duration-300 py-3 transition-all`}>
      <div className="flex items-center flex-col gap-8">
        <img className="size-15" src={logo} alt="" />
        <img className="size-15" src="/Logo.png" alt="" />
        <div className="flex flex-col gap-10 font-inter">
          <Button onclick={() => navigate("/admin/dashboard")} variant="link" classname="flex items-center gap-3 ">
            <House size={27} />
            <span
              className={` font-medium
          ${isOpen ? "" : "hidden"}
            `}>
              Dashboard
            </span>
          </Button>
          <Button onclick={() => navigate("/admin/manage-documents")} variant="link" classname="flex items-center gap-3 ">
            <Files size={27} />
            <span
              className={` font-medium
          ${isOpen ? "" : "hidden"}
            `}>
              Kelola Dokumen
            </span>
          </Button>
          <Button onclick={() => navigate("/admin/chat-log")} variant="link" classname="flex items-center gap-3 ">
            <MessageCircleMore size={27} />
            <span
              className={` font-medium
          ${isOpen ? "" : "hidden"}
            `}>
              Log Chat/Riwayat
            </span>
          </Button>
          <Button onclick={() => navigate("/admin/manage-staff")} variant="link" classname="flex items-center gap-3 ">
            <UserCog size={27} />
            <span
              className={` font-medium
          ${isOpen ? "" : "hidden"}
            `}>
              Kelola Staff
            </span>
          </Button>
          <Button onclick={() => navigate("/admin/company-profile")} variant="link" classname="flex items-center gap-3 ">
            <CircleUser size={27} />
            <span
              className={` font-medium 
          ${isOpen ? "" : "hidden"}
            `}>
              Profil Perusahaan
            </span>
          </Button>
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
