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
          /* ── Skeleton rows ── */
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="justify-between px-10 border-t border-[#16FF6E]/[.05] py-8
                         items-center justify-items-center-safe flex bg-[#16FF6E]/[.02]"
            >
              <div className="h-2.5 bg-[#16FF6E]/[.07] rounded-full w-40 animate-pulse" />
              <div className="h-2.5 bg-[#16FF6E]/[.07] rounded-full w-40 animate-pulse" />
              <div className="h-2.5 bg-[#16FF6E]/[.07] rounded-full w-28 animate-pulse" />
              <div className="h-2.5 bg-[#16FF6E]/[.07] rounded-full w-56 animate-pulse" />
              <div className="h-2.5 bg-[#16FF6E]/[.07] rounded-full w-28 animate-pulse" />
            </div>
          ))
        ) : data.length > 0 ? (
          /* ── Data rows ── */
          data.map((item: any, i) => (
            <div
              key={item.id}
              className={`grid ${classname}
                          justify-between px-10
                          border-t border-[#16FF6E]/[.05]
                          2xl:py-5 md:py-4
                          items-center justify-items-start-safe
                          hover:bg-[#16FF6E]/[.02]
                          transition-all duration-200
                          hover:scale-[1.002] active:scale-[1]
                          text-center md:text-sm 2xl:text-base
                          ${userIsLogin === "admin" ? "cursor-pointer" : ""}`}
            >
              {renderItem?.(item, i)}

              {/* ── Action buttons ── */}
              <div className="flex justify-center">
                {canAction && (
                  <div className="flex items-center gap-1">
                    {canEdit ? (
                      <>
                        {showPreview && (
                          <>
                            <button
                              onClick={() => onClickPreview?.(item?.id)}
                              className="p-2 rounded-lg text-[#6B8C80] hover:text-[#16FF6E]
                                         hover:bg-[#16FF6E]/[.07]
                                         transition-all duration-200 cursor-pointer"
                            >
                              <View className="2xl:size-[18px] md:size-[16px]" />
                            </button>
                            <span className="w-px h-4 bg-[#16FF6E]/[.12]" />
                          </>
                        )}
                        <button
                          onClick={() => onclickEdit?.(item?.id)}
                          className="p-2 rounded-lg text-[#6B8C80] hover:text-[#16FF6E]
                                     hover:bg-[#16FF6E]/[.07]
                                     transition-all duration-200 cursor-pointer"
                        >
                          <SquarePen className="2xl:size-[18px] md:size-[16px]" />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => onclickEdit?.(item?.id)}
                        className="p-2 rounded-lg text-[#6B8C80] hover:text-[#16FF6E]
                                   hover:bg-[#16FF6E]/[.07]
                                   transition-all duration-200 cursor-pointer"
                      >
                        <View className="2xl:size-[18px] md:size-[16px]" />
                      </button>
                    )}

                    <span className="w-px h-4 bg-[#16FF6E]/[.12]" />

                    {isLoading === item.id ? (
                      <button
                        className="p-2 rounded-lg text-[#16FF6E]
                                   hover:bg-[#16FF6E]/[.07]
                                   transition-all duration-200 cursor-pointer"
                      >
                        <Icon
                          icon="line-md:loading-loop"
                          width="18"
                          height="18"
                        />
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          onclickDelete?.(item?.id || item?.company_id)
                        }
                        className="p-2 rounded-lg text-[#6B8C80] hover:text-red-400
                                   hover:bg-red-400/[.07]
                                   transition-all duration-200 cursor-pointer"
                      >
                        <Trash2 className="2xl:size-[18px] md:size-[16px]" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          /* ── Empty state ── */
          <div className="flex flex-col justify-center items-center gap-3 h-28">
            <p className="font-dm text-[#6B8C80] 2xl:text-base md:text-sm">
              Belum terdapat data untuk ditampilkan.
            </p>
          </div>
        )}

        {/* ── Pagination ── */}
        {page && (
          <div
            className="bg-[#16FF6E]/[.03] border-t border-[#16FF6E]/[.07]
                        py-3 px-7 flex 2xl:text-sm md:text-xs
                        items-center gap-3 justify-end font-dm text-[#6B8C80]"
          >
            <p>Halaman</p>
            <button
              onClick={prevPage}
              className="p-1 rounded-lg hover:bg-[#16FF6E]/[.07] hover:text-[#16FF6E]
                         transition-all duration-200 cursor-pointer"
            >
              <ChevronLeft className="2xl:size-[18px] md:size-[16px]" />
            </button>
            <span className="text-[#E8F4F0]">
              {page} <span className="text-[#6B8C80]">sampai</span> {totalPage}
            </span>
            <button
              onClick={nextPage}
              className="p-1 rounded-lg hover:bg-[#16FF6E]/[.07] hover:text-[#16FF6E]
                         transition-all duration-200 cursor-pointer"
            >
              <ChevronRight className="2xl:size-[18px] md:size-[16px]" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default TableBody;
