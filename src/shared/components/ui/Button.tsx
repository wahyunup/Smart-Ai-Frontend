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
          "cursor-pointer   transition-all duration-200",
          {
            "bg-white rounded-lg text-[#3BC152] px-10 py-4 text-md hover:shadow-md shadow-[#3BC152]/30 outline-1 outline-[#3BC152]  hover:outline-[2px]":
              variant === "primary",
            "bg-[#3BC152] text-white hover:bg-white px-10 py-3 rounded-2xl hover:text-[#3BC152] border hover:border-[#3BC152]":
              variant === "secondary",
            "text-[#3BC152] hover:underline":
              variant === "link",
          },
          classname
        )}>
        {children}
      </button>
    </>
  );
};

export default Button;
