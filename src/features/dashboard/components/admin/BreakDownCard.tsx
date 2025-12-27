import type { BreakDownCardProps } from "../../../../shared/types/type";

const BreakDownCard = ({
  title,
  count,
  icon,
  statCount,
}: BreakDownCardProps) => {
  return (
    <div className=" bg-white rounded-2xl shadow-[0_10px_20px_rgba(0,0,0,0.10)] w-full p-5">
      <div className="flex items-center justify-between gap-5">
        <div className="flex flex-col gap-3">
          <p className="text-[#202224] 2xl:text-base md:text-sm">{title}</p>
          <p className="text-xl font-semibold text-[#202224] ">{count}</p>
        </div>
        {icon}
      </div>
      <div className="flex items-center gap-1 2xl:text-sm md:text-xs mt-5">
        {statCount}
      </div>
    </div>
  );
};

export default BreakDownCard;
