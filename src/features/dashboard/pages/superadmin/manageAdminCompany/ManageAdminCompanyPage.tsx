import { useEffect, useState } from "react";
import MainLayout from "../../../../../shared/layouts/MainLayout";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../../../../shared/components/ui/Button";
import Input from "../../../../../shared/components/ui/Input";
import TableHeaderList from "../../../../../shared/components/common/Table/TableHeaderList";
import TableBody from "../../../../../shared/components/common/Table/TableBody";
import { Search } from "lucide-react";

const ManageAdminCompanyPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initParamsPage = Number(searchParams.get("page")) || 1;
  const [page, setPage] = useState(initParamsPage);
  const [totalPage, setTotalPage] = useState(120);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState<number>(0);
  const navigate = useNavigate();
  useEffect(() => {
    setPage(1);
    setTotalPage(120);
    setIsLoading(false);
  }, []);
  const data = [
    {
      id: 123142423,
      adminName: "PT cemerlang jaya",
      adminEmail: "admin@cemerlang.com",
      company: "cemerlang company",
      status: "active",
    },
    {
      id: 234523452,
      adminName: "PT cemerlang jaya",
      adminEmail: "admin@cemerlang.com",
      company: "cemerlang company",
      status: "active",
    },
    {
      id: 2351235123,
      adminName: "PT cemerlang jaya",
      adminEmail: "admin@cemerlang.com",
      company: "cemerlang company",
      status: "active",
    },
    {
      id: 3456345634,
      adminName: "PT cemerlang jaya",
      adminEmail: "admin@cemerlang.com",
      company: "cemerlang company",
      status: "active",
    },
  ];

  const deleteCompany = (id: number) => {
    setIsLoadingDelete(id);
  };

  useEffect(() => {
    setSearchParams({ page: String(page) });
  }, []);
  return (
    <MainLayout>
      <div className="p-10">
        <h1 className="text-2xl font-semibold">Kelola Admin Perusahaan</h1>

        <div className="p-6 rounded-3xl shadow-2xl bg-white border mt-5">
          <h1 className="text-xl font-semibold">Daftar Admin Perusahaan</h1>
          <div className="flex justify-between items-center mt-5">
            <Button
              onclick={() =>
                navigate("/superadmin/manage-admin-company/create")
              }
              variant="secondary"
              classname="w-60 py-4 text-sm rounded-xl">
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
            onClickPreview={(id) => navigate(`/superadmin/manage-admin-company/details/${id}`)}
              showPreview={true}
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
                    <span>{item.id}</span>
                    <span>{item.adminName}</span>
                    <span>{item.adminEmail}</span>
                    <span>{item.company}</span>
                    <span>{item.status}</span>
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
