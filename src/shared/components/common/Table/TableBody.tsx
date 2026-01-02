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
  onClickPreview,
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
  if (!data) return;
  return (
    <>
    {data?.map((item, i) => tooltipe?.(item, i))}
      <div>
        {isLoadingFetch ? (
          Array.from({ length: 4 }).map((_, i) => (
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
        ) : data.length > 0 ? (
          data.map((item: any, i) => {
            return (
              <div
                key={item.id}
                className={`grid ${classname} justify-between px-10 border-t border-[#B2B2B2] 2xl:py-6 md:py-5 items-center justify-items-start-safe hover:bg-gray-50 transition-all duration-300 hover:scale-[1.005] active:scale-[1] text-center md:text-sm 2xl:text-base ${
                  userIsLogin === "admin" ? "cursor-pointer" : ""
                }`}>
                {renderItem?.(item, i)}
                <div className="flex justify-center">
                  {canAction && (
                    <div className="flex gap-5 ">
                      <>
                        {canEdit ? (
                          <>
                            {showPreview && (
                              <>
                                <button
                                  onClick={() => onClickPreview?.(item?.id)}
                                  className="p-2 text-[#0B5C37] hover:scale-[1.05] duration-100 transition-all cursor-pointer active:scale-[1] ">
                                  <View size={24} />
                                </button>
                                <span className="border-r-1 border-[#F0F0F0]"></span>
                              </>
                            )}
                            <button
                              onClick={() => onclickEdit?.(item?.id)}
                              className="p-2 text-[#0B5C37] hover:scale-[1.05] duration-100 transition-all cursor-pointer active:scale-[1] ">
                              <SquarePen className="2xl:size-[24px] md:size-[20px]" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => onclickEdit?.(item?.id)}
                              className="p-2 text-[#0B5C37] hover:scale-[1.05] duration-100 transition-all cursor-pointer active:scale-[1] ">
                              <View className="2xl:size-[24px] md:size-[20px]" />
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
                            onClick={() => onclickDelete?.(item?.id || item?.company_id)}
                            className="p-2 text-[#0B5C37] hover:scale-[1.05] duration-100 transition-all cursor-pointer active:scale-[1]">
                            <Trash2 className="2xl:size-[24px] md:size-[20px]" />
                          </button>
                        )}
                      </>
                    </div>
                  )}
                </div>
                
              </div>
            );
          })
        ) : (
          <div className="flex justify-center 2xl:text-base md:text-sm h-20 items-center">
            <p>Belum terdapat data untuk ditampilkan.</p>
          </div>
        )}
        {page && (
          <div className="bg-gray-100 py-3 px-7 flex 2xl:text-base md:text-sm items-center gap-3 justify-end">
            <p>Halaman</p>
            <button onClick={prevPage} className="cursor-pointer">
              <ChevronLeft className="2xl:size-[20px] md:size-[20px]" />
            </button>

            <span>
              {page} sampai {totalPage}
            </span>
            <button onClick={nextPage} className="cursor-pointer">
              <ChevronRight className="2xl:size-[20px] md:size-[20px]" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default TableBody;
