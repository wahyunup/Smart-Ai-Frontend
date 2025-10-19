import { useNavigate } from "react-router-dom";
import Input from "../../../shared/components/ui/Input";
import AuthSection from "../components/AuthSection";
import AuthLayout from "../../../shared/layouts/AuthLayout";

const EmployeRegisterPage = () => {
  const navigate = useNavigate();
  return (
    <AuthLayout>
      <AuthSection
        classname="gap-4"
        headingAuth="Daftar Karyawan"
        subHeadingAuth="Kami perlu mengaitkan anda dengan perusahaan yang terdaftar"
        formContent={
          <>
            <Input
              htmlFor="email"
              label="Email"
              name="email"
              placeholder="cari perusahaan anda"
              type="emal"
            />
            <div>
              <Input
                htmlFor="id-employee"
                label="ID Karyawan (Employee ID)"
                name="id-employee"
                placeholder="masukan ID anda"
                type="text"
              />
              <span className="text-gray-400 text-sm">
                dapatkan ID dari perusahaan anda
              </span>
            </div>
          </>
        }
        footerContent={
          <>
            <button className="bg-[#3BC152] text-white px-20 py-3 rounded-xl cursor-pointer">
              Lanjut & Kode Verifikasi
            </button>
            <p className="text-center text-black/65">
              sudah punya aku?{" "}
              <span
                className="text-[#3BC152] cursor-pointer"
                onClick={() => navigate("/auth/employe/login")}>
                Masuk disini
              </span>
            </p>
          </>
        }
      />
    </AuthLayout>
  );
};

export default EmployeRegisterPage;
