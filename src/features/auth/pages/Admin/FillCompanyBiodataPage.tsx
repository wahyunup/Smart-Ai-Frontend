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
        headingAuth="Lengkapi Profil Perusahaan"
        subHeadingAuth="Tambahkan informasi perusahaan untuk melengkapi akun Anda."
        formContent={
          <div className="w-full md:w-100 flex flex-col gap-5">
            {/* Textarea — address */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="address"
                className="font-dm font-medium text-[#6B8C80] md:text-xs 2xl:text-sm"
              >
                Alamat Perusahaan
              </label>
              <textarea
                onChange={handleTextChange}
                name="address"
                id="address"
                value={form.address}
                className="h-28 rounded-[10px] px-4 py-3
                           bg-[#0D1F27] border border-[#16FF6E]/[.10]
                           text-[#E8F4F0] font-dm text-sm
                           placeholder:text-[#6B8C80]/60
                           outline-none resize-none
                           focus:border-[#16FF6E]/40
                           focus:shadow-[0_0_0_3px_rgba(22,255,110,0.07)]
                           transition-all duration-200"
              />
            </div>

            {/* Upload logo */}
            <div className="flex flex-col gap-2">
              <label className="font-dm font-medium text-[#6B8C80] md:text-xs 2xl:text-sm">
                Logo Perusahaan
              </label>
              <label
                htmlFor="profile_picture_file"
                className="relative flex flex-col items-center justify-center
                           h-32 w-full cursor-pointer rounded-[10px]
                           border border-dashed border-[#16FF6E]/20
                           bg-[#0D1F27]
                           hover:border-[#16FF6E]/40 hover:bg-[#0D1F27]/80
                           transition-all duration-200 overflow-hidden"
              >
                {previewImage ? (
                  <img
                    className="h-full object-contain py-2"
                    src={previewImage}
                    alt="preview-image"
                  />
                ) : (
                  <div className="flex flex-col gap-2 items-center">
                    <UploadCloud size={24} className="text-[#16FF6E]" />
                    <p className="font-dm text-sm text-[#6B8C80]">
                      Klik untuk mengunggah
                    </p>
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
              <p className="font-dm text-xs text-[#6B8C80]/70">
                Logo ini digunakan untuk profil perusahaan.
              </p>
            </div>
          </div>
        }
        footerContent={
          <div className="md:w-100 w-90 flex flex-col items-center gap-3">
            {isLoading ? (
              <Button
                variant="primary"
                classname="w-full py-3.5 flex items-center justify-center gap-2.5 opacity-75 cursor-not-allowed pointer-events-none"
              >
                <Icon icon="line-md:loading-loop" width="20" height="20" />
                Memproses...
              </Button>
            ) : (
              <Button
                onclick={handleSubmit}
                variant="primary"
                classname="group w-full py-3.5 flex items-center justify-center gap-2.5"
              >
                Selesaikan & Masuk Dashboard
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Button>
            )}
          </div>
        }
      />
    </AuthLayout>
  );
};
