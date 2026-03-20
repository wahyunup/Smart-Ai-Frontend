import clsx from "clsx";
import type { ButtonProps } from "../../types/type";

const Button = ({
  onclick,
  children,
  classname,
  variant = "primary",
}: ButtonProps) => {
  return (
    <button
      onClick={onclick}
      className={clsx(
        // base
        "relative cursor-pointer overflow-hidden transition-all duration-[250ms] font-syne font-bold 2xl:text-base md:text-sm rounded-[10px]",
        {
          // ── primary — solid green (main CTA)
          "bg-[#16FF6E] text-[#040B0E] hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(22,255,110,0.4)] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:-translate-x-full before:transition-transform before:duration-500 hover:before:translate-x-full":
            variant === "primary",

          // ── secondary — ghost green outline
          "bg-transparent text-[#E8F4F0] border border-white/[.12] hover:border-[#16FF6E]/30 hover:text-[#16FF6E] hover:-translate-y-0.5":
            variant === "secondary",

          // ── cancel secondary — ghost red outline
          "bg-transparent text-red-400 border border-red-400/20 hover:border-red-400/50 hover:bg-red-400/[.05] hover:-translate-y-0.5":
            variant === "cancel secondary",

          // ── cancel — solid red
          "bg-red-500/90 text-white border border-red-500/20 hover:bg-red-600 hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(239,68,68,0.35)]":
            variant === "cancel",

          // ── info — solid blue
          "bg-blue-500/90 text-white border border-blue-500/20 hover:bg-blue-600 hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(59,130,246,0.35)]":
            variant === "info",

          // ── link — plain text
          "bg-transparent text-[#16FF6E] hover:underline underline-offset-2 rounded-none":
            variant === "link",

          // ── nav — frosted dark pill for sidebar/navbar actions
          // idle  : dark surface + subtle green ring
          // active: green fill bleeds in from left, text snaps to dark
          // hover : glow pulse + shimmer sweep
          "group/nav bg-[#0A1A20] text-[#6B8C80] border border-[#16FF6E]/[.08] rounded-[12px] font-dm font-medium tracking-wide hover:text-[#16FF6E] hover:border-[#16FF6E]/25 hover:bg-[#16FF6E]/[.05] hover:shadow-[0_0_16px_rgba(22,255,110,0.08)] active:scale-[.98] after:absolute after:inset-0 after:rounded-[12px] after:ring-1 after:ring-[#16FF6E]/0 hover:after:ring-[#16FF6E]/15 after:transition-all after:duration-300":
            variant === "nav",
        },
        classname,
      )}
    >
      {children}
    </button>
  );
};

export default Button;
