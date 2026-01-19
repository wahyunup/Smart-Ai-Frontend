import Button from "../../../../../shared/components/ui/Button";
import Input from "../../../../../shared/components/ui/Input";
import MainLayout from "../../../../../shared/layouts/MainLayout";
import { useCreateAdminCompany } from "../../../hooks";

const CreateAdminCompanyPage = () => {
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
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-semibold">Kelola Admin Perusahaan</h1>
          {isEditPage ? (
            <h2 className="text-xl font-medium">Edit Admin Perusahaan</h2>
          ) : isDetailPage ? (
            <h2 className="text-xl font-medium">Lihat Admin Perusahaan</h2>
          ) : (
            <h2 className="text-xl font-medium">Tambah Admin Perusahaan</h2>
          )}
          <div>
            <h3 className="text-xl font-semibold">Detail Akun Admin</h3>
          </div>
        </div>

        <div className="mt-10">
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

          <div className="flex gap-5 mt-10">
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
                  variant="secondary"
                  type="select"
                />
                <Input
                  onchange={handleOnChange}
                  htmlFor="fullname"
                  name="fullname"
                  value={form.fullname}
                  label="Nama Lengkap Admin"
                  labelLayout="block"
                  variant="secondary"
                  placeholder="Ex: Rina Ayu"
                  type="text"
                />
              </>
            )}
          </div>

          <div className=" flex gap-5 mt-10">
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
                  variant="secondary"
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
                  variant="secondary"
                  type={showPassword ? "text" : "password"}
                />
              </>
            )}
          </div>

          <div className="flex gap-3 mt-6">
            {form.companyName !== "" ||
            form.emailAdmin !== "" ||
            form.fullname !== "" ||
            form.password !== "" ? (
              <>
                <Button
                  onclick={handleCancle}
                  variant="cancel"
                  classname="px-5 py-2 rounded-lg">
                  Batal
                </Button>
                {isEditPage ? (
                  <Button variant="secondary" classname="px-5 py-2 rounded-lg">
                    Edit
                  </Button>
                ) : (
                  <Button variant="secondary" classname="px-5 py-2 rounded-lg">
                    Submit
                  </Button>
                )}
              </>
            ) : (
              <Button
                onclick={() => navigate("/superadmin/manage-admin-company")}
                variant="info"
                classname="px-5 py-2 rounded-lg">
                kembali
              </Button>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CreateAdminCompanyPage;
