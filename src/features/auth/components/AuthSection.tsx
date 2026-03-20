import type { AuthSectionProps } from "../../../shared/types/type";
import logoSmartAi from "../../../assets/icons/LOGO FIX.svg";

const AuthSection = ({
  headingAuth,
  subHeadingAuth,
  formContent,
  footerContent,
  classname,
  subabHeading,
}: AuthSectionProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 2xl:h-screen md:h-full h-screen md:py-20">

      {/* ── Brand block ── */}
      <div className="flex flex-col md:gap-5 gap-3 items-center">
        {/* logo */}
        <a href="/">
          <img
            className="2xl:size-56 md:size-28 size-26 drop-shadow-[0_0_16px_rgba(22,255,110,0.15)]"
            src={logoSmartAi}
            alt="SmartAI"
          />
        </a>

        {/* heading — font-syne matching section headings */}
        <h1
          className="font-syne font-extrabold text-white tracking-tight
                     2xl:text-5xl md:text-3xl text-2xl"
        >
          {headingAuth}
        </h1>

        {/* sub headings */}
        <div className="flex flex-col gap-1 items-center text-center">
          <p className="font-dm text-[#6B8C80] 2xl:text-lg md:text-base text-sm leading-relaxed">
            {subHeadingAuth}
          </p>
          {subabHeading && (
            <p className="font-dm text-[#6B8C80]/70 2xl:text-sm md:text-[13px] text-xs">
              {subabHeading}
            </p>
          )}
        </div>
      </div>

      {/* ── Form card — matching SectionWhoWeAre / SectionFeature card style ── */}
      <div
        className={`relative flex flex-col bg-[#0A1A20]/50 border border-[#16FF6E]/[.07]
                    rounded-[20px] px-8 py-8 w-fit
                    shadow-[0_0_0_1px_rgba(22,255,110,0.04),0_20px_60px_rgba(0,0,0,0.4)]
                    ${classname}`}
      >
        {/* shimmer top line */}
        <div className="absolute top-0 left-0 right-0 h-px rounded-t-[20px]
                        bg-gradient-to-r from-transparent via-[#16FF6E]/20 to-transparent" />

        {formContent}
      </div>

      {/* ── Footer content ── */}
      <div className="flex flex-col gap-2 items-center">
        {footerContent}
      </div>
    </div>
  );
};

export default AuthSection;