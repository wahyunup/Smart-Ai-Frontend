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
          <img className="size-56" src={logoSmartAi} alt="logo.png" />
          <h1 className="text-5xl font-bold text-[#282222]">{headingAuth}</h1>
          <div className="flex flex-col gap-1 items-center">
            <p className="text-lg font-light font-inter">{subHeadingAuth}</p>
            <p className="text-sm font-light font-inter">{subabHeading}</p>
          </div>
        </div>

        <div className={`flex flex-col ${classname}`}>{formContent}</div>

        <div className="flex flex-col gap-2">{footerContent}</div>
      </div>
    </>
  );
};

export default AuthSection;
