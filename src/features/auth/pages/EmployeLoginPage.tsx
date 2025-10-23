import Input from "../../../shared/components/ui/Input";
import AuthSection from "../components/AuthSection";
import AuthLayout from "../../../shared/layouts/AuthLayout";
import Button from "../../../shared/components/ui/Button";

const EmployeLoginPage = () => {

  return (
    <AuthLayout>
      <AuthSection
        classname="gap-1"
        headingAuth="Selamat Datang Kembali"
        subHeadingAuth="Masuk ke akun SmartAI anda"
        subabHeading="Silakan gunakan kredensial yang telah diberikan oleh Admin Anda."
        formContent={
          <div className="flex flex-col gap-4 w-100">
            <Input
              htmlFor="username"
              label="Username"
              name="username"
              placeholder="username"
              type="text"
            />
            <div>
              <Input
                name="password"
                htmlFor="password"
                label="Kata Sandi"
                placeholder="kata sandi"
                type="password"
              />
              <span className="text-[#3BC152] text-xs cursor-pointer">
                Lupa kata sandi?
              </span>
            </div>
          </div>
        }
        footerContent={
          <div className="w-80">
           <Button classname="py-3 w-full" variant="primary">Masuk</Button>
          </div>
        }
      />
    </AuthLayout>
  );
};

export default EmployeLoginPage;
