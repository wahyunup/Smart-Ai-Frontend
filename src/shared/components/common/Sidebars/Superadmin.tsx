import { LogOut } from "lucide-react";
import Button from "../../ui/Button";
import { navListSuperAdmin } from "../../../config/sidebarConfig";
import { useSidebar } from "../../../hooks/sidebar/useSidebar";
import mascot from "../../../../assets/icons/SmartAI-2.png";
import logo from "../../../../assets/icons/LOGO FIX.svg";

const Superadmin = () => {
  const { isOpen, logout, navigate, location } = useSidebar();

  return (
    <div
      className={`relative bg-[#040B0E] border-r border-[#16FF6E]/[.07]
                  ${isOpen ? "2xl:w-[17%] md:w-[20%]" : "2xl:w-[7%] md:w-[8%]"}
                  h-screen flex flex-col items-center
                  duration-300 py-5 sticky top-0 transition-all overflow-hidden`}
    >
      {/* ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200px] h-[200px] bg-[#16FF6E]/[.03] blur-[60px] rounded-full pointer-events-none" />

      <div className="flex items-center flex-col 2xl:gap-8 md:gap-5 w-full px-3 relative z-10">
        {/* Logo */}
        <div
          className={`flex ${isOpen ? "justify-start" : "justify-center"} w-full`}
        >
          <img
            className="2xl:size-12 md:size-9 drop-shadow-[0_0_8px_rgba(22,255,110,0.15)]"
            src={logo}
            alt=""
          />
        </div>

        {/* Mascot */}
        <div className="flex flex-col gap-2 items-center">
          <div className="rounded-2xl overflow-hidden border border-[#16FF6E]/10 bg-[#0A1A20]">
            <img className="2xl:size-20 md:size-14" src={mascot} alt="" />
          </div>
          {isOpen && (
            <span className="font-dm text-[#6B8C80] 2xl:text-sm md:text-xs">
              Super Admin
            </span>
          )}
        </div>

        {/* Nav items */}
        <div
          className={`flex flex-col ${isOpen ? "items-start" : "items-center"} gap-5 w-full`}
        >
          {Object.entries(
            navListSuperAdmin.reduce(
              (acc, item) => {
                if (!acc[item.category]) acc[item.category] = [];
                acc[item.category].push(item);
                return acc;
              },
              {} as Record<string, typeof navListSuperAdmin>,
            ),
          ).map(([category, items]) => (
            <div key={category} className="flex flex-col gap-1 w-full">
              {isOpen ? (
                <p className="font-dm text-[#6B8C80]/50 2xl:text-xs md:text-[10px] uppercase tracking-wider mb-1 px-3">
                  {category}
                </p>
              ) : (
                <div className="h-px w-full bg-[#16FF6E]/[.07]" />
              )}
              {items.map((item, i) => (
                <Button
                  key={i}
                  variant="link"
                  classname={`flex w-full items-center gap-3 transition-all duration-200
                              2xl:py-2.5 2xl:px-4 md:py-2 md:px-3
                              rounded-[10px] justify-start
                              font-dm 2xl:text-sm md:text-xs font-medium
                              ${
                                location.pathname.startsWith(item.link)
                                  ? "bg-[#16FF6E]/10 text-[#16FF6E] border border-[#16FF6E]/20"
                                  : "text-[#6B8C80] hover:bg-[#16FF6E]/[.05] hover:text-[#16FF6E]"
                              }`}
                  onclick={() => navigate(item.link)}
                >
                  {item.icon}
                  <span className={`${isOpen ? "" : "hidden"}`}>
                    {item.lable}
                  </span>
                </Button>
              ))}
            </div>
          ))}

          {/* Logout */}
          <Button
            variant="link"
            classname="flex items-center gap-3 font-dm text-red-400
                       hover:bg-red-400/[.07] hover:text-red-300
                       2xl:py-2.5 2xl:px-4 md:py-2 md:px-3
                       rounded-[10px] w-full transition-all duration-200"
            onclick={logout}
          >
            <LogOut className="2xl:size-[18px] md:size-[16px]" />
            <span
              className={`font-medium 2xl:text-sm md:text-xs ${isOpen ? "" : "hidden"}`}
            >
              Keluar
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Superadmin;
