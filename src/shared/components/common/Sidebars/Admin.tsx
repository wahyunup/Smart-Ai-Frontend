import { LogOut } from "lucide-react";
import Button from "../../ui/Button";
import logo from "../../../../assets/icons/LOGO FIX.svg";
import { navlist } from "../../../config/sidebarConfig";
import { useSidebar } from "../../../hooks/sidebar/useSidebar";

const Admin = () => {
  const { handleNavigate, isOpen, logout, companyImage, location } =
    useSidebar();

  return (
    <div
      className={`relative bg-[#040B0E] border-r border-[#16FF6E]/[.07]
                  ${isOpen ? "2xl:w-[14%] md:w-[17%]" : "2xl:w-[7%] md:w-[8%]"}
                  h-screen flex flex-col items-center
                  duration-300 py-5 sticky top-0 transition-all overflow-hidden`}
    >
      {/* ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200px] h-[200px] bg-[#16FF6E]/[.03] blur-[60px] rounded-full pointer-events-none" />

      <div className="flex items-center flex-col 2xl:gap-8 md:gap-5 w-full px-3 relative z-10 h-full">
        {/* Logo */}
        <img
          className="2xl:size-12 md:size-9 drop-shadow-[0_0_8px_rgba(22,255,110,0.15)]"
          src={logo}
          alt="image-logo"
        />

        {/* Company image */}
        <div className="rounded-xl overflow-hidden border border-[#16FF6E]/10 bg-[#0A1A20] p-1">
          <img
            className="2xl:w-20 md:w-14 h-fit object-contain"
            src={companyImage}
            alt="company-logo"
          />
        </div>

        {/* Nav items */}
        <div className="flex flex-col items-center 2xl:gap-3 md:gap-1 w-full justify-between h-full ">
          <div className="flex flex-col items-center 2xl:gap-3 md:gap-1 w-full">
            {navlist.map((item, i) => (
              <Button
                key={i}
                variant="nav"
                classname={`flex items-center gap-3 transition-all duration-200
                          2xl:py-4 2xl:px-4 md:py-2 md:px-3 rounded-2xl justify-center w-full
                          font-dm font-medium 2xl:text-sm md:text-xs
                          ${
                            location.pathname.startsWith(item.link)
                              ? "bg-[#16FF6E]/10 text-[#16FF6E] border border-[#16FF6E]/20"
                              : "text-[#6B8C80] hover:bg-[#16FF6E]/[.05] hover:text-[#16FF6E]"
                          }`}
                onclick={() => handleNavigate(item.link)}
              >
                {item.icon}
                <span className={`${isOpen ? "" : "hidden"}`}>
                  {item.lable}
                </span>
              </Button>
            ))}
          </div>
          {/* Logout */}
          <Button
            variant="nav"
            classname="flex items-center gap-3 font-dm text-red-400
                       hover:bg-red-400/[.07] hover:text-red-300 hover:outline-red-400
                       2xl:py-4 2xl:px-4 md:py-2 md:px-3
                       rounded-[10px] w-full justify-center transition-all duration-200 mt-2"
            onclick={logout}
          >
            <LogOut className="2xl:size-[18px] md:size-[16px]" />
            <span className={`font-medium ${isOpen ? "" : "hidden"}`}>
              Keluar
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
