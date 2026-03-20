import { useLocation } from "react-router-dom";
import LogoFooter from "../../../assets/icons/logo-footer.png";
import { Icon } from "@iconify/react";

const footerLinks = [
  {
    heading: "Navigation",
    links: ["Who We Are", "Feature", "How It Works", "Contact"],
  },
  {
    heading: "Resources",
    links: ["Documentation", "API Reference", "FAQ/Pusat Bantuan"],
  },
  {
    heading: "Get in Touch",
    links: ["Tangerang, Indonesia", "hello@smartai.id", "+62 812 3456 7890"],
  },
  {
    heading: "Legal",
    links: ["Term & Condition", "Privacy Polici", "Hak Cipta"],
  },
];

const Footer = () => {
  const location = useLocation();

  return location.pathname === "/" ? (
    <>
      {/* ── Desktop Footer ── */}
      <footer className="hidden md:block relative overflow-hidden py-20 px-10">
        {/* top gradient divider */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#16FF6E]/20 to-transparent" />

        {/* ambient glow orb */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[#16FF6E]/[.03] blur-[80px] rounded-full pointer-events-none" />

        <div className="max-w-[1100px] mx-auto flex flex-col gap-16 relative z-10">
          {/* tagline — same badge style as sections */}
          <div className="flex items-center justify-between">
            <p
              className="inline-flex items-center gap-2 font-dm
                         bg-[#16FF6E]/[.07] border border-[#16FF6E]/20
                         rounded-full px-[18px] py-2
                         text-[#16FF6E] text-[13px] leading-none"
            >
              <div className="flex justify-center items-center relative">
                <span className="w-[7px] h-[7px] rounded-full bg-[#16FF6E] animate-ping absolute" />
                <span className="w-[7px] h-[7px] rounded-full bg-[#16FF6E]" />
              </div>
              Your Intelligent Assistant for Company Knowledge
            </p>

            {/* logo */}
            <img
              src={LogoFooter}
              className="h-9 w-auto object-contain opacity-60 drop-shadow-[0_0_8px_rgba(22,255,110,0.15)]"
              alt="SmartAI"
            />
          </div>

          {/* link columns — matching card grid layout */}
          <div className="grid grid-cols-4 gap-10">
            {footerLinks.map((col) => (
              <div key={col.heading} className="flex flex-col gap-5">
                <h3 className="font-syne font-bold text-[15px] text-[#16FF6E]">
                  {col.heading}
                </h3>
                <div className="flex flex-col gap-3">
                  {col.links.map((item) => (
                    <a
                      key={item}
                      href=""
                      className="font-dm text-[14px] text-[#6B8C80]
                                 hover:text-[#16FF6E] transition-colors duration-200
                                 relative w-fit
                                 after:absolute after:left-0 after:-bottom-px
                                 after:h-px after:w-0 after:bg-[#16FF6E]
                                 after:transition-[width] after:duration-300
                                 hover:after:w-full"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* bottom bar */}
          <div>
            <div className="h-px bg-gradient-to-r from-transparent via-[#16FF6E]/15 to-transparent mb-6" />
            <p className="font-dm text-[13px] text-[#2D4D40] text-center flex items-center justify-center gap-3">
              <span>© 2025 SmartAI. All rights reserved.</span>
              <span className="text-[#16FF6E]/20">|</span>
              <span className="text-[#6B8C80] hover:text-[#16FF6E] transition-colors duration-200 cursor-pointer">
                Privacy Policy
              </span>
              <span className="text-[#16FF6E]/20">·</span>
              <span className="text-[#6B8C80] hover:text-[#16FF6E] transition-colors duration-200 cursor-pointer">
                Terms
              </span>
            </p>
          </div>
        </div>
      </footer>

      {/* ── Mobile Footer ── */}
      <footer className="md:hidden flex flex-col items-center gap-4 px-6 py-10 relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#16FF6E]/20 to-transparent" />

        <img
          src={LogoFooter}
          className="h-8 w-auto object-contain opacity-60 drop-shadow-[0_0_8px_rgba(22,255,110,0.15)]"
          alt="logo-footer"
        />

        <p
          className="inline-flex items-center gap-2 font-dm
                     bg-[#16FF6E]/[.07] border border-[#16FF6E]/20
                     rounded-full px-4 py-1.5
                     text-[#16FF6E] text-[11px] leading-none"
        >
          <div className="flex justify-between items-center relative">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16FF6E] animate-ping shrink-0 absolute" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#16FF6E] shrink-0" />
          </div>
          Your Intelligent Assistant for Company Knowledge
        </p>

        <div className="flex items-center justify-center font-dm text-[12px] gap-2 flex-wrap text-[#6B8C80]">
          <a
            href=""
            className="hover:text-[#16FF6E] transition-colors duration-200"
          >
            Term & Condition
          </a>
          <span className="text-[#16FF6E]/20">·</span>
          <a
            href=""
            className="hover:text-[#16FF6E] transition-colors duration-200"
          >
            Privacy Polici
          </a>
          <span className="text-[#16FF6E]/20">·</span>
          <a
            href=""
            className="hover:text-[#16FF6E] transition-colors duration-200"
          >
            Hak Cipta
          </a>
          <span className="text-[#16FF6E]/20">·</span>
          <a
            href=""
            className="hover:text-[#16FF6E] transition-colors duration-200"
          >
            FAQ/Pusat Bantuan
          </a>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#16FF6E]/15 to-transparent" />

        <p className="font-dm text-[11px] text-[#2D4D40]">
          © 2025 SmartAI. All rights reserved.
        </p>
      </footer>
    </>
  ) : (
    /* ── Non-landing footer — revamped to match "/" schema ── */
    <div className="relative pt-6 pb-4 flex flex-col items-center gap-3 bg-[#040B0E] border-t border-[#16FF6E]/[.07] overflow-hidden">
      {/* top gradient line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#16FF6E]/15 to-transparent" />

      {/* Logo */}
      <img
        src={LogoFooter}
        className="2xl:h-12 md:h-9 w-auto object-contain opacity-50 drop-shadow-[0_0_8px_rgba(22,255,110,0.12)]"
        alt="SmartAI"
      />

      {/* Bottom bar */}
      <div className="flex justify-between items-center px-8 w-full">
        {/* copyright */}
        <p className="font-dm text-[#2D4D40] 2xl:text-xs text-[11px]">
          © 2025 SmartAI. All rights reserved.
        </p>

        {/* legal links */}
        <p className="font-dm text-[#6B8C80] 2xl:text-xs text-[11px] flex items-center gap-2">
          <a
            href=""
            className="hover:text-[#16FF6E] transition-colors duration-200 hover:underline underline-offset-2"
          >
            Term & Condition
          </a>
          <span className="text-[#16FF6E]/20">·</span>
          <a
            href=""
            className="hover:text-[#16FF6E] transition-colors duration-200 hover:underline underline-offset-2"
          >
            Privacy Polici
          </a>
          <span className="text-[#16FF6E]/20">·</span>
          <a
            href=""
            className="hover:text-[#16FF6E] transition-colors duration-200 hover:underline underline-offset-2"
          >
            Hak Cipta
          </a>
        </p>

        {/* social icons */}
        <div className="flex md:gap-4 gap-3 items-center">
          <a
            href="#"
            className="text-[#6B8C80] hover:text-[#16FF6E] transition-colors duration-200"
          >
            <Icon icon="entypo-social:linkedin" width="18" height="18" />
          </a>
          <a
            href="#"
            className="text-[#6B8C80] hover:text-[#16FF6E] transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 640 640"
              fill="currentColor"
            >
              <path d="M320.3 205C256.8 204.8 205.2 256.2 205 319.7C204.8 383.2 256.2 434.8 319.7 435C383.2 435.2 434.8 383.8 435 320.3C435.2 256.8 383.8 205.2 320.3 205zM319.7 245.4C360.9 245.2 394.4 278.5 394.6 319.7C394.8 360.9 361.5 394.4 320.3 394.6C279.1 394.8 245.6 361.5 245.4 320.3C245.2 279.1 278.5 245.6 319.7 245.4zM413.1 200.3C413.1 185.5 425.1 173.5 439.9 173.5C454.7 173.5 466.7 185.5 466.7 200.3C466.7 215.1 454.7 227.1 439.9 227.1C425.1 227.1 413.1 215.1 413.1 200.3zM542.8 227.5C541.1 191.6 532.9 159.8 506.6 133.6C480.4 107.4 448.6 99.2 412.7 97.4C375.7 95.3 264.8 95.3 227.8 97.4C192 99.1 160.2 107.3 133.9 133.5C107.6 159.7 99.5 191.5 97.7 227.4C95.6 264.4 95.6 375.3 97.7 412.3C99.4 448.2 107.6 480 133.9 506.2C160.2 532.4 191.9 540.6 227.8 542.4C264.8 544.5 375.7 544.5 412.7 542.4C448.6 540.7 480.4 532.5 506.6 506.2C532.8 480 541 448.2 542.8 412.3C544.9 375.3 544.9 264.5 542.8 227.5zM495 452C487.2 471.6 472.1 486.7 452.4 494.6C422.9 506.3 352.9 503.6 320.3 503.6C287.7 503.6 217.6 506.2 188.2 494.6C168.6 486.8 153.5 471.7 145.6 452C133.9 422.5 136.6 352.5 136.6 319.9C136.6 287.3 134 217.2 145.6 187.8C153.4 168.2 168.5 153.1 188.2 145.2C217.7 133.5 287.7 136.2 320.3 136.2C352.9 136.2 423 133.6 452.4 145.2C472 153 487.1 168.1 495 187.8C506.7 217.3 504 287.3 504 319.9C504 352.5 506.7 422.6 495 452z" />
            </svg>
          </a>
          <a
            href="#"
            className="text-[#6B8C80] hover:text-[#16FF6E] transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 640 640"
              fill="currentColor"
            >
              <path d="M453.2 112L523.8 112L369.6 288.2L551 528L409 528L297.7 382.6L170.5 528L99.8 528L264.7 339.5L90.8 112L236.4 112L336.9 244.9L453.2 112zM428.4 485.8L467.5 485.8L215.1 152L173.1 152L428.4 485.8z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
