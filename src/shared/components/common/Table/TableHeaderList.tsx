import type { TableHeaderListProps } from "../../../types/type"

const TableHeaderList = ({children, classname}:TableHeaderListProps) => {
    return (
        <>
        <div className={`grid ${classname} font-semibold py-10 px-10 justify-items-center-safe text-[#126F3D]`}>
          {children}
        </div>
        </>
    )
}

export default TableHeaderList