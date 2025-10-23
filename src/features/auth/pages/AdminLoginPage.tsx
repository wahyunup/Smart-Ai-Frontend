import Button from "../../../shared/components/ui/Button";
import Input from "../../../shared/components/ui/Input";
import AuthLayout from "../../../shared/layouts/AuthLayout";
import AuthSection from "../components/AuthSection";

const AdminLoginPage = () => {
  return (
    <AuthLayout>
      <AuthSection
        classname=""
        headingAuth="Selamat Datang Kembali"
        subHeadingAuth="Masuk sebagai Administrator SmartAI."
        formContent={
          <div className="flex flex-col gap-2 w-100">
            <Input
              name="username"
              placeholder="masukan username"
              type="text"
              htmlFor="username"
              label="Username"
            />
            <Input
              name="password"
              placeholder="masukan kata sandi"
              type="password"
              htmlFor="password"
              label="Kata Sandi"
            />
            <p className="cursor-pointer text-[#3BC152] text-xs text-start">
              Lupa kata sandi?
            </p>
          </div>
        }
        footerContent={
          <>
            <Button classname="w-80 py-3" variant="primary">
              Masuk
            </Button>
            <p className=" text-sm text-center text-[#000000A6]">
              Ingin Mendaftarkan Perusahaan Anda? <br /> Daftar Sebagai Admin
              Perusahaan{" "}
              <a href="/auth/company-admin/register" className="text-[#3BC152] cursor-pointer">di Sini</a>
            </p>
          </>
        }></AuthSection>
    </AuthLayout>
  );
};

export default AdminLoginPage;
