import { useNavigate } from "react-router-dom";
import Input from "../../../shared/components/ui/Input";
import AuthLayout from "../../../shared/layouts/AuthLayout";
import AuthSection from "../components/AuthSection";

const CompanyLoginPage = () => {
  const navigate = useNavigate()
  return (
    <AuthLayout>
      <AuthSection
        classname="gap-1"
        headingAuth="Selamat Datang Kembali"
        subHeadingAuth="Masuk ke akun Querymind anda"
        formContent={
          <>
            <Input name="email" placeholder="email perusahaan" type="email" />
            <div>
              <Input name="password" placeholder="kata sandi" type="password" />
              <span className="text-[#3BC152] text-xs cursor-pointer">
                Lupa kata sandi?
              </span>
            </div>
          </>
        }
        footerContent={
          <>
            <button className="bg-[#3BC152] text-white px-20 py-3 rounded-xl cursor-pointer">
              Masuk
            </button>
            <p className="text-center text-black/65">
              belum punya aku?{" "}
              <span className="text-[#3BC152] cursor-pointer" onClick={() => navigate("/auth/company/register")}>
                Daftar disini
              </span>
            </p>
          </>
        }
      />
    </AuthLayout>
  );
};

export default CompanyLoginPage;
