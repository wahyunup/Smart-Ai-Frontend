import { useLocation, useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { useEffect, useState } from "react";
import LogoSmartAi from "../../../assets/icons/logo-footer.png";
import { CircleUser, Menu, PanelLeftClose } from "lucide-react";
import useToggle from "../../store/isOpen";
import { getCookie } from "../../utils/Cookies";
import { decodeJwt } from "../../utils/Decode";
import smartAiMascot from "../../../assets/icons/SmartAI 3.png";

const Navbar = () => {
  const [me, setMe] = useState({
    name: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const [scrollY, setScrollY] = useState(0);
  const { setIsOpen } = useToggle();

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    try {
      const cookie = getCookie("accesstoken");
      if (cookie) {
        const decode = decodeJwt(cookie);
        setMe({
          name: decode.name,
        });
      }
    } catch (error: any) {
      console.log(error);
    }
  }, []);

  return (
    <>
      {location.pathname === "/" ? (
        <>
          {/* desktop */}
          <div
            className={`hidden md:flex justify-between px-10  md:py-3 2xl:py-0 items-center z-10 outline-[#3BC152] sticky  transition-all duration-700 ease-in-out ${
              scrollY > 10
                ? "top-10 mx-10 shadow-lg shadow-[#3BC152]/50 outline rounded-4xl bg-white/80 backdrop-blur-xl outline-[#3BC152]"
                : "rounded-none top-0 bg-white"
            }`}>
            <img className="2xl:w-35 md:w-26 mt-3" src={LogoSmartAi} alt="" />
            <div className="flex gap-10 2xl:text-xl md:text-md font-manrope font-semibold">
              <a href="#home">Home</a>
              <a href="#feature">Features</a>
              <a href="#howitworks">How it works</a>
              <a href="#whoweare">Who we are</a>
            </div>
            <Button
              classname="2xl:px-10 md:px-8 py-3 rounded-2xl"
              variant="secondary"
              onclick={() => navigate("/auth/company-employe/login")}>
              Masuk
            </Button>
          </div>

          {/* mobile */}
          <div
            className={`md:hidden flex justify-between px-10 items-center z-10 outline-[#3BC152] sticky  transition-all duration-700 ease-in-out ${
              scrollY > 10
                ? "top-5 mx-3 shadow-lg shadow-[#3BC152]/50 outline rounded-4xl bg-white/80 backdrop-blur-xl outline-[#3BC152]"
                : "rounded-none top-0 bg-white"
            }`}>
            <img className="w-20 mt-3" src={LogoSmartAi} alt="" />

            <button>
              <Menu />
            </button>
          </div>
        </>
      ) : location.pathname.startsWith("/chat/conversation/") ? (
        <div className="flex gap-3 items-center bg-white p-5">
          <img src={smartAiMascot} alt="" />
          <h1 className="text-xl font-semibold">Corporate Assistant Bot</h1>
        </div>
      ) : location.pathname.startsWith(
          "/chat"
        ) ? null : location.pathname.startsWith("/admin") ? (
        <>
          <div className="bg-[#E3F9E8] h-20 flex justify-between items-center px-10 ">
            <Button variant="link" onclick={setIsOpen}>
              <PanelLeftClose size={27} />
            </Button>

            <div className="flex items-center bg-white px-4 py-3 rounded-xl">
              <Button variant="link" classname="flex items-center gap-2">
                <CircleUser size={27} />
                <span className="text-base">{me?.name}</span>
              </Button>
            </div>
          </div>
        </>
      ) : location.pathname.startsWith("/superadmin") ? (
        <div className="p-10 border-b-1 border-gray-300">
          <Button variant="link" onclick={setIsOpen}>
            <PanelLeftClose size={27} />
          </Button>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Navbar;
