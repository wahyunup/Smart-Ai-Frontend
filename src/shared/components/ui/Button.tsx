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
            "bg-white text-red-500 hover:bg-red-50 hover:text-red-500 border hover:border-red-500":
              variant === "cancel secondary",
            "bg-red-500 text-white hover:text-red-50 hover:bg-red-600 border hover:border-red-500":
              variant === "cancel",
            "bg-blue-500 text-white hover:text-red-50 hover:bg-blue-600 border hover:border-blue-500":
              variant === "info",
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
