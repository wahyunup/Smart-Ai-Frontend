import type { AuthSectionProps } from "../../../shared/types/type";
import logoSmartAi from "../../../assets/icons/LOGO FIX.svg"

const AuthSection = ({
  headingAuth,
  subHeadingAuth,
  formContent,
  footerContent,
  classname,
  subabHeading,
}: AuthSectionProps) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-8 2xl:h-screen md:h-full md:py-20">
        <div className="flex flex-col gap-5 items-center">
          <img className="2xl:size-56 md:size-28" src={logoSmartAi} alt="logo.png" />
          <h1 className="2xl:text-5xl md:text-3xl font-bold text-[#282222]">{headingAuth}</h1>
          <div className="flex flex-col gap-1 items-center">
            <p className="2xl:text-lg md:text-md font-light font-inter">{subHeadingAuth}</p>
            <p className="2xl:text-sm md:text-[13px] font-light font-inter">{subabHeading}</p>
          </div>
        </div>

        <div className={`flex flex-col ${classname}`}>{formContent}</div>

        <div className="flex flex-col gap-2">{footerContent}</div>
      </div>
    </>
  );
};

export default AuthSection;
