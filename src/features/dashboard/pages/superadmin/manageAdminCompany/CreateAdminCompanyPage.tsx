import Button from "../../../../../shared/components/ui/Button";
import Input from "../../../../../shared/components/ui/Input";
import MainLayout from "../../../../../shared/layouts/MainLayout";
import { useCreateAdminCompany } from "../../../hooks";

export const CreateAdminCompanyPage = () => {
  const {
    form,
    handleCancle,
    handleOnChange,
    isDetailPage,
    isEditPage,
    navigate,
    showPassword,
    id,
    setShowPassword,
  } = useCreateAdminCompany();

  return (
    <MainLayout>
      <div className="p-10">
        {/* ── Page header ── */}
        <div className="flex flex-col gap-2 mb-10">
          <h1 className="font-syne font-extrabold text-white 2xl:text-3xl md:text-2xl">
            Kelola Admin Perusahaan
          </h1>
          <h2 className="font-syne font-bold text-[#16FF6E] 2xl:text-xl md:text-base">
            {isEditPage
              ? "Edit Admin Perusahaan"
              : isDetailPage
                ? "Lihat Admin Perusahaan"
                : "Tambah Admin Perusahaan"}
          </h2>
          <h3 className="font-syne font-bold text-white 2xl:text-lg md:text-base mt-1">
            Detail Akun Admin
          </h3>
        </div>

        <div className="flex flex-col gap-8">
          {/* ID field — edit/detail only */}
          {(isEditPage || isDetailPage) && (
            <div className="w-1/2">
              <Input
                name="idCompany"
                htmlFor="idCompany"
                value={id}
                label="ID Perusahaan"
                labelLayout="block"
                variant="disable"
                type="text"
              />
            </div>
          )}

          {/* Row 1 */}
          <div className="flex gap-5">
            {isDetailPage ? (
              <>
                <Input
                  onchange={handleOnChange}
                  name="companyName"
                  htmlFor="companyName"
                  value={form.companyName}
                  label="Pilih Perusahaan Klien"
                  labelLayout="block"
                  variant="disable"
                  type="select"
                />
                <Input
                  onchange={handleOnChange}
                  htmlFor="fullname"
                  name="fullname"
                  value={form.fullname}
                  label="Nama Lengkap Admin"
                  labelLayout="block"
                  variant="disable"
                  placeholder="Ex: Rina Ayu"
                  type="text"
                />
              </>
            ) : (
              <>
                <Input
                  onchange={handleOnChange}
                  name="companyName"
                  htmlFor="companyName"
                  value={form.companyName}
                  label="Pilih Perusahaan Klien"
                  labelLayout="block"
                  variant="primary"
                  type="select"
                />
                <Input
                  onchange={handleOnChange}
                  htmlFor="fullname"
                  name="fullname"
                  value={form.fullname}
                  label="Nama Lengkap Admin"
                  labelLayout="block"
                  variant="primary"
                  placeholder="Ex: Rina Ayu"
                  type="text"
                />
              </>
            )}
          </div>

          {/* Row 2 */}
          <div className="flex gap-5">
            {isDetailPage ? (
              <>
                <Input
                  onchange={handleOnChange}
                  name="emailAdmin"
                  htmlFor="emailAdmin"
                  value={form.emailAdmin}
                  label="Email Login Admin"
                  labelLayout="block"
                  variant="disable"
                  type="email"
                />
                <Input
                  onchange={handleOnChange}
                  name="password"
                  htmlFor="password"
                  showPassword={showPassword}
                  tooglePassword={() => setShowPassword(!showPassword)}
                  value={form.password}
                  label="Kata Sandi"
                  labelLayout="block"
                  variant="disable"
                  type={showPassword ? "text" : "password"}
                />
              </>
            ) : (
              <>
                <Input
                  onchange={handleOnChange}
                  name="emailAdmin"
                  htmlFor="emailAdmin"
                  value={form.emailAdmin}
                  label="Email Login Admin"
                  labelLayout="block"
                  variant="primary"
                  type="email"
                />
                <Input
                  onchange={handleOnChange}
                  name="password"
                  htmlFor="password"
                  showPassword={showPassword}
                  tooglePassword={() => setShowPassword(!showPassword)}
                  value={form.password}
                  label="Kata Sandi"
                  labelLayout="block"
                  variant="primary"
                  type={showPassword ? "text" : "password"}
                />
              </>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            {form.companyName !== "" ||
            form.emailAdmin !== "" ||
            form.fullname !== "" ||
            form.password !== "" ? (
              <>
                <Button
                  onclick={handleCancle}
                  variant="cancel"
                  classname="px-5 py-2.5 rounded-[10px]"
                >
                  Batal
                </Button>
                {isEditPage ? (
                  <Button
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
                ) : (
                  <Button
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
                )}
              </>
            ) : (
              <Button
                onclick={() => navigate("/superadmin/manage-admin-company")}
                variant="secondary"
                classname="group px-6 py-2.5 rounded-[10px] flex items-center gap-2"
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
