import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { useEffect, useState } from "react";

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
      className={`flex justify-between px-10 items-center bg-white rounded-full sticky top-0 transition-all duration-700 ease-in-out ${
        scrollY > 10
          ? "top-10 mx-10 shadow-lg shadow-[#3BC152]/30 outline outline-[#3BC152]"
          : ""
      }`}>
      <img className="w-35 mt-3" src="/public/logo-footer.png" alt="" />
      <div className="flex gap-10 text-xl">
        <a href="#home">Home</a>
        <a href="#feature">Features</a>
        <a href="#howitworks">How it works</a>
        <a href="#whoweare">Who we are</a>
      </div>
      <Button
        classname=""
        variant="secondary"
        onclick={() => navigate("/auth/authorization")}>
        Masuk
      </Button>
    </div>
  );
};

export default Navbar;
