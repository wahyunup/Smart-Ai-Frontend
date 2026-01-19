import { FilePlus, RotateCcw, Search } from "lucide-react";
import Input from "../../../../../shared/components/ui/Input";
import MainLayout from "../../../../../shared/layouts/MainLayout";
import Button from "../../../../../shared/components/ui/Button";
import TableHeaderList from "../../../../../shared/components/common/Table/TableHeaderList";
import TableBody from "../../../../../shared/components/common/Table/TableBody";
import { formatDate } from "../../../../../shared/utils/FormatDate";
import { useManageDocuments } from "../../../hooks";

const ManageDocuments = () => {
  const {
    data,
    handleDelete,
    handleEdit,
    handleNextPage,
    handlePrevPage,
    isLoading,
    page,
    setValue,
    value,
    navigate,
    totalPage,
  } = useManageDocuments();

  return (
    <MainLayout>
      <div className="p-10 flex flex-col gap-10">
        <h1 className="2xl:text-3xl md:text-2xl font-semibold">
          Kelola Dokumen
        </h1>

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
                const convertDate = formatDate(item.uploaded_at, true);
                return (
                  <>
                    <span className="text-center">{item.title}</span>
                    <div>
                      <span
                        className={`lowercase w-fit px-4 py-1 rounded-full ${
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
                    </div>
                    <div className="flex flex-wrap justify-center gap-2">
                      {item.tags.map((tag: string) => (
                        <span className="bg-[#E3F9E8] px-5 py-2 text-sm text-center rounded-2xl flex gap-2">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <span>{convertDate}</span>
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
