import {
  ChevronLeft,
  ChevronRight,
  SquarePen,
  Trash2,
  View,
} from "lucide-react";
import type { TableBodyProps } from "../../../types/type";
import { Icon } from "@iconify/react";

const TableBody = ({
  data,
  onclickEdit,
  onclickDelete,
  renderItem,
  classname,
  userIsLogin,
  nextPage,
  prevPage,
  page,
  totalPage,
  canEdit = true,
  isLoading,
  canAction = true,
  tooltipe,
  isLoadingFetch,
  showPreview,
}: TableBodyProps) => {
  return (
    <>
      {data?.map((item, i) => tooltipe?.(item, i))}
      <div>
        {isLoadingFetch
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="justify-between px-10 border-t border-[#B2B2B2] py-10 items-center justify-items-center-safe flex bg-gray-50">
                <div className="h-3 bg-gray-200 rounded-full w-40 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded-full w-40 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded-full w-30 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded-full w-60 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded-full w-30 animate-pulse"></div>
              </div>
            ))
          : data?.map((item: any, i) => (
              <div
                key={item.id}
                className={`grid ${classname} justify-between px-10 border-t border-[#B2B2B2] py-6 items-center justify-items-center-safe hover:bg-gray-50 transition-all duration-300 hover:scale-[1.005] active:scale-[1]  ${
                  userIsLogin === "admin" ? "cursor-pointer" : ""
                }`}>
                {renderItem?.(item, i)}

                {canAction && (
                  <div className="flex gap-5 ">
                    <>
                      {canEdit ? (
                        <>
                          {showPreview && (
                            <>
                              <button
                                onClick={() => onclickEdit?.(item?.id)}
                                className="p-2 text-[#0B5C37] hover:scale-[1.05] duration-100 transition-all cursor-pointer active:scale-[1] ">
                                <View size={24} />
                              </button>
                              <span className="border-r-1 border-[#F0F0F0]"></span>
                            </>
                          )}

                          <button
                            onClick={() => onclickEdit?.(item?.id)}
                            className="p-2 text-[#0B5C37] hover:scale-[1.05] duration-100 transition-all cursor-pointer active:scale-[1] ">
                            <SquarePen size={24} />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => onclickEdit?.(item?.id)}
                            className="p-2 text-[#0B5C37] hover:scale-[1.05] duration-100 transition-all cursor-pointer active:scale-[1] ">
                            <View size={24} />
                          </button>
                        </>
                      )}

                      <span className="border-r-1 border-[#F0F0F0]"></span>
                      {isLoading === item.id ? (
                        <button className="p-2 text-[#0B5C37] hover:scale-[1.05] duration-100 transition-all cursor-pointer active:scale-[1]">
                          <Icon
                            icon="line-md:loading-loop"
                            width="24"
                            height="24"
                          />
                        </button>
                      ) : (
                        <button
                          onClick={() => onclickDelete?.(item?.id)}
                          className="p-2 text-[#0B5C37] hover:scale-[1.05] duration-100 transition-all cursor-pointer active:scale-[1]">
                          <Trash2 size={24} />
                        </button>
                      )}
                    </>
                  </div>
                )}
              </div>
            ))}
        {page && (
          <div className="bg-gray-100 py-3 px-7 flex items-center gap-3 justify-end">
            <p>Halaman</p>
            <button onClick={prevPage} className="cursor-pointer">
              <ChevronLeft />
            </button>

            <span>
              {page} sampai {totalPage}
            </span>
            <button onClick={nextPage} className="cursor-pointer">
              <ChevronRight />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default TableBody;
