import Button from "../../../../../shared/components/ui/Button";
import Input from "../../../../../shared/components/ui/Input";
import MainLayout from "../../../../../shared/layouts/MainLayout";
import Switch from "../../../../../shared/components/ui/Switch";
import { Icon } from "@iconify/react";
import { useCreateCompany } from "../../../hooks";

const CreateCompany = () => {
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
    navigate
  } = useCreateCompany();

  return (
    <MainLayout>
      <div className="p-10">
        <div className="flex flex-col gap-4">
          <h1 className="2xl:text-3xl md:text-2xl font-semibold">
            Kelola Perusahaan
          </h1>
          {isEditPage ? (
            <h2 className="2x:text-xl md:text-base font-medium">
              Edit Perusahaan
            </h2>
          ) : (
            <h2 className="2xl:text-xl md:text-base font-medium">
              Tambah Perusahaan
            </h2>
          )}
          <div>
            <h3 className="2xl:text-xl md:text-lg font-semibold">
              Informasi Dasar & Lisensi
            </h3>
            <p className="2xl:text-sm md:text-xs">
              *Pembuatan akun Admin Perusahaan dilakukan di menu Kelola Admin
              Perusahaan.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-10">
          <span className="text-base font-semibold">Unggah photo profile</span>
          <label
            htmlFor="profile_picture_file"
            className="border-1 border-gray-300 p-10 rounded-2xl border-dashed flex items-center justify-center text-gray-500 cursor-pointer flex-col gap-5 w-full h-41">
            {previewImage ? (
              <img src={previewImage} className="h-full" alt="preview-image" />
            ) : (
              "Klik untuk mengunggah"
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
        <div className="mt-10">
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

          <div className="flex gap-5 mt-10">
            <Input
              onchange={handleOnChange}
              name="companyName"
              htmlFor="companyName"
              value={form.companyName}
              label="Nama Resmi Perusahaan"
              labelLayout="block"
              variant="secondary"
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
              variant="secondary"
              placeholder={placeholder.adminName}
              type="text"
            />
          </div>
          <div className="flex gap-5 mt-10">
            <Input
              onchange={handleOnChange}
              name="emailCompany"
              htmlFor="emailCompany"
              value={form.emailCompany}
              label="Email Utama Perusahaan"
              labelLayout="block"
              variant="secondary"
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
              variant="secondary"
              placeholder={placeholder.address}
              type="text"
            />
          </div>
          <div className="flex gap-5 mt-10 w-1/2">
            <Input
              onchange={handleOnChange}
              name="password"
              htmlFor="password"
              value={form.password}
              label="password"
              showPassword={dogglePassword}
              tooglePassword={() => setDogglePassword(!dogglePassword)}
              labelLayout="block"
              variant="secondary"
              type={dogglePassword ? "text" : "password"}
            />
          </div>

          <div className="mt-5 flex flex-col gap-2">
            <h1 className="font-semibold">Status</h1>
            {isEditPage ? (
              <Switch
                checked={placeholder.is_active}
                onChange={handleOnChange}
              />
            ) : (
              <Switch checked={form.is_active} onChange={handleOnChange} />
            )}
          </div>

          <div className="flex gap-3 mt-6">
            {form.companyName !== "" ||
            form.emailCompany !== "" ||
            form.address !== "" ||
            form.adminName !== "" ||
            form.profile_picture_file ? (
              <>
                <Button
                  onclick={handleCancle}
                  variant="cancel"
                  classname="2x:px-5 2xl:py-2 md:px-3 md:py-2  rounded-lg">
                  Batal
                </Button>
                {isEditPage ? (
                  isLoading ? (
                    <Button
                      variant="secondary"
                      classname="2x:px-5 2xl:py-2 md:px-3 md:py-2 rounded-lg">
                      <Icon
                        icon="line-md:loading-loop"
                        width="24"
                        height="24"
                      />
                    </Button>
                  ) : isLoading ? (
                    <Button
                      variant="secondary"
                      classname="2x:px-5 2xl:py-2 md:px-3 md:py-2 rounded-lg">
                      <Icon
                        icon="line-md:loading-loop"
                        width="24"
                        height="24"
                      />
                    </Button>
                  ) : (
                    <Button
                      onclick={handleSumbit}
                      variant="secondary"
                      classname="2x:px-5 2xl:py-2 md:px-3 md:py-2 rounded-lg">
                      Edit
                    </Button>
                  )
                ) : (
                  <Button
                    onclick={handleSumbit}
                    variant="secondary"
                    classname="2x:px-5 2xl:py-2 md:px-3 md:py-2 rounded-lg">
                    Submit
                  </Button>
                )}
              </>
            ) : (
              <Button
                onclick={() => navigate("/superadmin/manage-company")}
                variant="info"
                classname="2x:px-5 2xl:py-2 md:px-3 md:py-2 rounded-lg">
                kembali
              </Button>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CreateCompany;
