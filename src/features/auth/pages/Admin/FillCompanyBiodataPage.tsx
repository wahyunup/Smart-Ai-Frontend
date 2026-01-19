import { Icon } from "@iconify/react";
import Button from "../../../../shared/components/ui/Button";
import AuthLayout from "../../../../shared/layouts/AuthLayout";
import AuthSection from "../../components/AuthSection";
import { UploadCloud } from "lucide-react";
import { useFillCompanyBiodata } from "../../hooks/Admin/useFillCompanyBiodata";

export const FillCompanyBiodataPage = () => {
  const {
    form,
    handleFileChange,
    handleSubmit,
    handleTextChange,
    isLoading,
    previewImage,
  } = useFillCompanyBiodata();

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