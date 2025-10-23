import { useLocation } from "react-router-dom";
import LogoFooter from "../../../assets/icons/logo-footer.png";

const Footer = () => {
  const location = useLocation();
  return location.pathname === "/" ? (
    <div className="py-10 flex flex-col items-center justify-between gap-10 bg-white text-manrope">
      <p className="text-[#2F2F2F]">
        Your Intelligent Assistant for Company Knowledge
      </p>
      <div className="flex justify-evenly w-full">
        <div className="flex flex-col gap-5 text-start">
          <h1 className="font-bold text-[16px] text-[#2BA54B]">Navigation</h1>
          <div className="flex flex-col underline">
            <a href="">Who We Are</a>
            <a href="">Feature</a>
            <a href="">How It Works</a>
            <a href="">Contact</a>
          </div>
        </div>

        <div className="flex flex-col gap-5 text-start">
          <h1 className="font-bold text-[16px] text-[#2BA54B]">Resources</h1>
          <div className="flex flex-col underline">
            <a href="">Documentation</a>
            <a href="">API Reference</a>
            <a href="">FAQ/Pusat Bantuan</a>
          </div>
        </div>

        <div className="flex flex-col gap-5 text-start">
          <h1 className="font-bold text-[16px] text-[#2BA54B]">Get in Touch</h1>
          <div className="flex flex-col underline">
            <a href="">Tangerang, Indonesia</a>
            <a href="">hello@smartai.id</a>
            <a href="">+62 812 3456 7890</a>
          </div>
        </div>

        <div className="flex flex-col gap-5 text-start">
          <h1 className="font-bold text-[16px] text-[#2BA54B]">Legal</h1>
          <div className="flex flex-col underline">
            <a href="">Term & Condition</a>
            <a href="">Privacy Polici</a>
            <a href="">Hak Cipta</a>
          </div>
        </div>
      </div>

      <div>
        <p className="text-center text-[#B2B2B2] flex items-center gap-3">
          <img src={LogoFooter} className="w-20" alt="" />
          <span>|</span> © 2025 SmartAI. All rights reserved.
        </p>
      </div>
    </div>
  ) : (
    <div className="pt-7 flex flex-col items-center gap-4 bg-white text-manrope">
      <img src={LogoFooter} className="w-[103.83977508544922px]" alt="" />
      <div className="flex justify-between px-5 w-full">
        <p className=" text-[#B2B2B2]">
          © 2025 SmartAI. All rights reserved.
        </p>
        <p className="text-[#2F2F2F] mr-50 underline">Term & Condition . Privacy Polici . Hak Cipta</p>
      <img src={LogoFooter} className="w-20" alt="" />
      </div>
    </div>
  );
};

export default Footer;
