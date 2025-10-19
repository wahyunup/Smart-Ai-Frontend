import AuthLayout from "../../../shared/layouts/AuthLayout";
import AuthSection from "../components/AuthSection";
import Button from "../../../shared/components/ui/Button";
import { useNavigate } from "react-router-dom";

const AuthorizeAuthPage = () => {
  const navigate = useNavigate()
  return (
    <AuthLayout>
      <AuthSection
        classname=""
        headingAuth="Selamat Datang di SmartAI"
        subHeadingAuth="Pilih peran Anda untuk memulai proses verifikasi"
        footerContent={
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Button variant="primary" classname="" onclick={() => navigate("/auth/company/register")}>
                <p className="font-medium">Daftarkan Perusahaan Anda</p>
                <p>Untuk Administrator atau Pendiri Perusahaan</p>
              </Button>
              <p className="text-sm text-center">
                Sudah punya akun Perusahaan?{" "}
                <span onClick={() => navigate("/auth/company/login")} className="text-[#3BC152] cursor-pointer"> Masuk di sini</span>
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <Button classname="" variant="primary" onclick={() => navigate("/auth/employe/register")}>
                <p className="font-medium">
                  Saya Karyawan Perusahan Yang terdaftar
                </p>
                <p>Untuk Karyawan Yang Ingin Bergabung</p>
              </Button>
              <p className="text-sm text-center">
                Sudah punya akun karyawan?{" "}
                <span className="text-[#3BC152] cursor-pointer" onClick={() => navigate("/auth/employe/login")}> Masuk di sini</span>
              </p>
            </div>
          </div>
        }
        formContent={""}
      />
    </AuthLayout>
  );
};

export default AuthorizeAuthPage;
