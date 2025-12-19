import { Eye, EyeOff } from "lucide-react";
import type { InputProps } from "../../types/type";
import clsx from "clsx";

const Input = ({
  label,
  name,
  type,
  placeholder,
  htmlFor,
  classname,
  value,
  onchange,
  icon,
  variant,
  tooglePassword,
  showPassword,
  labelLayout = "block",
  iconPosition = "left",
}: InputProps) => {
  return (
    <>
      <div
        className={`flex ${
          labelLayout === "inline" ? "flex-row items-center" : "flex-col"
        } gap-2 w-full ${classname}`}>
        {label ? (
          <label
            htmlFor={htmlFor}
            className="font-semibold 2xl:text-md text-sm">
            {label}
          </label>
        ) : null}
        <div
          className={clsx(
            `flex 2xl:p-3 md:p-2 p-3 gap-3 w-full ${
              iconPosition === "left"
                ? ""
                : iconPosition === "right"
                ? "flex-row-reverse"
                : ""
            }`,
            {
              "rounded-lg text-sm outline-[#3BC15254] outline-2 bg-white":
                variant === "primary",
              "rounded-lg text-sm outline outline-gray-400 bg-white":
                variant === "secondary",
              "rounded-full text-sm bg-[#F2F2F2]": variant === "third",
              "rounded-lg bg-white outline text-sm outline-[#E5E5E5] text-[#000000AB]":
                variant === "disable",
            }
          )}>
          {icon}
          <input
            readOnly={variant === "disable"}
            onChange={onchange}
            value={value}
            name={name}
            type={type}
            placeholder={placeholder}
            className="w-full outline-none 2xl:placeholder:text-md md:placeholder:text-sm placeholder:text-black/65 "
          />
          {name === "password" ? (
            <button className="cursor-pointer" onClick={tooglePassword}>
              {showPassword ? (
                <Eye color="#8BEC89" size={20} />
              ) : (
                <EyeOff color="#8BEC89" size={20} />
              )}
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Input;
