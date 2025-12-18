import { Icon } from "@iconify/react";
import Button from "../../../shared/components/ui/Button";
import AuthLayout from "../../../shared/layouts/AuthLayout";
import AuthSection from "../components/AuthSection";
import React, { useState } from "react";
import { UploadCloud } from "lucide-react";
import { fillInfoCompanyApi } from "../services/authApis";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const FillCompanyBiodata = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    company_email: "",
    admin_name: "",
    admin_email: "",
    logoCompany: null as File | null,
    admin_password: "",
    address: "",
    pic_phone_number: "",
  });

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await fillInfoCompanyApi(
        form.name,
        form.company_email,
        form.admin_name,
        form.admin_email,
        form.logoCompany,
        form.admin_password,
        form.address,
        form.pic_phone_number
      );

      Swal.fire({
        text: "Submit Berhasil",
        icon: "success",
      }).then((response) => {
        if (response.isConfirmed) {
          navigate("/admin/dashboard");
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setForm((prev) => ({ ...prev, logoCompany: file }));
    setPreviewImage(URL.createObjectURL(file));
  };

  return (
    <AuthLayout>
      <AuthSection
        formContent={
          <div className="flex flex-col items-center gap-10">
            <h1 className="text-4xl font-semibold">
              Lengkapi Profil Perusahaan Anda
            </h1>
            <div className="w-100 flex flex-col gap-2">
              <label
                htmlFor="address"
                className="font-semibold 2xl:text-md md:text-sm">
                Alamat Perusahaan
              </label>
              <textarea
                onChange={handleTextChange}
                name="address"
                id="address"
                className="rounded-lg text-sm outline-[#3BC15254] outline-2 bg-white h-30 2xl:p-3 md:p-2"
                value={form.address}
              />
              <label
                htmlFor="profile_picture_file"
                className="border-1 border-gray-300 p-10 rounded-2xl border-dashed flex items-center justify-center text-gray-500 cursor-pointer flex-col gap-5 w-full h-30 bg-white">
                {previewImage ? (
                  <img
                    className="h-full"
                    src={previewImage}
                    alt="preview-image"
                  />
                ) : (
                  <div className="flex flex-col gap-2 items-center">
                    <UploadCloud size={25} color="#1D8A45" />
                    <p className="text-sm">Klik untuk mengunggah</p>
                  </div>
                )}
              </label>
              <input
                onChange={handleFileChange}
                type="file"
                id="profile_picture_file"
                className="hidden absolute inset-0"
                name="profile_picture_file"
              />
              <p className="text-xs text-[#000000A6]">
                Logo ini digunakan untuk profil perusahaan.
              </p>
            </div>
          </div>
        }
        footerContent={
          <div className="w-80">
            {isLoading ? (
              <Button
                classname="py-3 w-full flex justify-center"
                variant="primary">
                <Icon icon="line-md:loading-loop" width="24" height="24" />
              </Button>
            ) : (
              <Button
                onclick={handleSubmit}
                variant="primary"
                classname="py-3 w-full">
                Selesaikan & Masuk Dashboard
              </Button>
            )}
          </div>
        }
      />
    </AuthLayout>
  );
};

export default FillCompanyBiodata;
