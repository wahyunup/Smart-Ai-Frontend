const Dropdown = ({
  headingDropdown,
  fieldDropdown,
}: {
  headingDropdown: string;
  fieldDropdown: string;
}) => {
  return (
    <>
      <div className="space-y-2">
        <details className="group [&amp;_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white px-4 py-3 font-medium text-gray-900 hover:bg-gray-50">
            <span>{headingDropdown}</span>

            <svg
              className="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"></path>
            </svg>
          </summary>

          <div className="p-4">
            <p className="text-gray-700 text-start">{fieldDropdown}</p>
          </div>
        </details>
      </div>
    </>
  );
};

export default Dropdown;
