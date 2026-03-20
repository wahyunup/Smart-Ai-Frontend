import type { BreakDownCardProps } from "../../../../shared/types/type";

const BreakDownCard = ({
  title,
  count,
  icon,
  statCount,
}: BreakDownCardProps) => {
  return (
    <div
      className="group relative bg-[#0A1A20] border border-[#16FF6E]/[.07]
                 rounded-[20px] w-full p-5 overflow-hidden
                 transition-all duration-300
                 hover:border-[#16FF6E]/20 hover:-translate-y-0.5
                 hover:shadow-[0_20px_60px_rgba(22,255,110,0.06)]"
    >
      {/* shimmer top line */}
      <div
        className="absolute top-0 left-0 right-0 h-px
                    bg-gradient-to-r from-transparent via-[#16FF6E] to-transparent
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />

      <div className="flex items-center justify-between gap-5">
        <div className="flex flex-col gap-3">
          <p className="font-dm text-[#6B8C80] 2xl:text-base md:text-sm">
            {title}
          </p>
          <p className="font-syne text-xl font-bold text-white">{count}</p>
        </div>
        {/* icon wrapper — matches SectionWhoWeAre icon box */}
        <div
          className="w-12 h-12 shrink-0 rounded-[14px]
                      bg-[#16FF6E]/[.07] border border-[#16FF6E]/[.12]
                      flex items-center justify-center text-[#16FF6E]"
        >
          {icon}
        </div>
      </div>

      <div className="flex items-center gap-1 font-dm 2xl:text-sm md:text-xs mt-5 text-[#6B8C80]">
        {statCount}
      </div>
    </div>
  );
};

export default BreakDownCard;
