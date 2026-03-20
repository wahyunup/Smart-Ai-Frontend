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
    <div
      className={`flex ${
        labelLayout === "inline" ? "flex-row items-center" : "flex-col"
      } gap-2 w-full ${classname}`}
    >
      {/* ── Label ── */}
      {label ? (
        <label
          htmlFor={htmlFor}
          className={`font-dm font-medium text-[#6B8C80] 2xl:text-sm md:text-xs ${
            labelLayout === "inline" ? "w-33" : ""
          }`}
        >
          {label}
        </label>
      ) : null}

      {/* ── Input wrapper ── */}
      <div
        className={clsx(
          "group flex gap-3 w-full transition-all duration-200",
          iconPosition === "right" && "flex-row-reverse",
          // primary
          variant === "primary" &&
            "bg-[#0D1F27] border border-[#16FF6E]/[.10] rounded-[10px] px-4 2xl:py-3 md:py-2.5 py-3 focus-within:border-[#16FF6E]/40 focus-within:shadow-[0_0_0_3px_rgba(22,255,110,0.07)]",
          // secondary
          variant === "secondary" &&
            "bg-[#0D1F27] border border-white/[.08] rounded-[10px] px-4 2xl:py-3 md:py-2.5 py-3 focus-within:border-[#16FF6E]/30 focus-within:shadow-[0_0_0_3px_rgba(22,255,110,0.05)]",
          // third
          variant === "third" &&
            "bg-[#0A1A20] border border-white/[.06] rounded-full px-4 2xl:py-3 md:py-2.5 py-3 focus-within:border-[#16FF6E]/30",
          // disable
          variant === "disable" &&
            "bg-[#071219] border border-white/[.04] rounded-[10px] px-4 2xl:py-3 md:py-2.5 py-3 opacity-50 cursor-not-allowed",
        )}
      >
        {/* icon */}
        {icon && (
          <span className="text-[#6B8C80] flex items-center shrink-0">
            {icon}
          </span>
        )}

        {/* input */}
        <input
          readOnly={variant === "disable"}
          onChange={onchange}
          value={value}
          name={name}
          id={htmlFor}
          type={type}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none font-dm
                     2xl:text-sm md:text-xs text-sm
                     text-[#E8F4F0]
                     placeholder:text-[#6B8C80]/60
                     2xl:placeholder:text-sm md:placeholder:text-xs
                     disabled:cursor-not-allowed"
        />

        {/* password toggle */}
        {name?.startsWith("password") || name === "confirmPassword" ? (
          <button
            type="button"
            className="cursor-pointer shrink-0 flex items-center text-[#6B8C80] hover:text-[#16FF6E] transition-colors duration-200"
            onClick={tooglePassword}
          >
            {showPassword ? (
              <Eye className="2xl:size-[18px] md:size-[16px]" />
            ) : (
              <EyeOff className="2xl:size-[18px] md:size-[16px]" />
            )}
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Input;
