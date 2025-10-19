import type { AuthSectionProps } from "../../../shared/types/type";

const AuthSection = ({
  headingAuth,
  subHeadingAuth,
  formContent,
  footerContent,
  classname,
}: AuthSectionProps) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-8 h-screen">
        <div className="flex flex-col gap-5 items-center">
          <img className="size-56" src="/public/Logo.png" alt="logo.png" />
          <h1 className="text-5xl font-bold">{headingAuth}</h1>
          <p className="text-lg">{subHeadingAuth}</p>
        </div>

        <div className={`w-100 flex flex-col ${classname}`}>{formContent}</div>
    
        <div className="flex flex-col gap-2">{footerContent}</div>
      </div>
    </>
  );
};

export default AuthSection;
