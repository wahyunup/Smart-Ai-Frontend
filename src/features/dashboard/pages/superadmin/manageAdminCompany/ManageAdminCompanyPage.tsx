import { useEffect, useState } from "react";
import MainLayout from "../../../../../shared/layouts/MainLayout";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../../../../shared/components/ui/Button";
import Input from "../../../../../shared/components/ui/Input";
import TableHeaderList from "../../../../../shared/components/common/Table/TableHeaderList";
import TableBody from "../../../../../shared/components/common/Table/TableBody";
import { ChevronDown, Search } from "lucide-react";
import { allAdminApi } from "../../../services/superadmin/ManageAdmin";
import Tooltip from "../../../../../shared/components/common/Tooltip/Tooltip";

const ManageAdminCompanyPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initParamsPage = Number(searchParams.get("page")) || 1;
  const [page, setPage] = useState(initParamsPage);
  const [totalPage, setTotalPage] = useState(120);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState([]);
  const [isLoadingDelete, setIsLoadingDelete] = useState<number>(0);
  const [isOpenStat, setIsOpenStat] = useState<number | null>(null);

  const navigate = useNavigate();

  const fetchAllAdmin = async () => {
    setIsLoading(true);
    try {
      const res = await allAdminApi(page, 4);
      setPage(res.current_page);
      setData(res.admins);
      setTotalPage(res.total_page);
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchAllAdmin();
  }, [page]);

  const handleStatUser = async (id: number, is_active: boolean) => {
    console.log(id); console.log(is_active);
    
    
    try {
      await fetchAllAdmin();
    } catch (error) {
      console.log(error);
    }
  };

  const handleToogleStatus = (id: number) => {
    setIsOpenStat((prev) => (prev === id ? null : id));
  };

  const handleNextPage = () => {
    if (isLoading) return;
    if (page < totalPage) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (isLoading) return;
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const deleteCompany = (id: number) => {
    setIsLoadingDelete(id);
  };

  useEffect(() => {
    setSearchParams({ page: String(page) });
  }, []);
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

export default ManageAdminCompanyPage;
