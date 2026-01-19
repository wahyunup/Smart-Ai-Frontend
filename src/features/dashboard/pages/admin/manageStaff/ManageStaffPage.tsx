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
      <div className="p-10 flex flex-col gap-10">
        <h1 className="text-3xl font-semibold">Kelola Staff</h1>

        <div className="flex flex-col gap-3 shadow-2xl p-8 rounded-3xl">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <h3 className="text-xl">Data Staff Perusahaan</h3>
              <Button
                onclick={() => navigate("/admin/manage-staff/create")}
                classname="px-5 flex justify-center py-3 items-center gap-2 rounded-xl"
                variant="secondary">
                Tambah <FilePlus size={20} />
              </Button>
            </div>
            <div className="flex items-center">
              <Input
                value={value}
                onchange={(e) => setValue(e.target.value)}
                variant="secondary"
                placeholder="Masukan nama dokumen atau kata kunci"
                name="search"
                type="text"
                htmlFor="search"
                icon={<Search color="#2F2F2F" />}
              />
              <div className="flex gap-5"></div>
            </div>
          </div>

          <div className="border border-[#B2B2B2] rounded-2xl overflow-hidden">
            <TableHeaderList classname="bg-[#E3F9E8] grid-cols-7">
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
                    {/* nama */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 overflow-hidden rounded-full bg-gray-200">
                        {item.profile_picture_url === null ||
                        !item.profile_picture_url ? (
                          <div
                            style={{ backgroundColor: bgColor }}
                            className="h-full w-full text-white flex items-center justify-center">
                            {item.name.slice(0, 1)}
                          </div>
                        ) : (
                          <img
                            className="h-full w-full"
                            src={item.profile_picture_url}
                            alt=""
                          />
                        )}
                      </div>

                      <Tooltip label={item.name}>
                        <span className="inline-block w-20 truncate text-start">
                          {item.name}
                        </span>
                      </Tooltip>
                    </div>
                    {/* username */}
                    <Tooltip label={item.username}>
                      <span className="inline-block w-20 truncate text-center">
                        {item.username}
                      </span>
                    </Tooltip>

                    {item.division === null ? (
                      <span className="text-center">Tidak ada</span>
                    ) : (
                      <Tooltip label={item.division}>
                        <span className="inline-block w-20 truncate">
                          {item.division}
                        </span>
                      </Tooltip>
                    )}

                    <Tooltip label={item.role}>
                      <span className="inline-block w-20 truncate text-start">
                        {item.role}
                      </span>
                    </Tooltip>
                    <Tooltip label={item.role}>
                      <span className="inline-block w-20 truncate text-start">
                        {item.role}
                      </span>
                    </Tooltip>

                    {/* status */}
                    <div className="relative">
                      {item.is_active ? (
                        <>
                          <button
                            onClick={() => handleToogleStatus(item.id)}
                            className="flex gap-2 justify-between bg-[#00AA58] text-white w-fit rounded-full px-8 py-1.5 cursor-pointer">
                            Aktif <ChevronDown />
                          </button>
                          {isOpenStat === item.id && (
                            <div className="absolute flex flex-col z-1 bg-white 2xl:py-2 md:py-1.5 w-33 mt-1 border 2xl:rounded-xl md:rounded-lg 2xl:text-base md:text-xs">
                              {!item.is_active ? (
                                <button
                                  className="cursor-pointer"
                                  onClick={() => {
                                    handleStatUser(item.id, item.is_active);
                                    setIsOpenStat(null);
                                  }}>
                                  Aktif
                                </button>
                              ) : (
                                <button
                                  className="cursor-pointer"
                                  onClick={() => {
                                    handleStatUser(item.id, item.is_active);
                                    setIsOpenStat(null);
                                  }}>
                                  Nonaktif
                                </button>
                              )}
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleToogleStatus(item.id)}
                            className="cursor-pointer text-center bg-[#DB3726] text-white w-fit rounded-full px-8 py-1.5 flex gap-2 items-center ">
                            Nonaktif
                            <ChevronDown />
                          </button>
                          {isOpenStat === item.id && (
                            <div
                              onClick={() =>
                                handleStatUser(item.id, item.is_active)
                              }
                              className="absolute flex flex-col z-3 bg-white py-2 w-33 mt-1 border rounded-xl 2xl:text-base md:text-xs 2xl:rounded-xl md:rounded-lg 2xl:py-2 md:py-1.5">
                              {!item.is_active ? (
                                <button
                                  className="cursor-pointer"
                                  onClick={() => {
                                    handleStatUser(item.id, item.is_active);
                                    setIsOpenStat(null);
                                  }}>
                                  Aktif
                                </button>
                              ) : (
                                <button
                                  className="cursor-pointer"
                                  onClick={() => {
                                    handleStatUser(item.id, item.is_active);
                                    setIsOpenStat(null);
                                  }}>
                                  Nonaktif
                                </button>
                              )}
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

