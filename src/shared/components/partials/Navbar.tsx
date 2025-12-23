import { useLocation, useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { useEffect, useState } from "react";
import LogoSmartAi from "../../../assets/icons/logo-footer.png";
import { CircleUser, Menu, PanelLeftClose, Sparkles } from "lucide-react";
import useToggle from "../../store/isOpen";
import { getCookie } from "../../utils/Cookies";
import { decodeJwt } from "../../utils/Decode";
import smartAiMascot from "../../../assets/icons/SmartAI 3.png";
import { usePlanStore } from "../../store/useSubsStat";

const Navbar = () => {
  const [me, setMe] = useState({
    name: "",
    role: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const [scrollY, setScrollY] = useState(0);
  const { setIsOpen, isOpen } = useToggle();
  const { fetchPlan, plan } = usePlanStore();

  useEffect(() => {
    if (location.pathname.startsWith("/chat")) {
      fetchPlan();
    }
  }, []);

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
          role: decode.role,
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
              scrollY > 100
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
            className={`md:hidden flex justify-between px-10 items-center z-10 outline-[#3BC152] fixed transition-all duration-700 ease-in-out ${
              scrollY > 10
                ? "top-5 mx-3 shadow-lg shadow-[#3BC152]/50 outline rounded-4xl bg-white/80 backdrop-blur-xl outline-[#3BC152] w-[94.9%]"
                : "rounded-none top-0 bg-white w-full"
            }`}>
            <img className="w-20 mt-3" src={LogoSmartAi} alt="" />

            <button onClick={setIsOpen}>
              <Menu />
            </button>
          </div>
          {isOpen && (
            <div
              className={` md:hidden w-full rounded-2xl z-10 fixed ${
                scrollY > 10 ? "top-20 p-4 " : "top-15"
              } transition-all duration-700 ease-in-out font-manrope font-semibold`}>
              <div
                className={`flex flex-col gap-5 items-center p-5 bg-white/80 backdrop-blur-xl ${
                  scrollY > 10
                    ? "outline-[#3BC152] outline-1 shadow-lg shadow-[#3BC152]/50 rounded-3xl"
                    : ""
                }`}>
                <a href="#home">Home</a>
                <a href="#feature">Features</a>
                <a href="#howitworks">How it works</a>
                <a href="#whoweare">Who we are</a>
                <Button
                  onclick={() => navigate("/auth/company-employe/login")}
                  variant="secondary"
                  classname="w-full py-3 rounded-xl">
                  Masuk
                </Button>
              </div>
            </div>
          )}
        </>
      ) : location.pathname.startsWith("/chat/conversation/") ||
        location.pathname.startsWith("/chat/faq") ? (
        <div className="md:grid md:grid-cols-3 flex bg-white p-5 items-center">
           <button
        onClick={() => setIsOpen()}
        className="bg-transparent md:hidden">
        <Menu size={25} />
      </button>
          <div className="md:flex gap-3 items-center hidden">
            <img src={smartAiMascot} alt="" />
            <h1 className="text-xl font-semibold">Corporate Assistant Bot</h1>
          </div>
          <div className="flex flex-col sticky top-10 justify-center items-center w-full">
            <p className="bg-[#1D8A4514] px-3 py-2 rounded-full border border-[#1D8A45] text-[#1D8A45] flex gap-1">
              SmartAI Pro: <span>{plan}</span>
              <Sparkles size={15} color="#3BC152" />
            </p>
          </div>
          <p></p>
        </div>
      ) : location.pathname.startsWith(
          "/chat"
        ) ? null : location.pathname.startsWith("/admin") ? (
        <>
          <div
            className={`bg-[#E3F9E8] 2xl:h-30 md:h-20 flex justify-between items-center px-10 `}>
            <Button variant="link" onclick={setIsOpen}>
              <PanelLeftClose size={27} />
            </Button>

            <div className="flex items-center bg-white px-4 py-3 rounded-xl">
              <Button variant="link" classname="flex items-center gap-2">
                <CircleUser size={27} />
                <div className="flex flex-col text-start text-[#2F2F2F] w-24">
                  <p className="text-base font-semibold truncate">{me?.name}</p>
                  <p className="text-xs truncate">{me?.role}</p>
                </div>
              </Button>
            </div>
          </div>
        </>
      ) : location.pathname.startsWith("/superadmin") ? (
        <div className="px-10 h-30 flex items-center border-b-1 border-gray-300">
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
