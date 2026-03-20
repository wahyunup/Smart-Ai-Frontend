import MainLayout from "../../../../../shared/layouts/MainLayout";
import Button from "../../../../../shared/components/ui/Button";
import Input from "../../../../../shared/components/ui/Input";
import TableHeaderList from "../../../../../shared/components/common/Table/TableHeaderList";
import TableBody from "../../../../../shared/components/common/Table/TableBody";
import { ChevronDown, Search } from "lucide-react";
import Tooltip from "../../../../../shared/components/common/Tooltip/Tooltip";
import { useManageAdminCompany } from "../../../hooks/superadmin/manageAdminCompany/useManageAdminCompany";

export const ManageAdminCompanyPage = () => {
  const {
    navigate,
    handleNextPage,
    handlePrevPage,
    data,
    page,
    totalPage,
    isLoading,
    isLoadingDelete,
    deleteCompany,
    handleStatUser,
    handleToogleStatus,
    isOpenStat,
    setIsOpenStat,
  } = useManageAdminCompany();

  return (
    <MainLayout>
      <div className="p-10">
        <h1 className="font-syne font-extrabold text-white 2xl:text-2xl md:text-xl mb-6">
          Kelola Admin Perusahaan
        </h1>

        {/* ── Card container ── */}
        <div
          className="bg-[#0A1A20] border border-[#16FF6E]/[.07] rounded-[20px]
                      p-6 relative overflow-hidden"
        >
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#16FF6E]/20 to-transparent" />

          <h2 className="font-syne font-bold text-white 2xl:text-lg md:text-base mb-5">
            Daftar Admin Perusahaan
          </h2>

          <div className="flex justify-between items-center mb-5">
            <Button
              onclick={() =>
                navigate("/superadmin/manage-admin-company/create")
              }
              variant="primary"
              classname="2xl:w-52 2xl:py-3 md:w-40 md:py-2.5 rounded-[10px] font-dm text-sm"
            >
              + Tambah Admin
            </Button>
            <div className="w-80">
              <Input
                icon={<Search size={16} className="text-[#6B8C80]" />}
                variant="primary"
                placeholder="Cari Nama/ID Admin Perusahaan..."
              />
            </div>
          </div>

          <div className="rounded-[14px] overflow-hidden border border-[#16FF6E]/[.07]">
            <TableHeaderList classname="grid-cols-6 bg-[#16FF6E]/[.05]">
              <span className="font-dm text-[#6B8C80] text-xs uppercase tracking-wider">
                ID Admin
              </span>
              <span className="font-dm text-[#6B8C80] text-xs uppercase tracking-wider">
                Nama Admin
              </span>
              <span className="font-dm text-[#6B8C80] text-xs uppercase tracking-wider">
                Email Admin
              </span>
              <span className="font-dm text-[#6B8C80] text-xs uppercase tracking-wider">
                Perusahaan
              </span>
              <span className="font-dm text-[#6B8C80] text-xs uppercase tracking-wider">
                Status Akun
              </span>
            </TableHeaderList>
            <TableBody
              onClickPreview={(id) =>
                navigate(`/superadmin/manage-admin-company/details/${id}`)
              }
              nextPage={handleNextPage}
              prevPage={handlePrevPage}
              classname="grid-cols-6"
              canAction={true}
              data={data}
              page={page}
              onclickEdit={(id) =>
                navigate(`/superadmin/manage-admin-company/edit/${id}`)
              }
              totalPage={totalPage}
              isLoading={isLoadingDelete}
              isLoadingFetch={isLoading}
              onclickDelete={deleteCompany}
              renderItem={(item) => {
                return (
                  <>
                    <span className="font-dm text-[#6B8C80] text-sm">
                      {item.company_id}
                    </span>
                    <span className="font-dm text-[#E8F4F0] text-sm">
                      {item.name}
                    </span>
                    <Tooltip label={item.username}>
                      <span className="font-dm text-[#6B8C80] text-sm w-40 truncate inline-block">
                        {item.username}
                      </span>
                    </Tooltip>
                    <span className="font-dm text-[#6B8C80] text-sm">
                      {item.company_id}
                    </span>
                    <div className="relative">
                      {item.is_active ? (
                        <>
                          <button
                            onClick={() => handleToogleStatus(item.id)}
                            className="flex gap-2 items-center justify-between
                                       bg-[#16FF6E]/10 text-[#16FF6E] border border-[#16FF6E]/20
                                       font-dm font-medium text-xs
                                       w-fit rounded-full px-5 py-1.5 cursor-pointer
                                       hover:bg-[#16FF6E]/15 transition-all duration-200"
                          >
                            Aktif <ChevronDown size={13} />
                          </button>
                          {isOpenStat === item.id && (
                            <div
                              className="absolute z-10 mt-1 w-32
                                          bg-[#0A1A20] border border-[#16FF6E]/20
                                          rounded-[10px] overflow-hidden
                                          shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
                            >
                              <button
                                className="w-full font-dm text-sm text-[#6B8C80] hover:text-[#16FF6E] hover:bg-[#16FF6E]/[.05] px-4 py-2.5 text-left transition-colors duration-200 cursor-pointer"
                                onClick={() => {
                                  handleStatUser(item.id, item.is_active);
                                  setIsOpenStat(null);
                                }}
                              >
                                {!item.is_active ? "Aktif" : "Nonaktif"}
                              </button>
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleToogleStatus(item.id)}
                            className="flex gap-2 items-center justify-between
                                       bg-red-500/10 text-red-400 border border-red-500/20
                                       font-dm font-medium text-xs
                                       w-fit rounded-full px-5 py-1.5 cursor-pointer
                                       hover:bg-red-500/15 transition-all duration-200"
                          >
                            Nonaktif <ChevronDown size={13} />
                          </button>
                          {isOpenStat === item.id && (
                            <div
                              className="absolute z-10 mt-1 w-32
                                          bg-[#0A1A20] border border-[#16FF6E]/20
                                          rounded-[10px] overflow-hidden
                                          shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
                              onClick={() =>
                                handleStatUser(item.id, item.is_active)
                              }
                            >
                              <button
                                className="w-full font-dm text-sm text-[#6B8C80] hover:text-[#16FF6E] hover:bg-[#16FF6E]/[.05] px-4 py-2.5 text-left transition-colors duration-200 cursor-pointer"
                                onClick={() => {
                                  handleStatUser(item.id, item.is_active);
                                  setIsOpenStat(null);
                                }}
                              >
                                {!item.is_active ? "Aktif" : "Nonaktif"}
                              </button>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </>
                );
              }}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
