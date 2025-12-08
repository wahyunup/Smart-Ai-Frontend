import { FilePlus, RotateCcw, Search } from "lucide-react";
import Input from "../../../../../shared/components/ui/Input";
import MainLayout from "../../../../../shared/layouts/MainLayout";
import Button from "../../../../../shared/components/ui/Button";
import TableHeaderList from "../../../../../shared/components/common/Table/TableHeaderList";
import TableBody from "../../../../../shared/components/common/Table/TableBody";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  deleteDocument,
  getDocuments,
} from "../../../services/admin/ManageDocuments";
import Swal from "sweetalert2";

const ManageDocuments = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initParams = Number(searchParams.get("page")) || 1;
  const initFilterParams = searchParams.get("filter") ?? "";
  const [value, setValue] = useState(initFilterParams);
  const [page, setPage] = useState(initParams);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDocument = async () => {
    setIsLoading(true);
    try {
      const res = await getDocuments(page, 4, value);
      setData(res.documents);
      setTotalPage(res.total_pages);
    } catch (error) {
      console.log(Response.error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDocument();
  }, [page, value]);

  useEffect(() => {
    setSearchParams({ page: String(page), filter: String(value) });
  }, [page, value]);

  const handleEdit = (data_id: number) => {
    const selectedData = data.find(
      (data: { id: number }) => data.id === data_id
    );

    if (selectedData) {
      navigate("/admin/manage-documents/edit", {
        state: { datas: selectedData },
      });
    }
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

  const handleDelete = async (id: number) => {
    try {
      const confirmation = confirm("yakin menghapus dokumen?");
      if (confirmation) {
        await deleteDocument(id);
        Swal.fire({
          text: "dokument berhasil dihapus",
          icon: "warning",
          confirmButtonText: "oke",
        }).then((response) => {
          if (response.isConfirmed) {
            fetchDocument();
          }
        });
      }
    } catch (error: any) {
      Swal.fire({
        text: error.response.data.message,
        icon: "error",
        confirmButtonText: "oke",
      });
    }
  };

  return (
    <MainLayout>
      <div className="p-10 flex flex-col gap-10">
        <h1 className="text-3xl">Kelola Dokumen</h1>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3">
            <h3 className="text-xl">Daftar Dokumen</h3>
            <div className="flex gap-5 items-center">
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
              <div className="flex gap-5">
                <Button
                  classname="w-50 py-3 flex justify-center items-center gap-2 rounded-xl bg-blue-500"
                  variant="secondary">
                  Reset Index <RotateCcw size={20} />
                </Button>
                <Button
                  onclick={() => navigate("/admin/manage-documents/create")}
                  classname="px-5 flex justify-center items-center gap-2 rounded-xl"
                  variant="secondary">
                  Tambah <FilePlus size={20} />
                </Button>
              </div>
            </div>
          </div>

          <div className="border border-[#B2B2B2] rounded-2xl overflow-hidden">
            <TableHeaderList classname="grid bg-[#E3F9E8] grid-cols-5">
              <span>Judul</span>
              <span>Status</span>
              <span>Konten/Tag</span>
              <span>Tanggal Unggah</span>
            </TableHeaderList>
            <TableBody
              isLoadingFetch={isLoading}
              onclickDelete={handleDelete}
              nextPage={handleNextPage}
              prevPage={handlePrevPage}
              onclickEdit={handleEdit}
              classname="grid grid-cols-5"
              data={data}
              page={page}
              totalPage={totalPage}
              renderItem={(item) => {
                const uploadedAt = new Date(item.uploaded_at);
                const formattedDate = uploadedAt.toLocaleString("id-ID", {
                  timeZone: "Asia/Jakarta",
                  dateStyle: "long",
                  timeStyle: "medium",
                });
                return (
                  <>
                    <span className="text-center">{item.title}</span>
                    <span
                      className={`lowercase px-4 py-1 rounded-full ${
                        item.status === "UPLOAD_FAILED" ||
                        item.status === "PROCESSING_FAILED"
                          ? "bg-red-700 text-white"
                          : item.status === "UPLOADED" ||
                            item.status === "COMPLETED"
                          ? "bg-green-600 text-white"
                          : item.status === "UPLOADING" ||
                            item.status === "OCR_PROCESSING" ||
                            item.status === "PENDING_VALIDATION" ||
                            item.status === "EMBEDDING"
                          ? "bg-orange-500 text-white"
                          : ""
                      }`}>
                      {item.status}
                    </span>
                    <div className="flex flex-wrap justify-center gap-2">
                      {item.tags.map((tag: string) => (
                        <span className="bg-[#E3F9E8] px-5 py-2 text-sm text-center rounded-2xl flex gap-2">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <span>{formattedDate}</span>
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

export default ManageDocuments;
