import React, { useEffect, useState } from "react";
import Button from "../../../../../shared/components/ui/Button";
import Input from "../../../../../shared/components/ui/Input";
import MainLayout from "../../../../../shared/layouts/MainLayout";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  CompanyByIdApi,
  CreateCompanyApi,
  UpdateCompanyApi,
} from "../../../services/superadmin/ManageCompany";
import Swal from "sweetalert2";
import { formatDateBasic } from "../../../../../shared/utils/FormatDate";
import Switch from "../../../../../shared/components/ui/Switch";
import { Icon } from "@iconify/react";

const CreateCompany = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const id = Number(params.id);
  const [dogglePassword, setDogglePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isEditPage = location.pathname.startsWith(
    "/superadmin/manage-company/edit"
  );
  const [previewImage, setPreviewImage] = useState<string>();

  const [form, setForm] = useState({
    companyName: "",
    emailCompany: "",
    adminName: "",
    address: "",
    password: "",
    is_active: false,
    profile_picture_file: null as File | null
  });

  const [placeholder, setPlaceholder] = useState({
    companyName: "",
    emailCompany: "",
    adminName: "",
    address: "",
    code: "",
    subscription_plan: "",
    picPhoneNumber: "",
    joinDate: "",
    is_active: false,
    profile_picture_file: null as File | null,
  });

  const handleCancle = () => {
    setForm({
      companyName: "",
      emailCompany: "",
      address: "",
      adminName: "",
      password: "",
      profile_picture_file: null,
      is_active: false,
    });
  };

  const fetchCompanyById = async () => {
    if (id) {
      try {
        const res = await CompanyByIdApi(id);
        const convertDate = formatDateBasic(res.company_created_at);
        setPlaceholder({
          companyName: res.company_name,
          emailCompany: res.company_email,
          code: res.company_code,
          picPhoneNumber: res.company_pic_phone_number,
          subscription_plan: res.subscription_plan,
          address: res.company_address,
          adminName: res.admin_name,
          joinDate: convertDate,
          is_active: res.company_is_active,
          profile_picture_file: res.admin_profile_picture_url,
        });
        setPreviewImage(res.admin_profile_picture_url);
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
      }
    }
  };

  useEffect(() => {
    fetchCompanyById();
  }, [id]);

  const handleSumbit = async () => {
    setIsLoading(true);
    try {
      if (isEditPage) {
        await UpdateCompanyApi(
          id,
          form.companyName,
          form.emailCompany,
          form.address,
          form.adminName,
          form.is_active,
          form.profile_picture_file
        );
        Swal.fire({
          text: "edit perusahaan berhasil",
          icon: "success",
          confirmButtonText: "oke",
          confirmButtonColor: "#2BA54B",
          buttonsStyling: true,
          customClass: {
            confirmButton: "primary-button",
          },
        }).then((response) => {
          if (response.isConfirmed) {
            navigate("/superadmin/manage-company");
          }
        });
      } else {
        await CreateCompanyApi(
          form.companyName,
          form.emailCompany,
          form.adminName,
          form.address,
          form.password,
          form.is_active,
          form.profile_picture_file
        );
      }
      Swal.fire({
        text: "perusahaan berhasil dibuat",
        icon: "success",
        confirmButtonText: "oke",
        confirmButtonColor: "#2BA54B",
        buttonsStyling: true,
        customClass: {
          confirmButton: "primary-button",
        },
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
      setForm({
        address: "",
        adminName: "",
        companyName: "",
        emailCompany: "",
        password: "",
        profile_picture_file: null,
        is_active: false,
      });
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type, files } = e.target;
    if (name === "profile_picture_file" && files) {
      setForm((prev) => ({
        ...prev,
        profile_picture_file: files[0],
      }));
      setPreviewImage(URL.createObjectURL(files[0]));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

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
            form.profile_picture_file
            ? (
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
