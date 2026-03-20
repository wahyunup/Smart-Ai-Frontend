import { FilePlus, RotateCcw, Search } from "lucide-react";
import Input from "../../../../../shared/components/ui/Input";
import MainLayout from "../../../../../shared/layouts/MainLayout";
import Button from "../../../../../shared/components/ui/Button";
import TableHeaderList from "../../../../../shared/components/common/Table/TableHeaderList";
import TableBody from "../../../../../shared/components/common/Table/TableBody";
import { formatDate } from "../../../../../shared/utils/FormatDate";
import { useManageDocuments } from "../../../hooks";

export const ManageDocumentsPage = () => {
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
      <div className="p-10 flex flex-col gap-8">
        {/* ── Page header ── */}
        <h1 className="font-syne font-extrabold text-white 2xl:text-3xl md:text-2xl">
          Kelola Dokumen
        </h1>

        <div className="flex flex-col gap-5">
          <h3 className="font-syne font-bold text-white text-lg">
            Daftar Dokumen
          </h3>

          {/* Toolbar */}
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <Input
                value={value}
                onchange={(e) => setValue(e.target.value)}
                variant="primary"
                placeholder="Masukan nama dokumen atau kata kunci"
                name="search"
                type="text"
                htmlFor="search"
                icon={<Search size={16} className="text-[#6B8C80]" />}
              />
            </div>
            <div className="flex gap-3">
              <Button
                variant="secondary"
                classname="px-5 py-2.5 flex items-center gap-2 rounded-[10px]"
              >
                <RotateCcw size={15} />
                Reset Index
              </Button>
              <Button
                onclick={() => navigate("/admin/manage-documents/create")}
                variant="primary"
                classname="group px-5 py-2.5 flex items-center gap-2 rounded-[10px]"
              >
                <FilePlus size={15} />
                Tambah
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-[#0A1A20] border border-[#16FF6E]/[.07] rounded-[20px] overflow-hidden relative">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#16FF6E]/20 to-transparent" />
            <TableHeaderList classname="grid grid-cols-5">
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
                    <span className="font-dm text-[#E8F4F0] text-sm text-center">
                      {item.title}
                    </span>

                    {/* Status badge */}
                    <div className="flex justify-center">
                      <span
                        className={`font-dm font-medium text-xs lowercase px-4 py-1.5 rounded-full
                          ${
                            item.status === "UPLOAD_FAILED" ||
                            item.status === "PROCESSING_FAILED"
                              ? "bg-red-500/10 text-red-400 border border-red-500/20"
                              : item.status === "UPLOADED" ||
                                  item.status === "COMPLETED"
                                ? "bg-[#16FF6E]/10 text-[#16FF6E] border border-[#16FF6E]/20"
                                : item.status === "UPLOADING" ||
                                    item.status === "OCR_PROCESSING" ||
                                    item.status === "PENDING_VALIDATION" ||
                                    item.status === "EMBEDDING"
                                  ? "bg-yellow-400/10 text-yellow-400 border border-yellow-400/20"
                                  : "bg-white/5 text-[#6B8C80] border border-white/10"
                          }`}
                      >
                        {item.status}
                      </span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap justify-center gap-2">
                      {item.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="font-dm text-xs px-3 py-1
                                     bg-[#16FF6E]/[.07] text-[#16FF6E]
                                     border border-[#16FF6E]/15
                                     rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <span className="font-dm text-[#6B8C80] text-sm text-center">
                      {convertDate}
                    </span>
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
