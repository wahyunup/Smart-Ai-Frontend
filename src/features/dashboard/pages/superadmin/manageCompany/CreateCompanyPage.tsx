import Button from "../../../../../shared/components/ui/Button";
import Input from "../../../../../shared/components/ui/Input";
import MainLayout from "../../../../../shared/layouts/MainLayout";
import Switch from "../../../../../shared/components/ui/Switch";
import { Icon } from "@iconify/react";
import { UploadCloud } from "lucide-react";
import { useCreateCompany } from "../../../hooks";

export const CreateCompanyPage = () => {
  const {
    dogglePassword,
    form,
    handleCancle,
    handleOnChange,
    handleSumbit,
    previewImage,
    isEditPage,
    isLoading,
    placeholder,
    setDogglePassword,
    navigate,
  } = useCreateCompany();

  return (
    <MainLayout>
      <div className="p-10">

        {/* ── Page header ── */}
        <div className="flex flex-col gap-2 mb-10">
          <h1 className="font-syne font-extrabold text-white 2xl:text-3xl md:text-2xl">
            Kelola Perusahaan
          </h1>
          <h2 className="font-syne font-bold text-[#16FF6E] 2xl:text-xl md:text-base">
            {isEditPage ? "Edit Perusahaan" : "Tambah Perusahaan"}
          </h2>

          {/* section label — same badge style */}
          <div className="mt-2 flex flex-col gap-1">
            <h3 className="font-syne font-bold text-white 2xl:text-lg md:text-base">
              Informasi Dasar & Lisensi
            </h3>
            <p className="font-dm text-[#6B8C80] 2xl:text-sm md:text-xs">
              *Pembuatan akun Admin Perusahaan dilakukan di menu Kelola Admin
              Perusahaan.
            </p>
          </div>
        </div>

        {/* ── Upload photo ── */}
        <div className="flex flex-col gap-3 mb-10">
          <span className="font-dm font-medium text-[#6B8C80] text-sm">
            Unggah photo profile
          </span>
          <label
            htmlFor="profile_picture_file"
            className="flex flex-col items-center justify-center gap-3
                       w-full h-40 rounded-[16px] cursor-pointer
                       border border-dashed border-[#16FF6E]/20
                       bg-[#0D1F27]
                       hover:border-[#16FF6E]/40 hover:bg-[#0D1F27]/80
                       transition-all duration-200 overflow-hidden"
          >
            {previewImage ? (
              <img src={previewImage} className="h-full object-contain py-2" alt="preview" />
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

        {/* ── Form fields ── */}
        <div className="flex flex-col gap-8">

          {/* read-only fields — edit mode only */}
          {isEditPage && (
            <div className="flex gap-5">
              <div className="w-1/2">
                <Input
                  name="idCompany"
                  htmlFor="idCompany"
                  value={placeholder.code}
                  label="ID Perusahaan"
                  labelLayout="block"
                  variant="disable"
                  type="text"
                />
              </div>
              <div className="w-1/2">
                <Input
                  name="subscription_plan"
                  htmlFor="subscription_plan"
                  value={placeholder.subscription_plan || "Trial"}
                  label="Subscription Plan"
                  labelLayout="block"
                  variant="disable"
                  type="text"
                />
              </div>
              <div className="w-1/2">
                <Input
                  name="created_at"
                  htmlFor="created_at"
                  value={placeholder.joinDate}
                  label="Tanggal Bergabung"
                  labelLayout="block"
                  variant="disable"
                  type="text"
                />
              </div>
            </div>
          )}

          {/* row 1 */}
          <div className="flex gap-5">
            <Input
              onchange={handleOnChange}
              name="companyName"
              htmlFor="companyName"
              value={form.companyName}
              label="Nama Resmi Perusahaan"
              labelLayout="block"
              variant="primary"
              placeholder={placeholder.companyName}
              type="text"
            />
            <Input
              onchange={handleOnChange}
              htmlFor="adminName"
              name="adminName"
              value={form.adminName}
              label="Nama Admin Perusahaan"
              labelLayout="block"
              variant="primary"
              placeholder={placeholder.adminName}
              type="text"
            />
          </div>

          {/* row 2 */}
          <div className="flex gap-5">
            <Input
              onchange={handleOnChange}
              name="emailCompany"
              htmlFor="emailCompany"
              value={form.emailCompany}
              label="Email Utama Perusahaan"
              labelLayout="block"
              variant="primary"
              placeholder={placeholder.emailCompany}
              type="text"
            />
            <Input
              onchange={handleOnChange}
              name="address"
              htmlFor="address"
              value={form.address}
              label="Alamat Perusahaan"
              labelLayout="block"
              variant="primary"
              placeholder={placeholder.address}
              type="text"
            />
          </div>

          {/* row 3 — password */}
          <div className="flex gap-5 w-1/2">
            <Input
              onchange={handleOnChange}
              name="password"
              htmlFor="password"
              value={form.password}
              label="Password"
              showPassword={dogglePassword}
              tooglePassword={() => setDogglePassword(!dogglePassword)}
              labelLayout="block"
              variant="primary"
              type={dogglePassword ? "text" : "password"}
            />
          </div>

          {/* status toggle */}
          <div className="flex flex-col gap-3">
            <h3 className="font-syne font-bold text-white text-sm">Status</h3>
            {isEditPage ? (
              <Switch checked={placeholder.is_active} onChange={handleOnChange} />
            ) : (
              <Switch checked={form.is_active} onChange={handleOnChange} />
            )}
          </div>

          {/* ── Action buttons ── */}
          <div className="flex gap-3">
            {form.companyName !== "" ||
            form.emailCompany !== "" ||
            form.address !== "" ||
            form.adminName !== "" ||
            form.profile_picture_file ? (
              <>
                <Button
                  onclick={handleCancle}
                  variant="cancel"
                  classname="px-5 py-2.5 rounded-[10px]"
                >
                  Batal
                </Button>
                {isEditPage ? (
                  isLoading ? (
                    <Button
                      variant="primary"
                      classname="px-5 py-2.5 rounded-[10px] flex items-center gap-2 opacity-75 cursor-not-allowed pointer-events-none"
                    >
                      <Icon icon="line-md:loading-loop" width="20" height="20" />
                      Menyimpan...
                    </Button>
                  ) : (
                    <Button
                      onclick={handleSumbit}
                      variant="primary"
                      classname="group px-6 py-2.5 rounded-[10px] flex items-center gap-2"
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
                  )
                ) : (
                  isLoading ? (
                    <Button
                      variant="primary"
                      classname="px-5 py-2.5 rounded-[10px] flex items-center gap-2 opacity-75 cursor-not-allowed pointer-events-none"
                    >
                      <Icon icon="line-md:loading-loop" width="20" height="20" />
                      Menyimpan...
                    </Button>
                  ) : (
                    <Button
                      onclick={handleSumbit}
                      variant="primary"
                      classname="group px-6 py-2.5 rounded-[10px] flex items-center gap-2"
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
                  )
                )}
              </>
            ) : (
              <Button
                onclick={() => navigate("/superadmin/manage-company")}
                variant="secondary"
                classname="px-6 py-2.5 rounded-[10px] flex items-center gap-2 group"
              >
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1 rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                Kembali
              </Button>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};