import Input from "../../../../../shared/components/ui/Input";
import MainLayout from "../../../../../shared/layouts/MainLayout";
import Button from "../../../../../shared/components/ui/Button";
import { Icon } from "@iconify/react";
import { UploadCloud } from "lucide-react";
import { useAddStaff } from "../../../hooks";

export const AddStafPage = () => {
  const {
    dataEdit,
    editPreviewImage,
    form,
    handleCreate,
    handleEdit,
    handleOnChange,
    previewImage,
    showingPassword,
    setShowingPassword,
    isLoading,
    navigate,
  } = useAddStaff();

  const isCreatePage = location.pathname === "/admin/manage-staff/create";

  /* shared upload area */
  const UploadArea = ({ preview }: { preview: string | null }) => (
    <div className="flex items-center gap-8">
      <span className="font-dm font-medium text-[#6B8C80] text-sm shrink-0">
        Unggah photo profile
      </span>
      <label
        htmlFor="profile_picture_file"
        className="flex flex-col items-center justify-center gap-3
                   w-full h-36 rounded-[14px] cursor-pointer
                   border border-dashed border-[#16FF6E]/20
                   bg-[#0D1F27]
                   hover:border-[#16FF6E]/40 hover:bg-[#0D1F27]/80
                   transition-all duration-200 overflow-hidden"
      >
        {preview ? (
          <img
            src={preview}
            className="h-full object-contain py-2"
            alt="preview"
          />
        ) : (
          <>
            <UploadCloud size={24} className="text-[#16FF6E]" />
            <span className="font-dm text-sm text-[#6B8C80]">
              Klik untuk mengunggah
            </span>
          </>
        )}
      </label>
      <input
        type="file"
        id="profile_picture_file"
        className="hidden absolute inset-0"
        name="profile_picture_file"
        onChange={handleOnChange}
      />
    </div>
  );

  return (
    <MainLayout>
      <div className="p-10 flex flex-col gap-8">
        {/* ── Page header ── */}
        <h1 className="font-syne font-extrabold text-white text-3xl">
          Kelola Staff
        </h1>

        {/* ── Form card ── */}
        <div
          className="relative bg-[#0A1A20] border border-[#16FF6E]/[.07]
                      rounded-[20px] p-8 flex flex-col gap-6 overflow-hidden"
        >
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#16FF6E]/20 to-transparent" />

          <h2 className="font-syne font-bold text-white text-lg">
            {isCreatePage ? "Create Data Staff" : "Edit Data Staff"}
          </h2>

          {isCreatePage ? (
            <>
              <UploadArea preview={previewImage} />
              <Input
                label="Username"
                variant="primary"
                placeholder="Input teks"
                name="username"
                value={form.username}
                type="text"
                labelLayout="inline"
                htmlFor="username"
                onchange={handleOnChange}
              />
              <Input
                label="Display Name"
                variant="primary"
                value={form.name}
                placeholder="Input teks"
                name="name"
                htmlFor="name"
                type="text"
                labelLayout="inline"
                onchange={handleOnChange}
              />
              <Input
                label="Email"
                variant="primary"
                value={form.email}
                onchange={handleOnChange}
                placeholder="Input teks"
                name="email"
                htmlFor="email"
                type="text"
                labelLayout="inline"
              />
              <Input
                label="Password"
                variant="primary"
                onchange={handleOnChange}
                value={form.password}
                placeholder="Input teks"
                name="password"
                htmlFor="password"
                tooglePassword={() => setShowingPassword(!showingPassword)}
                showPassword={showingPassword}
                type={`${showingPassword ? "text" : "password"}`}
                labelLayout="inline"
              />
              <Input
                label="Divisi"
                variant="primary"
                value={form.division}
                onchange={handleOnChange}
                placeholder="Input teks"
                name="division"
                htmlFor="division"
                type="text"
                labelLayout="inline"
              />
            </>
          ) : (
            <>
              <UploadArea preview={editPreviewImage} />
              <Input
                label="Username"
                variant="primary"
                placeholder="Input teks"
                name="username"
                value={dataEdit.username}
                onchange={handleOnChange}
                type="text"
                labelLayout="inline"
                htmlFor="username"
              />
              <Input
                label="Display Name"
                variant="primary"
                value={dataEdit.name}
                onchange={handleOnChange}
                placeholder="Input teks"
                name="name"
                htmlFor="name"
                type="text"
                labelLayout="inline"
              />
              <Input
                label="Email"
                variant="primary"
                value={dataEdit.email}
                onchange={handleOnChange}
                placeholder="Input teks"
                name="email"
                htmlFor="email"
                type="text"
                labelLayout="inline"
              />
              <Input
                label="Password"
                onchange={handleOnChange}
                variant="primary"
                value={dataEdit.password}
                placeholder="Input teks"
                name="password"
                htmlFor="password"
                tooglePassword={() => setShowingPassword(!showingPassword)}
                showPassword={showingPassword}
                type={`${showingPassword ? "text" : "password"}`}
                labelLayout="inline"
              />
              <Input
                label="Divisi"
                variant="primary"
                onchange={handleOnChange}
                value={dataEdit.division}
                placeholder="Input teks"
                name="division"
                htmlFor="division"
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
            onclick={() => navigate("/admin/manage-staff")}
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
          ) : !isCreatePage ? (
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
              onclick={handleCreate}
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
