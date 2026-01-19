import Input from "../../../../../shared/components/ui/Input";
import MainLayout from "../../../../../shared/layouts/MainLayout";
import Button from "../../../../../shared/components/ui/Button";
import { Icon } from "@iconify/react";
import { useAddStaff } from "../../../hooks";
const AddStaf = () => {
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
  return (
    <MainLayout>
      <div className="p-10 flex flex-col gap-10">
        <h1 className="text-3xl font-semibold">Kelola Staff</h1>

        <div className="flex flex-col gap-6">
          {location.pathname === "/admin/manage-staff/create" ? (
            <>
              <p className="text-xl font-medium">Create Data Staff</p>

              <div className="flex items-center">
                <span className="text-sm font-semibold">
                  Unggah photo profile
                </span>
                <label
                  htmlFor="profile_picture_file"
                  className="border-1 border-gray-300 p-10 rounded-2xl border-dashed flex items-center justify-center text-gray-500 cursor-pointer flex-col gap-5 w-full h-41">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      className="h-full"
                      alt="preview-image"
                    />
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
              <Input
                label="username"
                variant="secondary"
                placeholder="input teks"
                name="username"
                value={form.username}
                type="text"
                labelLayout="inline"
                htmlFor="username"
                onchange={handleOnChange}
              />
              <Input
                label="display name"
                variant="secondary"
                value={form.name}
                placeholder="input teks"
                name="name"
                htmlFor="name"
                type="text"
                labelLayout="inline"
                onchange={handleOnChange}
              />
              <Input
                label="Email"
                variant="secondary"
                value={form.email}
                onchange={handleOnChange}
                placeholder="input teks"
                name="email"
                htmlFor="email"
                type="text"
                labelLayout="inline"
              />
              <Input
                label="Password"
                variant="secondary"
                onchange={handleOnChange}
                value={form.password}
                placeholder="input teks"
                name="password"
                htmlFor="password"
                tooglePassword={() => setShowingPassword(!showingPassword)}
                showPassword={showingPassword}
                type={`${showingPassword ? "text" : "password"}`}
                labelLayout="inline"
              />

              <Input
                label="Divisi"
                variant="secondary"
                value={form.division}
                onchange={handleOnChange}
                placeholder="input teks"
                name="division"
                htmlFor="division"
                type="text"
                labelLayout="inline"
              />
            </>
          ) : (
            <>
              <p className="text-xl font-medium">Edit Data Staff</p>
              <div className="flex items-center">
                <span className="text-sm font-semibold">
                  Unggah photo profile
                </span>
                <label
                  htmlFor="profile_picture_file"
                  className="border-1 border-gray-300 p-10 rounded-2xl border-dashed flex items-center justify-center text-gray-500 cursor-pointer flex-col gap-5 w-full h-41">
                  {editPreviewImage ? (
                    <img
                      className="h-full"
                      src={editPreviewImage}
                      alt="preview-image"
                    />
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
              <Input
                label="username"
                variant="secondary"
                placeholder="input teks"
                name="username"
                value={dataEdit.username}
                onchange={handleOnChange}
                type="text"
                labelLayout="inline"
                htmlFor="username"
              />
              <Input
                label="display name"
                variant="secondary"
                value={dataEdit.name}
                onchange={handleOnChange}
                placeholder="input teks"
                name="name"
                htmlFor="name"
                type="text"
                labelLayout="inline"
              />
              <Input
                label="Email"
                variant="secondary"
                value={dataEdit.email}
                onchange={handleOnChange}
                placeholder="input teks"
                name="email"
                htmlFor="email"
                type="text"
                labelLayout="inline"
              />
              <Input
                label="Password"
                onchange={handleOnChange}
                variant="secondary"
                value={dataEdit.password}
                placeholder="input teks"
                name="password"
                htmlFor="password"
                tooglePassword={() => setShowingPassword(!showingPassword)}
                showPassword={showingPassword}
                type={`${showingPassword ? "text" : "password"}`}
                labelLayout="inline"
              />

              <Input
                label="Divisi"
                variant="secondary"
                onchange={handleOnChange}
                value={dataEdit.division}
                placeholder="input teks"
                name="division"
                htmlFor="division"
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
            onclick={() => navigate("/admin/manage-staff")}>
            Batal
          </Button>
          {isLoading ? (
            <Button variant="secondary" classname="py-3 px-7 rounded-xl">
              <Icon icon="line-md:loading-loop" width="24" height="24" />
            </Button>
          ) : location.pathname === "/admin/manage-staff/edit" ? (
            <Button
              onclick={handleEdit}
              variant="secondary"
              classname="py-3 px-7 rounded-xl">
              Edit
            </Button>
          ) : (
            <Button
              onclick={handleCreate}
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

export default AddStaf;
