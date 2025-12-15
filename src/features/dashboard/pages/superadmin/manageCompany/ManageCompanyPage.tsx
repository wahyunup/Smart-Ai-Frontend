import { Search } from "lucide-react";
import Button from "../../../../../shared/components/ui/Button";
import Input from "../../../../../shared/components/ui/Input";
import MainLayout from "../../../../../shared/layouts/MainLayout";
import TableHeaderList from "../../../../../shared/components/common/Table/TableHeaderList";
import TableBody from "../../../../../shared/components/common/Table/TableBody";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const ManageDocumentsPage = () => {
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
  },[]);
  const data = [
    {
      id: 123,
      companyName: "PT cemerlang jaya",
      companyEmail: "cemerlang@smartai.com",
      typeSubscription: "Smart PRO",
      date: "14 Desember 2025",
    },
    {
      id: 1234,
      companyName: "PT cemerlang jaya",
      companyEmail: "cemerlang@smartai.com",
      typeSubscription: "Smart PRO",
      date: "14 Desember 2025",
    },
    {
      id: 12345,
      companyName: "PT cemerlang jaya",
      companyEmail: "cemerlang@smartai.com",
      typeSubscription: "Smart PRO",
      date: "14 Desember 2025",
    },
    {
      id: 123456,
      companyName: "PT cemerlang jaya",
      companyEmail: "cemerlang@smartai.com",
      typeSubscription: "Smart PRO",
      date: "14 Desember 2025",
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
        <h1 className="text-2xl font-semibold">Kelola Perusahaan</h1>

        <div className="p-6 rounded-3xl shadow-2xl bg-white border mt-5">
          <h1 className="text-xl font-semibold">Daftar Perushaaan</h1>
          <div className="flex justify-between items-center mt-5">
            <Button
              onclick={() => navigate("/superadmin/manage-company/create")}
              variant="secondary"
              classname="w-60 py-4 text-sm rounded-xl">
              + Tambah Perusahaan
            </Button>
            <div className="w-100">
              <Input
                icon={<Search />}
                variant="secondary"
                placeholder="Cari Nama/ID Perusahaan..."
              />
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden mt-4 border border-[#B2B2B2]">
            <TableHeaderList classname="grid-cols-6 bg-[#E3F9E8]">
              <span>ID Perusahaan</span>
              <span>Nama Perusahaan</span>
              <span>Email Perusahaan</span>
              <span>Jenis Subscription</span>
              <span>Tanggal Bergabung</span>
            </TableHeaderList>
            <TableBody
              showPreview={true}
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
              renderItem={(item) => {
                return (
                  <>
                    <span>{item.id}</span>
                    <span>{item.companyName}</span>
                    <span>{item.companyEmail}</span>
                    <span>{item.typeSubscription}</span>
                    <span>{item.date}</span>
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

export default ManageDocumentsPage;
