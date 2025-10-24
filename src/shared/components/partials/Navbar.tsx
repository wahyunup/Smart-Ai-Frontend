import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { useEffect, useState } from "react";
import LogoSmartAi from "../../../assets/icons/logo-footer.png"

const Navbar = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`flex justify-between px-10  md:py-3 2xl:py-0 items-center z-10 outline-[#3BC152]  sticky  transition-all duration-700 ease-in-out ${
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
  );
};

export default Navbar;
