import { LogOut } from "lucide-react";
import Button from "../../ui/Button";
import logo from "../../../../assets/icons/LOGO FIX.svg";

import { navlist } from "../../../config/sidebarConfig";
import { useSidebar } from "../../../hooks/sidebar/useSidebar";

const Admin = () => {
  const { handleNavigate, isOpen, logout, companyImage, location } = useSidebar();

  return (
    <>
      <div
        className={`bg-[#F2F2F2] ${
          isOpen ? "2xl:w-[14%] md:w-[17%]" : "2xl:w-[7%] md:w-[8%]"
        }  h-screen items-center flex flex-col duration-300 py-3 sticky top-0 transition-all`}>
        <div className="flex items-center flex-col 2x 2xl:gap-8 md:gap-5">
          <img className="2xl:size-15 md:size-10" src={logo} alt="" />
          <img className="2xl:w-23 md:w-15 h-fit" src={companyImage} alt="" />
          <div className="flex flex-col items-start 2xl:gap-5 md:gap-3 font-inter">
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
              <LogOut className="2xl:size-[27px]" />
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
    </>
  );
};

export default Admin;
