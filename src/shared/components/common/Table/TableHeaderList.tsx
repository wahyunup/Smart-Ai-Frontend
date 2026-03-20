import type { TableHeaderListProps } from "../../../types/type";

const TableHeaderList = ({ children, classname }: TableHeaderListProps) => {
  return (
    <div
      className={`grid ${classname}
                  font-dm font-medium
                  2xl:py-4 md:py-3 px-10
                  2xl:text-xs md:text-xs text-xs
                  uppercase tracking-wider
                  justify-items-center-safe
                  text-[#6B8C80]
                  bg-[#16FF6E]/[.05]
                  border-b border-[#16FF6E]/[.07]`}
    >
      {children}
    </div>
  );
};

export default TableHeaderList;
