import type { TableHeaderListProps } from "../../../types/type"

const TableHeaderList = ({children, classname}:TableHeaderListProps) => {
    return (
        <>
        <div className={`grid ${classname} font-semibold 2xl:py-10 md:py-7 px-10 2xl:text-base md:text-sm justify-items-center-safe text-[#126F3D]`}>
          {children}
        </div>
        </>
    )
}

export default TableHeaderList