import React, { useState } from "react";
import Button from "../../../../../shared/components/ui/Button";
import Input from "../../../../../shared/components/ui/Input";
import MainLayout from "../../../../../shared/layouts/MainLayout";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const CreateCompany = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;

  const isEditPage = location.pathname.startsWith(
    "/superadmin/manage-company/edit"
  );
  const [form, setForm] = useState({
    companyName: "",
    emailCompany: "",
    quotaEmployee: 0,
  });

  const handleCancle = () => {
    setForm({
      companyName: "",
      emailCompany: "",
      quotaEmployee: 0,
    });
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
          <h1 className="text-3xl font-semibold">Kelola Perusahaan</h1>
          {isEditPage ? (
            <h2 className="text-xl font-medium">Edit Perusahaan</h2>
          ) : (
            <h2 className="text-xl font-medium">Tambah Perusahaan</h2>
          )}
          <div>
            <h3 className="text-xl font-semibold">Informasi Dasar & Lisensi</h3>
            <p className="text-sm">
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
                value={id}
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
              placeholder="Ex: PT Cemerlang Jaya"
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
              placeholder="Ex: Info@Cemerlang.com"
              type="text"
            />
          </div>

          <div className="mt-10 w-1/2">
            <Input
              onchange={handleOnChange}
              name="quotaEmployee"
              htmlFor="quotaEmployee"
              value={form.quotaEmployee}
              label="Kuota Maksimal User Pegawai"
              labelLayout="block"
              variant="secondary"
              type="number"
            />
          </div>

          <div className="flex gap-3 mt-6">
            {form.companyName !== "" ||
            form.emailCompany !== "" ||
            form.quotaEmployee !== 0 ? (
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
                onclick={() => navigate("/superadmin/manage-company")}
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

export default CreateCompany;
