import { useLocation } from "react-router-dom";
import LogoFooter from "../../../assets/icons/logo-footer.png";
import { Icon } from "@iconify/react";

const Footer = () => {
  const location = useLocation();
  return location.pathname === "/" ? (
    <>
      <div className="py-10 hidden md:flex flex-col items-center justify-center gap-10 bg-white text-manrope">
        <p className="text-[#2F2F2F] 2xl:text-base md:text-sm">
          Your Intelligent Assistant for Company Knowledge
        </p>
        <div className="flex justify-evenly w-full">
          <div className="flex flex-col gap-5 text-start">
            <h1 className="font-bold 2xl:text-[16px] md:text-[15px] text-[#2BA54B]">
              Navigation
            </h1>
            <div className="flex flex-col 2xl:text-base md:text-sm underline">
              <a href="">Who We Are</a>
              <a href="">Feature</a>
              <a href="">How It Works</a>
              <a href="">Contact</a>
            </div>
          </div>

          <div className="flex flex-col gap-5 text-start">
            <h1 className="font-bold text-[16px] text-[#2BA54B] 2xl:text-[16px] md:text-[15px]">
              Resources
            </h1>
            <div className="flex flex-col underline 2xl:text-base md:text-sm">
              <a href="">Documentation</a>
              <a href="">API Reference</a>
              <a href="">FAQ/Pusat Bantuan</a>
            </div>
          </div>

          <div className="flex flex-col gap-5 text-start">
            <h1 className="font-bold text-[16px] text-[#2BA54B] 2xl:text-[16px] md:text-[15px]">
              Get in Touch
            </h1>
            <div className="flex flex-col underline 2xl:text-base md:text-sm">
              <a href="">Tangerang, Indonesia</a>
              <a href="">hello@smartai.id</a>
              <a href="">+62 812 3456 7890</a>
            </div>
          </div>

          <div className="flex flex-col gap-5 text-start">
            <h1 className="font-bold text-[16px] text-[#2BA54B] 2xl:text-[16px] md:text-[15px]">
              Legal
            </h1>
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

      <div className="bg-white md:hidden flex flex-col items-center gap-2 px-5 py-7">
        <p className="text-sm text-center text-[#2F2F2F]">
          Your Intelligent Assistant for Company Knowledge.
        </p>
        <img src={LogoFooter} className="w-20" alt="logo-footer" />
        <div className="flex items-center justify-center text-[11px] gap-1">
          <a href="">Term & Condition</a>
          <span>.</span>
          <a href="">Privacy Polici</a>
          <span>.</span>
          <a href="">Hak Cipta</a>
          <span>.</span>
          <a href="">FAQ/Pusat Bantuan</a>
        </div>
        <p className="text-[11px] text-[#B2B2B2]">
          © 2025 SmartAI. All rights reserved.
        </p>
      </div>
    </>
  ) : (
    <div className="pt-7 pb-3 flex flex-col items-center 2xl:gap-4 md:gap-3 bg-white text-manrope">
      <img
        src={LogoFooter}
        className="2xl:w-[103.83977508544922px] md:w-[80px] w-[70px]"
        alt=""
      />
      <div className="flex justify-between items-center px-5 w-full">
        <p className=" text-[#B2B2B2] 2xl:text-base text-xs">
          © 2025 SmartAI. All rights reserved.
        </p>
        <p className="text-[#2F2F2F] 2xl:mr-50 md:mr-34 underline text-center 2xl:text-base text-xs">
          Term & Condition . Privacy Polici . Hak Cipta
        </p>
        <div className="flex md:gap-4 gap-2">
          <a href="#">
            <Icon
              icon="entypo-social:linkedin"
              color="#1D8A45"
              width="20"
              height="20"
            />
          </a>
          <a href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              color="#1D8A45"
              width={25}
              height={25}
              viewBox="0 0 640 640">
              <path
                fill="currentColor"
                d="M320.3 205C256.8 204.8 205.2 256.2 205 319.7C204.8 383.2 256.2 434.8 319.7 435C383.2 435.2 434.8 383.8 435 320.3C435.2 256.8 383.8 205.2 320.3 205zM319.7 245.4C360.9 245.2 394.4 278.5 394.6 319.7C394.8 360.9 361.5 394.4 320.3 394.6C279.1 394.8 245.6 361.5 245.4 320.3C245.2 279.1 278.5 245.6 319.7 245.4zM413.1 200.3C413.1 185.5 425.1 173.5 439.9 173.5C454.7 173.5 466.7 185.5 466.7 200.3C466.7 215.1 454.7 227.1 439.9 227.1C425.1 227.1 413.1 215.1 413.1 200.3zM542.8 227.5C541.1 191.6 532.9 159.8 506.6 133.6C480.4 107.4 448.6 99.2 412.7 97.4C375.7 95.3 264.8 95.3 227.8 97.4C192 99.1 160.2 107.3 133.9 133.5C107.6 159.7 99.5 191.5 97.7 227.4C95.6 264.4 95.6 375.3 97.7 412.3C99.4 448.2 107.6 480 133.9 506.2C160.2 532.4 191.9 540.6 227.8 542.4C264.8 544.5 375.7 544.5 412.7 542.4C448.6 540.7 480.4 532.5 506.6 506.2C532.8 480 541 448.2 542.8 412.3C544.9 375.3 544.9 264.5 542.8 227.5zM495 452C487.2 471.6 472.1 486.7 452.4 494.6C422.9 506.3 352.9 503.6 320.3 503.6C287.7 503.6 217.6 506.2 188.2 494.6C168.6 486.8 153.5 471.7 145.6 452C133.9 422.5 136.6 352.5 136.6 319.9C136.6 287.3 134 217.2 145.6 187.8C153.4 168.2 168.5 153.1 188.2 145.2C217.7 133.5 287.7 136.2 320.3 136.2C352.9 136.2 423 133.6 452.4 145.2C472 153 487.1 168.1 495 187.8C506.7 217.3 504 287.3 504 319.9C504 352.5 506.7 422.6 495 452z"
              />
            </svg>
          </a>
          <a href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              color="#1D8A45"
              width={25}
              height={25}
              viewBox="0 0 640 640">
              <path
                fill="currentColor"
                d="M453.2 112L523.8 112L369.6 288.2L551 528L409 528L297.7 382.6L170.5 528L99.8 528L264.7 339.5L90.8 112L236.4 112L336.9 244.9L453.2 112zM428.4 485.8L467.5 485.8L215.1 152L173.1 152L428.4 485.8z"
              />
            </svg>
          </a>
        </div>
        {/* <img src={LogoFooter} className="w-20" alt="" /> */}
      </div>
    </div>
  );
};

export default Footer;
