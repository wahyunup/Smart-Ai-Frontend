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

  const navLinks = [
    { href: "#home",        label: "Beranda" },
    { href: "#feature",     label: "Fitur" },
    { href: "#howitworks",  label: "Cara Kerja" },
    { href: "#whoweare",    label: "Tentang Kami" },
  ];

  return (
    <>
      {location.pathname === "/" ? (
        <>
          {/* ────────────────── DESKTOP ────────────────── */}
          <div
            className={`hidden md:flex justify-between pl-5 pr-3 py-4 items-center z-50 sticky transition-all duration-700 ease-in-out ${
              scrollY > 100
                ? "top-10 mx-10 rounded-[20px] bg-[#030A0D]/75 backdrop-blur-3xl shadow-[0_0_0_1px_rgba(22,255,110,0.12),0_8px_40px_rgba(22,255,110,0.06)]"
                : "top-0 bg-transparent"
            }`}
          >
            {/* Scanning shimmer line */}
            {scrollY > 100 && (
              <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#16FF6E]/50 to-transparent " />
            )}

            {/* Logo */}
            <img
              className="h-9 w-auto object-contain drop-shadow-[0_0_8px_rgba(22,255,110,0.15)]"
              src={LogoSmartAi}
              alt="SmartAI"
            />

            {/* Links */}
            <div className="flex gap-10 font-dm font-medium text-[14px]">
              {navLinks.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  className="relative text-[#6B8C80] hover:text-[#16FF6E] transition-colors duration-300
                             after:absolute after:left-0 after:-bottom-0.5
                             after:h-px after:w-0 after:bg-[#16FF6E]
                             after:transition-[width] after:duration-300
                             hover:after:w-full"
                >
                  {label}
                </a>
              ))}
            </div>

            {/* CTA button */}
            <button
              onClick={() => navigate("/auth/company-employe/login")}
              className="group relative flex items-center gap-2.5
                         font-syne font-bold text-[15px] text-[#040B0E]
                         bg-[#16FF6E] px-6 py-3 rounded-[10px] overflow-hidden
                         before:absolute before:inset-0
                         before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent
                         before:-translate-x-full before:transition-transform before:duration-500
                         hover:before:translate-x-full
                         hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(22,255,110,0.4)]
                         transition-all duration-[250ms]"
            >
              Masuk
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* ────────────────── MOBILE ────────────────── */}
          <div
            className={`md:hidden flex justify-between px-6 py-4 items-center z-50 fixed transition-all duration-700 ease-in-out ${
              scrollY > 10
                ? "top-5 mx-3 w-[94.9%] rounded-4xl bg-[#030A0D]/75 backdrop-blur-3xl shadow-[0_0_0_1px_rgba(22,255,110,0.12),0_8px_40px_rgba(22,255,110,0.06)]"
                : "top-0 w-full bg-transparent"
            }`}
          >
            {scrollY > 10 && (
              <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#16FF6E]/50 to-transparent animate-[shimmer_3s_ease-in-out_infinite]" />
            )}

            <img
              className="h-8 w-auto object-contain drop-shadow-[0_0_8px_rgba(22,255,110,0.15)]"
              src={LogoSmartAi}
              alt="SmartAI"
            />

            <button
              onClick={setIsOpen}
              className="text-[#6B8C80] hover:text-[#16FF6E] transition-colors duration-300"
            >
              <Menu />
            </button>
          </div>

          {/* Mobile dropdown */}
          {isOpen && (
            <div
              className={`md:hidden w-full z-40 fixed ${
                scrollY > 10 ? "top-20 px-4" : "top-[60px] px-4"
              } transition-all duration-700 ease-in-out`}
            >
              <div
                className="relative flex flex-col gap-1 p-5
                            bg-[#0A1A20]/95 backdrop-blur-3xl rounded-[20px]
                            shadow-[0_0_0_1px_rgba(22,255,110,0.12),0_8px_40px_rgba(22,255,110,0.06)]"
              >
                <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#16FF6E]/40 to-transparent rounded-t-[20px]" />

                {navLinks.map(({ href, label }) => (
                  <a
                    key={href}
                    href={href}
                    className="font-dm font-medium text-[15px] text-[#6B8C80]
                               hover:text-[#16FF6E] hover:bg-[#16FF6E]/[.05]
                               px-4 py-3 rounded-xl
                               transition-all duration-200 text-center"
                  >
                    {label}
                  </a>
                ))}

                <div className="h-px bg-gradient-to-r from-transparent via-[#16FF6E]/15 to-transparent my-2" />

                <button
                  onClick={() => navigate("/auth/company-employe/login")}
                  className="group relative w-full flex items-center justify-center gap-2.5
                             font-syne font-bold text-[15px] text-[#040B0E]
                             bg-[#16FF6E] py-3.5 rounded-[10px] overflow-hidden
                             before:absolute before:inset-0
                             before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent
                             before:-translate-x-full before:transition-transform before:duration-500
                             hover:before:translate-x-full
                             hover:shadow-[0_0_40px_rgba(22,255,110,0.4)]
                             transition-all duration-[250ms]"
                >
                  Masuk
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}

        </>
      ) : location.pathname.startsWith("/chat") ||
        location.pathname.startsWith("/chat/faq") ? (

        /* ── Chat Navbar ── */
        <div
          className={`${
            location.pathname === "/chat" ? "" : "md:grid md:grid-cols-3"
          } flex bg-[#040B0E] border-b border-[#16FF6E]/[.07] p-4 items-center sticky top-0 z-10`}
        >
          <button
            onClick={() => setIsOpen()}
            className="bg-transparent md:hidden text-[#6B8C80] hover:text-[#16FF6E] transition-colors duration-200"
          >
            <Menu size={22} />
          </button>
          {location.pathname === "/chat" ? (
            ""
          ) : (
            <div className="md:flex gap-3 items-center hidden">
              <img src={smartAiMascot} alt="" className="w-8 h-8 object-contain" />
              <h1 className="font-syne font-bold text-white text-base">ORBIT</h1>
            </div>
          )}
          <div className="flex flex-col sticky top-10 justify-center items-center w-full">
            <p
              className="font-dm text-sm
                         bg-[#16FF6E]/[.07] border border-[#16FF6E]/20
                         px-4 py-2 rounded-full text-[#16FF6E]
                         flex items-center gap-2"
            >
              SmartAI Pro:
              <span className="text-[#E8F4F0]">{plan}</span>
              <Sparkles size={13} className="text-[#16FF6E]" />
            </p>
          </div>
          <p></p>
        </div>

      ) : location.pathname.startsWith(
          "/chat",
        ) ? null : location.pathname.startsWith("/admin") ? (

        /* ── Admin Navbar ── */
        <div
          className="bg-[#040B0E] border-b border-[#16FF6E]/[.07]
                     2xl:h-20 md:h-16 flex justify-between items-center px-8"
        >
          <Button variant="link" onclick={setIsOpen}>
            <PanelLeftClose
              size={22}
              className="text-[#6B8C80] hover:text-[#16FF6E] transition-colors duration-200"
            />
          </Button>

          <div
            className="flex items-center gap-3
                        bg-[#0A1A20] border border-[#16FF6E]/[.07]
                        2xl:px-4 2xl:py-2.5 md:px-3 md:py-2 rounded-[12px]
                        hover:border-[#16FF6E]/20 transition-colors duration-200 cursor-pointer"
          >
            <Button variant="link" classname="flex items-center gap-3">
              <div
                className="2xl:w-9 2xl:h-9 md:w-8 md:h-8
                            rounded-full bg-[#16FF6E]/10 border border-[#16FF6E]/20
                            flex items-center justify-center shrink-0"
              >
                <CircleUser className="2xl:size-[18px] md:size-[16px] text-[#16FF6E]" />
              </div>
              <div className="flex flex-col text-start w-24">
                <p className="font-syne font-bold 2xl:text-sm md:text-xs text-white truncate">
                  {me?.name}
                </p>
                <p className="font-dm text-xs text-[#6B8C80] truncate">{me?.role}</p>
              </div>
            </Button>
          </div>
        </div>

      ) : location.pathname.startsWith("/superadmin") ? (

        /* ── Superadmin Navbar ── */
        <div
          className="bg-[#040B0E] border-b border-[#16FF6E]/[.07]
                     px-8 h-16 flex items-center"
        >
          <Button variant="link" onclick={setIsOpen}>
            <PanelLeftClose
              size={22}
              className="text-[#6B8C80] hover:text-[#16FF6E] transition-colors duration-200"
            />
          </Button>
        </div>

      ) : (
        ""
      )}
    </>
  );
};

export default Navbar;