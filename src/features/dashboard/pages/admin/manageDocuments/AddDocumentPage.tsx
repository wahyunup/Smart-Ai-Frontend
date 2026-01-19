import { CloudUpload } from "lucide-react";
import MainLayout from "../../../../../shared/layouts/MainLayout";
import Input from "../../../../../shared/components/ui/Input";
import Button from "../../../../../shared/components/ui/Button";
import { Icon } from "@iconify/react";
import { useAddDocuments } from "../../../hooks";
const AddDocumentPage = () => {
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

  return (
    <MainLayout>
      <div className="p-10 flex flex-col gap-10">
        <h1 className="text-3xl font-semibold">Kelola Dokumen</h1>

        <div className="flex flex-col gap-6">
          <p className="text-xl font-medium">Upload Dokumen</p>

          {location.pathname === "/admin/manage-documents/edit" ? (
            <>
              <Input
                label="Nama Dokumen"
                variant="secondary"
                value={dataEdit.title}
                onchange={handleOnChange}
                placeholder="input teks"
                name="title"
                htmlFor="title"
                classname="gap-6"
                type="text"
                labelLayout="inline"
              />
              <Input
                onchange={handleOnChange}
                label="konten/tags"
                value={dataEdit.tags.join(", ")}
                variant="secondary"
                placeholder="input teks"
                htmlFor="tags"
                name="tags"
                classname="gap-10"
                type="text"
                labelLayout="inline"
              />
              <div className="flex gap-8">
                <label htmlFor="extracted_text">Isi Dokument</label>
                <textarea
                  onChange={(e) =>
                    setDataEdit((prev) => ({
                      ...prev,
                      extracted_text: e.target.value,
                    }))
                  }
                  name="extracted_text"
                  id="extracted_text"
                  placeholder="input isi dokumen"
                  value={dataEdit.extracted_text}
                  className="outline w-full p-3 rounded-2xl outline-gray-400 2xl:placeholder:text-md md:placeholder:text-sm h-50"></textarea>
              </div>
            </>
          ) : (
            <>
              <div>
                <div className="relative flex items-center gap-10 w-full">
                  <p className="font-semibold">File Dokumen</p>
                  <input
                    id="file"
                    type="file"
                    name="file"
                    onChange={handleOnChange}
                    className="absolute inset-0 hidden cursor-pointer"
                  />
                  <label
                    htmlFor="file"
                    className="border-2 p-10 rounded-2xl border-dashed flex items-center justify-center text-gray-500 cursor-pointer flex-col gap-5 w-full">
                    <CloudUpload color="#1D8A45" size={40} />
                    {form.file ? form.file.name : "Klik untuk mengunggah"}
                  </label>
                </div>
              </div>
              <Input
                label="Nama Dokumen"
                variant="secondary"
                placeholder="input teks"
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
                variant="secondary"
                value={form.tag}
                onchange={handleOnChange}
                placeholder="input teks"
                name="tag"
                htmlFor="tag"
                classname="gap-13"
                type="text"
                labelLayout="inline"
              />
            </>
          )}
        </div>
        <div className="flex justify-end gap-2">
          <Button
            variant="secondary"
            classname="py-3 px-7 bg-red-500 rounded-xl"
            onclick={() => navigate("/admin/manage-documents")}>
            Batal
          </Button>
          {isLoading ? (
            <Button variant="secondary" classname="py-3 px-7 rounded-xl">
              <Icon icon="line-md:loading-loop" width="24" height="24" />
            </Button>
          ) : location.pathname === "/admin/manage-documents/edit" ? (
            <Button
              onclick={handleEdit}
              variant="secondary"
              classname="py-3 px-7 rounded-xl">
              Edit
            </Button>
          ) : (
            <Button
              onclick={handleSubmit}
              variant="secondary"
              classname="py-3 px-7 rounded-xl">
              Submit
            </Button>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default AddDocumentPage;
