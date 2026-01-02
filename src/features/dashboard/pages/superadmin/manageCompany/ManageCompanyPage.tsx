import { ChevronDown, Search } from "lucide-react";
import Button from "../../../../../shared/components/ui/Button";
import Input from "../../../../../shared/components/ui/Input";
import MainLayout from "../../../../../shared/layouts/MainLayout";
import TableHeaderList from "../../../../../shared/components/common/Table/TableHeaderList";
import TableBody from "../../../../../shared/components/common/Table/TableBody";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  allCompanyApi,
  deleteCompanyApi,
  toggleIsActiveApi,
} from "../../../services/superadmin/ManageCompany";
import Tooltip from "../../../../../shared/components/common/Tooltip/Tooltip";
import Swal from "sweetalert2";
import { Icon } from "@iconify/react";

const ManageDocumentsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initParamsPage = Number(searchParams.get("page")) || 1;
  const initParamsSearch = searchParams.get("search") ?? "";
  const [filter, setFilter] = useState(initParamsSearch);
  const [page, setPage] = useState(initParamsPage);
  const [totalPage, setTotalPage] = useState(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingToggle, setIsLoadingToggle] = useState<number | null>(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState<number>(0);
  const [isOpenStat, setIsOpenStat] = useState<number | null>(null);

  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const fetchAllCompany = async () => {
    setIsLoading(true);
    try {
      const res = await allCompanyApi(page, 4, filter);
      console.log(res);

      const destructerCompany = res.companies.map((item: any) => ({
        ...item,
        id: item.company_id,
      }));
      setData(destructerCompany);
      setPage(res.current_page);
      setTotalPage(res.total_page);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCompany();
  }, [filter, page]);

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

  const handleStatUser = async (id: number, is_active: boolean) => {
    setIsLoadingToggle(id);
    try {
      await toggleIsActiveApi(id, is_active);
      await fetchAllCompany();
    } catch (error: any) {
      Swal.fire({
        text: error.response.data.message,
        icon: "error",
        confirmButtonText: "oke",
        confirmButtonColor: "#DB3726",
        buttonsStyling: true,
        customClass: {
          confirmButton: "danger-button",
        },
      });
    } finally {
      setIsLoadingToggle(null);
    }
  };

  const handleToogleStatus = (id: number) => {
    setIsOpenStat((prev) => (prev === id ? null : id));
  };

  const deleteCompany = async (id: number) => {
    setIsLoadingDelete(id);
    try {
      Swal.fire({
        text: "yakin ingin menghapus perusahaan?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "Batal",
        confirmButtonColor: "#DB3726",
        cancelButtonColor: "#F2F2F2",
        buttonsStyling: true,
        customClass: {
          confirmButton: "danger-button",
          cancelButton: "disable-button",
        },
      }).then(async (response) => {
        if (response.isConfirmed) {
          await deleteCompanyApi(id);
          Swal.fire({
            text: "perusahaan berhasil dihapus",
            icon: "success",
            confirmButtonText: "oke",
            confirmButtonColor: "#2BA54B",
            buttonsStyling: true,
            customClass: {
              confirmButton: "primary-button",
            },
          }).then(async (response) => {
            if (response.isConfirmed) {
              fetchAllCompany();
            }
          });
        }
      });
    } catch (error: any) {
      Swal.fire({
        text: error.response.data.message,
        icon: "error",
        confirmButtonText: "oke",
        confirmButtonColor: "#DB3726",
        buttonsStyling: true,
        customClass: {
          confirmButton: "danger-button",
        },
      });
    } finally {
      setIsLoadingDelete(0);
    }
  };

  useEffect(() => {
    setSearchParams({ page: String(page), filter: String(filter) });
  }, [page, filter]);
  return (
    <MainLayout>
      <div className="p-10">
        <h1 className="2xl:text-2xl md:text-xl font-semibold">
          Kelola Perusahaan
        </h1>

        <div className="p-6 rounded-3xl shadow-2xl bg-white border mt-5">
          <h1 className="2xl:text-xl font-semibold">Daftar Perushaaan</h1>
          <div className="flex justify-between items-center mt-5">
            <Button
              onclick={() => navigate("/superadmin/manage-company/create")}
              variant="secondary"
              classname="2xl:w-60 2xl:py-4 md:w-50 md:py-3 2xl:text-sm md:text-xs rounded-xl">
              + Tambah Perusahaan
            </Button>
            <div className="2xl:w-100 md:w-80">
              <Input
                onchange={(e) => setFilter(e.target.value)}
                icon={<Search className="2xl:size-[24px] md:size-[20px]" />}
                variant="secondary"
                placeholder="Cari Nama/ID Perusahaan..."
              />
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden mt-4 border border-[#B2B2B2]">
            <TableHeaderList classname="grid-cols-6 bg-[#E3F9E8]">
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
                    <span>{item.company_code}</span>
                    <span>{item.company_name}</span>
                    <span>{item.admin_name}</span>
                    <Tooltip label={item.company_email}>
                      <span className=" inline-block truncate w-40">
                        {item.company_email}
                      </span>
                    </Tooltip>
                    <div className="flex justify-center">
                      <div className="relative">
                        {item.company_is_active ? (
                          <>
                            {isLoadingToggle === item.company_id ? (
                              <button className="flex gap-2 justify-between bg-[#00AA58] text-white w-fit rounded-full px-8 py-1.5 cursor-pointer">
                                <Icon
                                  icon="line-md:loading-loop"
                                  width="24"
                                  height="24"
                                />
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  handleToogleStatus(item.company_id)
                                }
                                className="flex gap-2 justify-between bg-[#00AA58] text-white w-fit rounded-full px-8 py-1.5 cursor-pointer">
                                Aktif <ChevronDown />
                              </button>
                            )}
                            {isOpenStat === item.company_id && (
                              <div className="absolute flex flex-col z-1 bg-white 2xl:py-2 md:py-1.5 w-33 mt-1 border 2xl:rounded-xl md:rounded-lg 2xl:text-base md:text-xs">
                                {!item.company_is_active ? (
                                  <button
                                    className="cursor-pointer"
                                    onClick={() => {
                                      handleStatUser(
                                        item.company_id,
                                        !item.company_is_active
                                      );
                                      setIsOpenStat(null);
                                    }}>
                                    Aktif
                                  </button>
                                ) : (
                                  <button
                                    className="cursor-pointer"
                                    onClick={() => {
                                      handleStatUser(
                                        item.company_id,
                                        !item.company_is_active
                                      );
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
                            {isLoadingToggle ? (
                              <button className="cursor-pointer text-center bg-[#DB3726] text-white w-fit rounded-full px-8 py-1.5 flex gap-2 items-center ">
                                <Icon
                                  icon="line-md:loading-loop"
                                  width="24"
                                  height="24"
                                />
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  handleToogleStatus(item.company_id)
                                }
                                className="cursor-pointer text-center bg-[#DB3726] text-white w-fit rounded-full px-8 py-1.5 flex gap-2 items-center ">
                                Nonaktif
                                <ChevronDown />
                              </button>
                            )}

                            {isOpenStat === item.company_id && (
                              <div
                                onClick={() =>
                                  handleStatUser(
                                    item.company_id,
                                    !item.company_is_active
                                  )
                                }
                                className="absolute flex flex-col z-3 bg-white py-2 w-33 mt-1 border rounded-xl 2xl:text-base md:text-xs 2xl:rounded-xl md:rounded-lg 2xl:py-2 md:py-1.5">
                                {!item.company_is_active ? (
                                  <button
                                    className="cursor-pointer"
                                    onClick={() => {
                                      handleStatUser(
                                        item.company_id,
                                        !item.company_is_active
                                      );
                                      setIsOpenStat(null);
                                    }}>
                                    Aktif
                                  </button>
                                ) : (
                                  <button
                                    className="cursor-pointer"
                                    onClick={() => {
                                      handleStatUser(
                                        item.company_id,
                                        !item.company_is_active
                                      );
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

export default ManageDocumentsPage;
