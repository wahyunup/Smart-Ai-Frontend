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
      className={`bg-[#F2F2F2] ${
        isOpen ? "2xl:w-[17%] md:w-[20%] " : "2xl:w-[7%] md:w-[8%]"
      }  h-screen items-center flex  flex-col duration-300 py-3 sticky top-0 transition-all`}>
      <div className="flex items-center flex-col 2xl:gap-8 md:gap-4">
        <div
          className={`flex ${
            isOpen ? "justify-start" : " justify-center"
          }  w-full`}>
          <img className="2x:size-15 md:size-10" src={logo} alt="" />
        </div>
        <div className="flex flex-col gap-2 items-center">
          <img className="2xl:size-25" src={mascot} alt="" />
          {isOpen ? (
            <span className="2xl:text-base md:text-sm">Super Admin</span>
          ) : (
            ""
          )}
        </div>

        <div
          className={`flex flex-col ${
            isOpen ? "items-start" : "items-center"
          } gap-5 font-inter`}>
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
            <div key={category} className="flex flex-col gap-2">
              {isOpen ? (
                <p className="text-gray-500 2xl:text-sm md:text-xs mb-2">
                  {category}
                </p>
              ) : (
                <span className="border-b border-gray-200"></span>
              )}
              {items.map((item, i) => (
                <Button
                  key={i}
                  variant="link"
                  classname={`flex w-full items-center gap-3 transition-all duration-300 2xl:py-3 2xl:px-5 md:py-2 md:px-3 justify-start hover:bg-[#1D8A45] hover:text-white rounded-full underline- ${
                    location.pathname.startsWith(item.link)
                      ? " bg-[#1D8A45] text-white rounded-full"
                      : ""
                  }`}
                  onclick={() => navigate(item.link)}>
                  {item.icon}
                  <span
                    className={` font-medium 2xl:text-base md:text-xs
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
            <LogOut className="2xl:md-[27px]" />
            <span
              className={` font-medium 2xl:text-base md:text-xs
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

export default Superadmin;
