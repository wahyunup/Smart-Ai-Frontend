import { useLocation, useNavigate } from "react-router-dom";
import Input from "../../../../../shared/components/ui/Input";
import MainLayout from "../../../../../shared/layouts/MainLayout";
import { useEffect, useState } from "react";
import Button from "../../../../../shared/components/ui/Button";
import { Icon } from "@iconify/react";
import { createStaff, editStaff } from "../../../services/ManageStaff";

const AddStaf = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [editPreviewImage, setEditPreviewImage] = useState<string | null>(null);
  const [form, setForm] = useState({
    profile_picture_file: null as File | null,
    name: "",
    email: "",
    username: "",
    password: "",
    role: "",
    division_name: "",
  });
  const [dataEdit, setDataEdit] = useState({
    id: 0,
    profile_picture_file: null as File | null,
    name: "",
    email: "",
    username: "",
    password: "",
    role: "",
    division: "",
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (location.pathname === "/admin/manage-staff/edit") {
      if (name === "profile_picture_file" && files) {
        setDataEdit((prev) => ({
          ...prev,
          profile_picture_file: files[0],
        }));
        setEditPreviewImage(URL.createObjectURL(files[0]));
      } else {
        setDataEdit((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    } else {
      if (name === "profile_picture_file" && files) {
        setForm((prev) => ({
          ...prev,
          profile_picture_file: files[0],
        }));
        setPreviewImage(URL.createObjectURL(files[0]));
      } else {
        setForm((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    }
  };

  const handleCreate = async () => {
    setIsLoading(true);
    try {
      const res = await createStaff(
        form.profile_picture_file,
        form.name,
        form.email,
        form.username,
        form.password,
        form.role,
        form.division_name
      );
      console.log(res);
      alert("staff berhasil dibuat");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (location.pathname === "/admin/manage-staff/edit") {
      const userData = location.state.userData;
      setDataEdit({
        id: userData.id,
        profile_picture_file: userData.profile_picture_url,
        division: userData.division,
        email: userData.email,
        name: userData.name,
        password: dataEdit.password,
        role: userData.role,
        username: userData.username,
      });
      setEditPreviewImage(userData.profile_picture_url);
    }
  }, [location.state]);

  const handleEdit = async () => {
    setIsLoading(true);
    try {
      const res = await editStaff(
        dataEdit.id,
        dataEdit.profile_picture_file ?? undefined,
        dataEdit.name,
        dataEdit.email,
        dataEdit.username,
        dataEdit.password,
        dataEdit.role,
        dataEdit.division
      );

      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
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
                  className="border-1 border-gray-300 p-10 rounded-2xl border-dashed flex items-center justify-center text-gray-500 cursor-pointer flex-col gap-5 w-full">
                  {previewImage ? (
                    <img src={previewImage} alt="preview-image" />
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
                classname="gap-17"
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
                classname="gap-13"
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
                classname="gap-25"
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
                classname="gap-17"
                type="password"
                labelLayout="inline"
              />
              <Input
                label="role"
                variant="secondary"
                value={form.role}
                onchange={handleOnChange}
                placeholder="input teks"
                name="role"
                htmlFor="role"
                classname="gap-27"
                type="text"
                labelLayout="inline"
              />
              <Input
                label="Divisi"
                variant="secondary"
                value={form.division_name}
                onchange={handleOnChange}
                placeholder="input teks"
                name="division_name"
                htmlFor="division_name"
                classname="gap-24"
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
                  className="border-1 border-gray-300 p-10 rounded-2xl border-dashed flex items-center justify-center text-gray-500 cursor-pointer flex-col gap-5 w-full">
                  {editPreviewImage ? (
                    <img
                      className="w-50"
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

                classname="gap-17"
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
                classname="gap-13"
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
                classname="gap-25"
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
                classname="gap-17"
                type="password"
                labelLayout="inline"
              />
              <Input
                label="role"
                variant="secondary"
                onchange={handleOnChange}
                value={dataEdit.role}
                placeholder="input teks"
                name="role"
                htmlFor="role"
                classname="gap-27"
                type="text"
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
                classname="gap-24"
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
