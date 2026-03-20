import TableBody from "../../../../../shared/components/common/Table/TableBody";
import TableHeaderList from "../../../../../shared/components/common/Table/TableHeaderList";
import Button from "../../../../../shared/components/ui/Button";
import Input from "../../../../../shared/components/ui/Input";
import MainLayout from "../../../../../shared/layouts/MainLayout";
import { ChevronDown, FilePlus, Search } from "lucide-react";
import Tooltip from "../../../../../shared/components/common/Tooltip/Tooltip";
import { useManageStaff } from "../../../hooks";

export const ManageStaffPage = () => {
  const {
    data,
    value,
    setValue,
    isLoadingStaff,
    page,
    totalPage,
    getRandomColor,
    isOpenStat,
    handleToogleStatus,
    handleStatUser,
    handleDelete,
    handleEdit,
    handleNextPage,
    handlePrevPage,
    navigate,
    isLoading,
    setIsOpenStat,
  } = useManageStaff();

  return (
    <MainLayout>
      <div className="p-10 flex flex-col gap-8">
        {/* ── Page header ── */}
        <h1 className="font-syne font-extrabold text-white text-3xl">
          Kelola Staff
        </h1>

        {/* ── Card container ── */}
        <div
          className="relative bg-[#0A1A20] border border-[#16FF6E]/[.07]
                      rounded-[20px] p-6 flex flex-col gap-5 overflow-hidden"
        >
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#16FF6E]/20 to-transparent" />

          {/* Toolbar */}
          <div className="flex justify-between items-center">
            <h3 className="font-syne font-bold text-white text-lg">
              Data Staff Perusahaan
            </h3>
            <Button
              onclick={() => navigate("/admin/manage-staff/create")}
              classname="group px-5 py-2.5 flex items-center gap-2 rounded-[10px]"
              variant="primary"
            >
              <FilePlus size={15} />
              Tambah
            </Button>
          </div>

          <div className="w-full max-w-sm">
            <Input
              value={value}
              onchange={(e) => setValue(e.target.value)}
              variant="primary"
              placeholder="Masukan nama atau kata kunci"
              name="search"
              type="text"
              htmlFor="search"
              icon={<Search size={16} className="text-[#6B8C80]" />}
            />
          </div>

          {/* Table */}
          <div className="rounded-[14px] overflow-hidden border border-[#16FF6E]/[.07]">
            <TableHeaderList classname="grid-cols-7">
              <span>Nama</span>
              <span>Username</span>
              <span>Divisi</span>
              <span>Peran</span>
              <span>Pengguna (Qty)</span>
              <span>Status</span>
              <span>Aksi</span>
            </TableHeaderList>
            <TableBody
              isLoadingFetch={isLoadingStaff}
              isLoading={isLoading}
              data={data}
              onclickDelete={handleDelete}
              nextPage={handleNextPage}
              prevPage={handlePrevPage}
              onclickEdit={handleEdit}
              classname="grid-cols-7"
              page={page}
              totalPage={totalPage}
              renderItem={(item) => {
                const bgColor = getRandomColor(item.id);
                return (
                  <>
                    {/* Nama */}
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 overflow-hidden rounded-full shrink-0">
                        {!item.profile_picture_url ? (
                          <div
                            style={{ backgroundColor: bgColor }}
                            className="h-full w-full text-white flex items-center justify-center font-syne font-bold text-sm"
                          >
                            {item.name.slice(0, 1)}
                          </div>
                        ) : (
                          <img
                            className="h-full w-full object-cover"
                            src={item.profile_picture_url}
                            alt=""
                          />
                        )}
                      </div>
                      <Tooltip label={item.name}>
                        <span className="font-dm text-[#E8F4F0] text-sm inline-block w-20 truncate text-start">
                          {item.name}
                        </span>
                      </Tooltip>
                    </div>

                    {/* Username */}
                    <Tooltip label={item.username}>
                      <span className="font-dm text-[#6B8C80] text-sm inline-block w-20 truncate text-center">
                        {item.username}
                      </span>
                    </Tooltip>

                    {/* Divisi */}
                    {item.division === null ? (
                      <span className="font-dm text-[#6B8C80]/50 text-sm text-center italic">
                        Tidak ada
                      </span>
                    ) : (
                      <Tooltip label={item.division}>
                        <span className="font-dm text-[#6B8C80] text-sm inline-block w-20 truncate">
                          {item.division}
                        </span>
                      </Tooltip>
                    )}

                    {/* Peran */}
                    <Tooltip label={item.role}>
                      <span className="font-dm text-[#6B8C80] text-sm inline-block w-20 truncate text-start">
                        {item.role}
                      </span>
                    </Tooltip>

                    {/* Pengguna qty */}
                    <Tooltip label={item.role}>
                      <span className="font-dm text-[#6B8C80] text-sm inline-block w-20 truncate text-start">
                        {item.role}
                      </span>
                    </Tooltip>

                    {/* Status toggle */}
                    <div className="relative">
                      {item.is_active ? (
                        <>
                          <button
                            onClick={() => handleToogleStatus(item.id)}
                            className="flex items-center gap-1.5
                                       bg-[#16FF6E]/10 text-[#16FF6E] border border-[#16FF6E]/20
                                       font-dm font-medium text-xs
                                       w-fit rounded-full px-4 py-1.5 cursor-pointer
                                       hover:bg-[#16FF6E]/15 transition-all duration-200"
                          >
                            Aktif <ChevronDown size={12} />
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
                            className="flex items-center gap-1.5
                                       bg-red-500/10 text-red-400 border border-red-500/20
                                       font-dm font-medium text-xs
                                       w-fit rounded-full px-4 py-1.5 cursor-pointer
                                       hover:bg-red-500/15 transition-all duration-200"
                          >
                            Nonaktif <ChevronDown size={12} />
                          </button>
                          {isOpenStat === item.id && (
                            <div
                              onClick={() =>
                                handleStatUser(item.id, item.is_active)
                              }
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
