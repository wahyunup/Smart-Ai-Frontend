import type { TableHeaderListProps } from "../../../types/type"

const TableHeaderList = ({children, classname}:TableHeaderListProps) => {
    return (
        <>
        <div className={`grid ${classname} text-black py-10 px-10 justify-items-center-safe`}>
          {children}
        </div>
        </>
    )
}

export default TableHeaderList