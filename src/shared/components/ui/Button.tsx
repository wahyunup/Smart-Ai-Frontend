import clsx from "clsx";
import type { ButtonProps } from "../../types/type";

const Button = ({
  onclick,
  children,
  classname,
  variant = "primary",
}: ButtonProps) => {
  return (
    <>
      <button
        onClick={onclick}
        className={clsx(
          "cursor-pointer transition-all duration-200 ",
          {
            "bg-white rounded-lg text-[#09976F] hover:shadow-md shadow-[#09976F]/30 outline-1 outline-[#09976F] hover:outline-[2px] active:outline-1 active:shadow-none ":
              variant === "primary",
            "bg-[#1D8A45] text-white hover:bg-white hover:text-[#09976F] border hover:border-[#09976F]":
              variant === "secondary",
            "text-[#09976F] 2xl:text-base md:text-sm hover:underline ": variant === "link",
          },
          classname
        )}>
        {children}
      </button>
    </>
  );
};

export default Button;
