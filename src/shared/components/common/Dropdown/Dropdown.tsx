const Dropdown = ({
  headingDropdown,
  fieldDropdown,
}: {
  headingDropdown: string;
  fieldDropdown: string;
}) => {
  return (
    <div className="space-y-2">
      <details className="group [&_summary::-webkit-details-marker]:hidden">
        <summary
          className="flex cursor-pointer items-center justify-between gap-4
                     bg-[#0A1A20] border border-[#16FF6E]/[.07]
                     rounded-[14px] md:px-5 md:py-4 px-4 py-3
                     hover:border-[#16FF6E]/20 hover:bg-[#16FF6E]/[.02]
                     transition-all duration-200
                     list-none"
        >
          <span className="font-syne font-semibold text-[14px] text-white">
            {headingDropdown}
          </span>

          <svg
            className="size-4 shrink-0 text-[#6B8C80]
                       transition-transform duration-300 group-open:-rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </summary>

        {/* content */}
        <div
          className="px-5 py-4 border-x border-b border-[#16FF6E]/[.07]
                     rounded-b-[14px] bg-[#0A1A20]/60"
        >
          {/* top divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#16FF6E]/10 to-transparent mb-4" />
          <p className="font-dm text-[#6B8C80] text-sm leading-[1.7] text-start">
            {fieldDropdown}
          </p>
        </div>
      </details>
    </div>
  );
};

export default Dropdown;
