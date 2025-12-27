import type React from "react";

type TooltipProps = {
  label: string;
  children: React.ReactNode;
};

const Tooltip = ({ label, children }: TooltipProps) => {
  return (
    <div className="relative inline-block group">
      {children}

      <div
        className="
          pointer-events-none
          absolute
          top-full
          left-1/2
          -translate-x-1/2
          mt-2
          opacity-0
          group-hover:opacity-100
          transition-opacity
          duration-200
          bg-orange-100
          outline outline-orange-400
          rounded-xl
          px-3 py-2
          z-50
          md:text-sm
          2xl:text-base
          whitespace-nowrap
         wrap-anywhere text-wrap
        ">
        {label}
      </div>
    </div>
  );
};

export default Tooltip;
