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
  labelLayout = "block",
  iconPosition = "left"
}: InputProps) => {
  return (
    <>
      <div className={`flex ${labelLayout === "inline" ? "flex-row items-center" : "flex-col"} gap-2 w-full ${classname}`}>
        {label ? (
          <label
            htmlFor={htmlFor}
            className="font-semibold 2xl:text-md md:text-sm">
            {label}
          </label>
        ) : null}
        <div
          className={clsx(`flex 2xl:p-3 md:p-2 gap-3  w-full ${iconPosition === "left" ? "" : iconPosition === "right" ?  "flex-row-reverse" : ""}`, {
            "rounded-lg text-sm outline-[#3BC15254] outline-2 bg-white": variant === "primary",
            "rounded-2xl text-sm outline outline-gray-400 bg-white": variant === "secondary",
            "rounded-full text-sm bg-[#F2F2F2]": variant === "third",
            "rounded-lg bg-white outline text-sm outline-[#E5E5E5] text-[#000000AB]": variant === "disable",
          })}>
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
        </div>
      </div>
    </>
  );
};

export default Input;
