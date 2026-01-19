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
        <h1 className="2xl:text-2xl md:text-xl font-semibold">
          Kelola Admin Perusahaan
        </h1>

        <div className="p-6 rounded-3xl shadow-2xl bg-white border mt-5">
          <h1 className="2xl:text-xl font-semibold">Daftar Admin Perusahaan</h1>
          <div className="flex justify-between items-center mt-5">
            <Button
              onclick={() =>
                navigate("/superadmin/manage-admin-company/create")
              }
              variant="secondary"
              classname="2xl:w-60 2xl:py-4 md:w-40 md:py-3 2xl:text-sm md:text-xs rounded-xl">
              + Tambah Admin
            </Button>
            <div className="w-100">
              <Input
                icon={<Search />}
                variant="secondary"
                placeholder="Cari Nama/ID Admin Perusahaan..."
              />
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden mt-4 border border-[#B2B2B2]">
            <TableHeaderList classname="grid-cols-6 bg-[#E3F9E8]">
              <span>ID Admin</span>
              <span>Nama Admin</span>
              <span>Email Admin</span>
              <span>Perusahaan</span>
              <span>Status Akun</span>
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
                    <span>{item.company_id}</span>
                    <span>{item.name}</span>
                    <Tooltip label={item.username}>
                      <span className="w-40 truncate inline-block">
                        {item.username}
                      </span>
                    </Tooltip>
                    <span>{item.company_id}</span>
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

