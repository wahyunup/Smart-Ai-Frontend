import { CloudUpload } from "lucide-react";
import MainLayout from "../../../../../shared/layouts/MainLayout";
import Input from "../../../../../shared/components/ui/Input";
import Button from "../../../../../shared/components/ui/Button";
import { Icon } from "@iconify/react";
import { useAddDocuments } from "../../../hooks";

export const AddDocumentPage = () => {
  const {
    dataEdit,
    handleOnChange,
    handleSubmit,
    handleEdit,
    isLoading,
    setDataEdit,
    form,
    navigate,
  } = useAddDocuments();

  const isEditPage = location.pathname === "/admin/manage-documents/edit";

  return (
    <MainLayout>
      <div className="p-10 flex flex-col gap-8">
        {/* ── Page header ── */}
        <h1 className="font-syne font-extrabold text-white text-3xl">
          Kelola Dokumen
        </h1>

        {/* ── Form card ── */}
        <div
          className="relative bg-[#0A1A20] border border-[#16FF6E]/[.07]
                      rounded-[20px] p-8 flex flex-col gap-6 overflow-hidden"
        >
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#16FF6E]/20 to-transparent" />

          <h2 className="font-syne font-bold text-white text-lg">
            {isEditPage ? "Edit Dokumen" : "Upload Dokumen"}
          </h2>

          {isEditPage ? (
            <>
              <Input
                label="Nama Dokumen"
                variant="primary"
                value={dataEdit.title}
                onchange={handleOnChange}
                placeholder="Input teks"
                name="title"
                htmlFor="title"
                classname="gap-6"
                type="text"
                labelLayout="inline"
              />
              <Input
                onchange={handleOnChange}
                label="Konten/Tags"
                value={dataEdit.tags.join(", ")}
                variant="primary"
                placeholder="Input teks"
                htmlFor="tags"
                name="tags"
                classname="gap-10"
                type="text"
                labelLayout="inline"
              />
              <div className="flex gap-8">
                <label
                  htmlFor="extracted_text"
                  className="font-dm font-medium text-[#6B8C80] text-sm shrink-0 w-32"
                >
                  Isi Dokumen
                </label>
                <textarea
                  onChange={(e) =>
                    setDataEdit((prev) => ({
                      ...prev,
                      extracted_text: e.target.value,
                    }))
                  }
                  name="extracted_text"
                  id="extracted_text"
                  placeholder="Input isi dokumen"
                  value={dataEdit.extracted_text}
                  className="w-full px-4 py-3 rounded-[10px] h-48
                             bg-[#0D1F27] border border-[#16FF6E]/[.10]
                             font-dm text-[#E8F4F0] text-sm
                             placeholder:text-[#6B8C80]/60
                             outline-none resize-none
                             focus:border-[#16FF6E]/40
                             focus:shadow-[0_0_0_3px_rgba(22,255,110,0.07)]
                             transition-all duration-200"
                />
              </div>
            </>
          ) : (
            <>
              {/* File upload area */}
              <div className="flex items-center gap-8">
                <span className="font-dm font-medium text-[#6B8C80] text-sm shrink-0">
                  File Dokumen
                </span>
                <div className="relative w-full">
                  <input
                    id="file"
                    type="file"
                    name="file"
                    onChange={handleOnChange}
                    className="absolute inset-0 hidden cursor-pointer"
                  />
                  <label
                    htmlFor="file"
                    className="flex flex-col items-center justify-center gap-3
                               w-full h-36 rounded-[14px] cursor-pointer
                               border border-dashed border-[#16FF6E]/20
                               bg-[#0D1F27]
                               hover:border-[#16FF6E]/40 hover:bg-[#0D1F27]/80
                               transition-all duration-200"
                  >
                    <CloudUpload className="text-[#16FF6E]" size={32} />
                    <span className="font-dm text-sm text-[#6B8C80]">
                      {form.file ? form.file.name : "Klik untuk mengunggah"}
                    </span>
                  </label>
                </div>
              </div>

              <Input
                label="Nama Dokumen"
                variant="primary"
                placeholder="Input teks"
                name="name"
                value={form.name}
                classname="gap-10"
                type="text"
                labelLayout="inline"
                htmlFor="tags"
                onchange={handleOnChange}
              />
              <Input
                label="Konten/Tags"
                variant="primary"
                value={form.tag}
                onchange={handleOnChange}
                placeholder="Input teks"
                name="tag"
                htmlFor="tag"
                classname="gap-13"
                type="text"
                labelLayout="inline"
              />
            </>
          )}
        </div>

        {/* ── Action buttons ── */}
        <div className="flex justify-end gap-3">
          <Button
            variant="cancel"
            classname="py-3 px-6 rounded-[10px]"
            onclick={() => navigate("/admin/manage-documents")}
          >
            Batal
          </Button>
          {isLoading ? (
            <Button
              variant="primary"
              classname="py-3 px-6 rounded-[10px] flex items-center gap-2 opacity-75 cursor-not-allowed pointer-events-none"
            >
              <Icon icon="line-md:loading-loop" width="18" height="18" />
              Menyimpan...
            </Button>
          ) : isEditPage ? (
            <Button
              onclick={handleEdit}
              variant="primary"
              classname="group py-3 px-6 rounded-[10px] flex items-center gap-2"
            >
              Simpan Perubahan
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Button>
          ) : (
            <Button
              onclick={handleSubmit}
              variant="primary"
              classname="group py-3 px-6 rounded-[10px] flex items-center gap-2"
            >
              Submit
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Button>
          )}
        </div>
      </div>
    </MainLayout>
  );
};
