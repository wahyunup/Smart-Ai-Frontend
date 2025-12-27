import React, { useEffect, useState } from "react";
import Button from "../../../../../shared/components/ui/Button";
import Input from "../../../../../shared/components/ui/Input";
import MainLayout from "../../../../../shared/layouts/MainLayout";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  CompanyByIdApi,
  UpdateCompanyApi,
} from "../../../services/superadmin/ManageCompany";
import Swal from "sweetalert2";

const CreateCompany = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const id = Number(params.id);

  const isEditPage = location.pathname.startsWith(
    "/superadmin/manage-company/edit"
  );

  const [form, setForm] = useState({
    companyName: "",
    emailCompany: "",
  });

  const [placeholder, setPlaceholder] = useState({
    companyName: "",
    emailCompany: "",
    code: "",
  });

  const handleCancle = () => {
    setForm({
      companyName: "",
      emailCompany: "",
    });
  };

  useEffect(() => {
    if (id) {
      const fetchCompanyById = async () => {
        try {
          const res = await CompanyByIdApi(id);
          console.log(res);
          
          setPlaceholder({
            companyName: res.name,
            emailCompany: res.company_email,
            code: res.code,
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
        }
      };
      fetchCompanyById();
    }
  }, []);

  const handleSumbit = async () => {
    try {
      if (isEditPage) {
        await UpdateCompanyApi(id, form.companyName, form.emailCompany);
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
      }
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
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <MainLayout>
      <div className="p-10">
        <div className="flex flex-col gap-4">
          <h1 className="2xl:text-3xl md:text-2xl font-semibold">Kelola Perusahaan</h1>
          {isEditPage ? (
            <h2 className="2x:text-xl md:text-base font-medium">Edit Perusahaan</h2>
          ) : (
            <h2 className="2xl:text-xl md:text-base font-medium">Tambah Perusahaan</h2>
          )}
          <div>
            <h3 className="2xl:text-xl md:text-lg font-semibold">Informasi Dasar & Lisensi</h3>
            <p className="2xl:text-sm md:text-xs">
              *Pembuatan akun Admin Perusahaan dilakukan di menu Kelola Admin
              Perusahaan.
            </p>
          </div>
        </div>

        <div className="mt-10">
          {isEditPage && (
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
              placeholder={placeholder.companyName || "Ex: PT Cemerlang Jaya"}
              type="text"
            />
            <Input
              onchange={handleOnChange}
              htmlFor="emailCompany"
              name="emailCompany"
              value={form.emailCompany}
              label="Email Utama Perusahaan"
              labelLayout="block"
              variant="secondary"
              placeholder={placeholder.emailCompany || "Ex: Info@Cemerlang.com"}
              type="text"
            />
          </div>
          <div className="flex gap-5 mt-10">
            <Input
              onchange={handleOnChange}
              name="companyName"
              htmlFor="companyName"
              value={form.companyName}
              label="Nama Resmi Perusahaan"
              labelLayout="block"
              variant="secondary"
              placeholder={placeholder.companyName || "Ex: PT Cemerlang Jaya"}
              type="text"
            />
            <Input
              onchange={handleOnChange}
              htmlFor="emailCompany"
              name="emailCompany"
              value={form.emailCompany}
              label="Email Utama Perusahaan"
              labelLayout="block"
              variant="secondary"
              placeholder={placeholder.emailCompany || "Ex: Info@Cemerlang.com"}
              type="text"
            />
          </div>
          
          <div className="flex gap-5 mt-10">
            <Input
              onchange={handleOnChange}
              name="companyName"
              htmlFor="companyName"
              value={form.companyName}
              label="Nama Resmi Perusahaan"
              labelLayout="block"
              variant="secondary"
              placeholder={placeholder.companyName || "Ex: PT Cemerlang Jaya"}
              type="text"
            />
            <Input
              onchange={handleOnChange}
              htmlFor="emailCompany"
              name="emailCompany"
              value={form.emailCompany}
              label="Email Utama Perusahaan"
              labelLayout="block"
              variant="secondary"
              placeholder={placeholder.emailCompany || "Ex: Info@Cemerlang.com"}
              type="text"
            />
          </div>

          <div className="flex gap-3 mt-6">
            {form.companyName !== "" || form.emailCompany !== "" ? (
              <>
                <Button
                  onclick={handleCancle}
                  variant="cancel"
                  classname="2x:px-5 2xl:py-2 md:px-3 md:py-2  rounded-lg">
                  Batal
                </Button>
                {isEditPage ? (
                  <Button
                    onclick={handleSumbit}
                    variant="secondary"
                    classname="2x:px-5 2xl:py-2 md:px-3 md:py-2 rounded-lg">
                    Edit
                  </Button>
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
