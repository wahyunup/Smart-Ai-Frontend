import { useLocation, useNavigate } from "react-router-dom";
import Input from "../../../../../shared/components/ui/Input";
import MainLayout from "../../../../../shared/layouts/MainLayout";
import { useEffect, useState } from "react";
import Button from "../../../../../shared/components/ui/Button";
import { Icon } from "@iconify/react";
import { createStaff, editStaff } from "../../../services/admin/ManageStaff";
import Swal from "sweetalert2";

const AddStaf = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [showingPassword, setShowingPassword] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [editPreviewImage, setEditPreviewImage] = useState<string | null>(null);
  const [form, setForm] = useState({
    profile_picture_file: null as File | null,
    name: "",
    email: "",
    username: "",
    password: "",
    role: "",
    division: "",
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
      await createStaff(
        form.profile_picture_file,
        form.name,
        form.email,
        form.username,
        form.password,
        form.role,
        form.division
      );
      Swal.fire({
        text: "Staff berhasil dibuat",
        icon: "success",
        confirmButtonText: "oke",
        confirmButtonColor: "#2BA54B",
        buttonsStyling: true,
        customClass: {
          confirmButton: "primary-button",
        },
      }).then((response) => {
        if (response.isConfirmed) {
          navigate("/admin/manage-staff");
        }
      });
    } catch (error: any) {
      Swal.fire({
        text: error.response.data.message,
        icon: "error",
        confirmButtonText: "oke",
        confirmButtonColor: "#DB3726",
        buttonsStyling: true,
        customClass: {
          confirmButton: "danger-button",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (location.pathname === "/admin/manage-staff/edit") {
      const userData = location.state.userData;
      setDataEdit({
        id: userData.id,
        profile_picture_file: null,
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

  console.log(editPreviewImage, "edit prev image");

  const handleEdit = async () => {
    setIsLoading(true);
    try {
      await editStaff(
        dataEdit.id,
        dataEdit.profile_picture_file ?? null,
        dataEdit.name,
        dataEdit.email,
        dataEdit.username,
        dataEdit.password,
        dataEdit.role,
        dataEdit.division
      );

      Swal.fire({
        text: "Staff berhasil diedit",
        icon: "success",
        confirmButtonText: "oke",
        confirmButtonColor: "#2BA54B",
        buttonsStyling: true,
        customClass: {
          confirmButton: "primary-button",
        },
      }).then((response) => {
        if (response.isConfirmed) {
          navigate("/admin/manage-staff");
        }
      });
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
