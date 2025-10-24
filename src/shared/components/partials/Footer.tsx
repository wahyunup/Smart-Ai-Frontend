import { useLocation } from "react-router-dom";
import LogoFooter from "../../../assets/icons/logo-footer.png";

const Footer = () => {
  const location = useLocation();
  return location.pathname === "/" ? (
    <div className="py-10 flex flex-col items-center justify-center gap-10 bg-white text-manrope">
      <p className="text-[#2F2F2F] 2xl:text-base md:text-sm">
        Your Intelligent Assistant for Company Knowledge
      </p>
      <div className="flex justify-evenly w-full">
        <div className="flex flex-col gap-5 text-start">
          <h1 className="font-bold 2xl:text-[16px] md:text-[15px] text-[#2BA54B]">Navigation</h1>
          <div className="flex flex-col 2xl:text-base md:text-sm underline">
            <a href="">Who We Are</a>
            <a href="">Feature</a>
            <a href="">How It Works</a>
            <a href="">Contact</a>
          </div>
        </div>

        <div className="flex flex-col gap-5 text-start">
          <h1 className="font-bold text-[16px] text-[#2BA54B] 2xl:text-[16px] md:text-[15px]">Resources</h1>
          <div className="flex flex-col underline 2xl:text-base md:text-sm">
            <a href="">Documentation</a>
            <a href="">API Reference</a>
            <a href="">FAQ/Pusat Bantuan</a>
          </div>
        </div>

        <div className="flex flex-col gap-5 text-start">
          <h1 className="font-bold text-[16px] text-[#2BA54B] 2xl:text-[16px] md:text-[15px]">Get in Touch</h1>
          <div className="flex flex-col underline 2xl:text-base md:text-sm">
            <a href="">Tangerang, Indonesia</a>
            <a href="">hello@smartai.id</a>
            <a href="">+62 812 3456 7890</a>
          </div>
        </div>

        <div className="flex flex-col gap-5 text-start">
          <h1 className="font-bold text-[16px] text-[#2BA54B] 2xl:text-[16px] md:text-[15px]">Legal</h1>
          <div className="flex flex-col underline 2xl:text-base md:text-sm">
            <a href="">Term & Condition</a>
            <a href="">Privacy Polici</a>
            <a href="">Hak Cipta</a>
          </div>
        </div>
      </div>

      <div>
        <p className="text-center text-[#B2B2B2] flex items-center 2xl:text-base md:text-xs gap-3">
          <img src={LogoFooter} className="2xl:w-20 md:w-14" alt="" />
          <span>|</span> © 2025 SmartAI. All rights reserved.
        </p>
      </div>
    </div>
  ) : (
    <div className="pt-7 flex flex-col items-center 2xl:gap-4 bg-white text-manrope">
      <img src={LogoFooter} className="2xl:w-[103.83977508544922px] md:w-[80px]" alt="" />
      <div className="flex justify-between items-center px-5 w-full">
        <p className=" text-[#B2B2B2] 2xl:text-base md:text-xs">
          © 2025 SmartAI. All rights reserved.
        </p>
        <p className="text-[#2F2F2F] 2xl:mr-50 md:mr-34 underline  2xl:text-base md:text-xs">Term & Condition . Privacy Polici . Hak Cipta</p>
      <img src={LogoFooter} className="w-20" alt="" />
      </div>
    </div>
  );
};

export default Footer;
