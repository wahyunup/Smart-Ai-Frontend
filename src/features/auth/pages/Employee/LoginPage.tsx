import AuthLayout from "../../../../shared/layouts/AuthLayout";
import AuthSection from "../../components/AuthSection";
import Input from "../../../../shared/components/ui/Input";
import Button from "../../../../shared/components/ui/Button";
import { Icon } from "@iconify/react";
import { useLoginEmployee } from "../../hooks";

export const EmployeeLoginPage = () => {
  const {
    form,
    handleLogin,
    handleOnChange,
    showingPassword,
    setShowingPassword,
    isLoading,
  } = useLoginEmployee();
  
  return (
    <AuthLayout>
      <AuthSection
        classname="gap-1"
        headingAuth="Selamat Datang Kembali"
        subHeadingAuth="Masuk ke akun SmartAI anda"
        subabHeading="Silakan gunakan kredensial yang telah diberikan oleh Admin Anda."
        formContent={
          <div className="flex flex-col gap-4 md:w-100 w-90">
            <Input
              variant="primary"
              onchange={handleOnChange}
              value={form.username}
              htmlFor={form.username}
              label="username"
              name="username"
              placeholder="Masukan username"
              type="text"
            />
            <div>
              <Input
                variant="primary"
                onchange={handleOnChange}
                value={form.password}
                name="password"
                htmlFor={form.password}
                label="Kata Sandi"
                placeholder="Masukan kata sandi"
                tooglePassword={() => setShowingPassword(!showingPassword)}
                showPassword={showingPassword}
                type={`${showingPassword ? "text" : "password"}`}
              />
              <span className="text-[#0B5C37] text-xs cursor-pointer">
                Lupa kata sandi? Hubungi admin perusahaan
              </span>
            </div>
          </div>
        }
        footerContent={
          <div className="w-80">
            {isLoading ? (
              <Button
                classname="py-3 w-full flex items-center justify-center"
                variant="primary">
                <Icon icon="line-md:loading-loop" width="24" height="24" />
              </Button>
            ) : (
              <Button
                onclick={handleLogin}
                classname="py-3 w-full"
                variant="primary">
                Masuk
              </Button>
            )}
          </div>
        }
      />
    </AuthLayout>
  );
};