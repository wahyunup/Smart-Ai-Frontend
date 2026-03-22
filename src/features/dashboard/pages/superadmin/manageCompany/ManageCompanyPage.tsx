import { ChevronDown, Search } from "lucide-react";
import Button from "../../../../../shared/components/ui/Button";
import Input from "../../../../../shared/components/ui/Input";
import MainLayout from "../../../../../shared/layouts/MainLayout";
import TableHeaderList from "../../../../../shared/components/common/Table/TableHeaderList";
import TableBody from "../../../../../shared/components/common/Table/TableBody";
import Tooltip from "../../../../../shared/components/common/Tooltip/Tooltip";
import { Icon } from "@iconify/react";
import React from "react";
import { useManageCompany } from "../../../hooks";

export const ManageCompanyPage = () => {
  const {
    data,
    deleteCompany,
    handleNextPage,
    handlePrevPage,
    handleStatUser,
    handleToogleStatus,
    isLoading,
    isLoadingDelete,
    isLoadingToggle,
    isOpenStat,
    navigate,
    page,
    totalPage,
    setIsOpenStat,
    handleOnChange,
  } = useManageCompany();

  return (
    <MainLayout>
      <div className="p-10">
        {/* ── Page header ── */}
        <h1 className="font-syne font-extrabold text-white 2xl:text-2xl md:text-xl mb-6">
          Kelola Perusahaan
        </h1>

        {/* ── Card container ── */}
        <div
          className="bg-[#0A1A20] border border-[#16FF6E]/[.07] rounded-[20px]
                      p-6 relative overflow-hidden"
        >
          {/* shimmer top line */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#16FF6E]/20 to-transparent" />

          <h2 className="font-syne font-bold text-white 2xl:text-lg md:text-base mb-5">
            Daftar Perusahaan
          </h2>

          {/* ── Toolbar ── */}
          <div className="flex justify-between items-center mb-5">
            {/* <Button
              onclick={() => navigate("/superadmin/manage-company/create")}
              variant="primary"
              classname="2xl:w-56 2xl:py-3 md:w-48 md:py-2.5 rounded-[10px] font-dm text-sm"
            >
              + Tambah Perusahaan
            </Button> */}
            <div className="2xl:w-96 md:w-72">
              <Input
                onchange={(e) => handleOnChange(e)}
                icon={
                  <Search className="2xl:size-[16px] md:size-[14px] text-[#6B8C80]" />
                }
                variant="primary"
                placeholder="Cari Nama/ID Perusahaan..."
              />
            </div>
          </div>

          {/* ── Table ── */}
          <div className="rounded-[14px] overflow-hidden border border-[#16FF6E]/[.07]">
            <TableHeaderList classname="grid-cols-6">
              <span>ID Perusahaan</span>
              <span>Nama Perusahaan</span>
              <span>Nama Admin</span>
              <span>Email Perusahaan</span>
              <span>Status Akun</span>
            </TableHeaderList>

            <TableBody
              showPreview={false}
              classname="grid-cols-6"
              canAction={true}
              data={data}
              page={page}
              onclickEdit={(id) =>
                navigate(`/superadmin/manage-company/edit/${id}`)
              }
              totalPage={totalPage}
              isLoading={isLoadingDelete}
              isLoadingFetch={isLoading}
              onclickDelete={deleteCompany}
              nextPage={handleNextPage}
              prevPage={handlePrevPage}
              renderItem={(item) => {
                return (
                  <React.Fragment key={item.company_id}>
                    <span className="font-dm text-[#6B8C80] text-sm">
                      {item.company_code}
                    </span>
                    <span className="font-dm text-[#E8F4F0] text-sm">
                      {item.company_name}
                    </span>
                    <span className="font-dm text-[#6B8C80] text-sm">
                      {item.admin_name}
                    </span>
                    <Tooltip label={item.company_email}>
                      <span className="font-dm text-[#6B8C80] text-sm inline-block truncate w-40">
                        {item.company_email}
                      </span>
                    </Tooltip>

                    {/* ── Status toggle ── */}
                    <div className="flex justify-center">
                      <div className="relative">
                        {item.company_is_active ? (
                          <>
                            {isLoadingToggle === item.company_id ? (
                              <button
                                className="flex items-center justify-center gap-2
                                           bg-[#16FF6E]/10 text-[#16FF6E] border border-[#16FF6E]/20
                                           font-dm font-medium text-xs
                                           w-fit rounded-full px-5 py-1.5 cursor-pointer"
                              >
                                <Icon
                                  icon="line-md:loading-loop"
                                  width="16"
                                  height="16"
                                />
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  handleToogleStatus(item.company_id)
                                }
                                className="flex items-center gap-2
                                           bg-[#16FF6E]/10 text-[#16FF6E] border border-[#16FF6E]/20
                                           font-dm font-medium text-xs
                                           w-fit rounded-full px-5 py-1.5 cursor-pointer
                                           hover:bg-[#16FF6E]/15 transition-all duration-200"
                              >
                                Aktif <ChevronDown size={13} />
                              </button>
                            )}
                            {isOpenStat === item.company_id && (
                              <div
                                className="absolute z-10 mt-1 w-32
                                            bg-[#0A1A20] border border-[#16FF6E]/20
                                            rounded-[10px] overflow-hidden
                                            shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
                              >
                                <button
                                  className="w-full font-dm text-sm text-[#6B8C80]
                                             hover:text-[#16FF6E] hover:bg-[#16FF6E]/[.05]
                                             px-4 py-2.5 text-left
                                             transition-colors duration-200 cursor-pointer"
                                  onClick={() => {
                                    handleStatUser(
                                      item.company_id,
                                      !item.company_is_active,
                                    );
                                    setIsOpenStat(null);
                                  }}
                                >
                                  {!item.company_is_active
                                    ? "Aktif"
                                    : "Nonaktif"}
                                </button>
                              </div>
                            )}
                          </>
                        ) : (
                          <>
                            {isLoadingToggle ? (
                              <button
                                className="flex items-center justify-center gap-2
                                           bg-red-500/10 text-red-400 border border-red-500/20
                                           font-dm font-medium text-xs
                                           w-fit rounded-full px-5 py-1.5 cursor-pointer"
                              >
                                <Icon
                                  icon="line-md:loading-loop"
                                  width="16"
                                  height="16"
                                />
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  handleToogleStatus(item.company_id)
                                }
                                className="flex items-center gap-2
                                           bg-red-500/10 text-red-400 border border-red-500/20
                                           font-dm font-medium text-xs
                                           w-fit rounded-full px-5 py-1.5 cursor-pointer
                                           hover:bg-red-500/15 transition-all duration-200"
                              >
                                Nonaktif <ChevronDown size={13} />
                              </button>
                            )}
                            {isOpenStat === item.company_id && (
                              <div
                                onClick={() =>
                                  handleStatUser(
                                    item.company_id,
                                    !item.company_is_active,
                                  )
                                }
                                className="absolute z-10 mt-1 w-32
                                            bg-[#0A1A20] border border-[#16FF6E]/20
                                            rounded-[10px] overflow-hidden
                                            shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
                              >
                                <button
                                  className="w-full font-dm text-sm text-[#6B8C80]
                                             hover:text-[#16FF6E] hover:bg-[#16FF6E]/[.05]
                                             px-4 py-2.5 text-left
                                             transition-colors duration-200 cursor-pointer"
                                  onClick={() => {
                                    handleStatUser(
                                      item.company_id,
                                      !item.company_is_active,
                                    );
                                    setIsOpenStat(null);
                                  }}
                                >
                                  {!item.company_is_active
                                    ? "Aktif"
                                    : "Nonaktif"}
                                </button>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </React.Fragment>
                );
              }}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
