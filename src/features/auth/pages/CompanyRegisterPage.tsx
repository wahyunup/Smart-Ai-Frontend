import { useNavigate } from "react-router-dom";
import Input from "../../../shared/components/ui/Input";
import AuthLayout from "../../../shared/layouts/AuthLayout";
import AuthSection from "../components/AuthSection";

const CompanyRegisterPage = () => {
  const navigate = useNavigate()
  return (
    <AuthLayout>
      <AuthSection
        classname="gap-3"
        headingAuth="Daftar Perusahaan"
        subHeadingAuth="Kami perlu verifikasi manual akun perusahaan"
        formContent={
          <>
            <div>
              <Input
                name="company-name"
                placeholder="nama lengkap"
                type="text"
                htmlFor="company-name"
                label="Nama Perusahaan"
              />
              <span className="text-gray-400 text-xs">Nama resmi yang lengkap</span>
            </div>
            <div>
              <Input
                name="email"
                placeholder="email"
                type="email"
                htmlFor="email"
                label="Email"
              />
              <span className="text-gray-400 text-xs">Disarankan email domain resmi, misal: manager@namaperusahaan.com</span>
            </div>
            <div>
              <Input
                name="company-name"
                placeholder="nama lengkap"
                type="text"
                htmlFor="company-name"
                label="Nama Perusahaan"
              />
              <span className="text-gray-400 text-xs">Contoh: Nomor SIUP/NPWP Perusahaan</span>
            </div>
          </>
        }
        footerContent={
          <>
            <button className="bg-[#3BC152] text-white px-20 py-3 rounded-xl cursor-pointer">
              Lanjut & kode verifikasi
            </button>
            <p className="text-center text-black/65">
              sudah punya aku?{" "}
              <span className="text-[#3BC152] cursor-pointer" onClick={() => navigate("/auth/company/login")}>
                Daftar disini
              </span>
            </p>
          </>
        }
      />
    </AuthLayout>
  );
};

export default CompanyRegisterPage;
