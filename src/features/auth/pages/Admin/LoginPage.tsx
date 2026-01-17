import Input from "../../../../shared/components/ui/Input";
import AuthLayout from "../../../../shared/layouts/AuthLayout";
import AuthSection from "../../components/AuthSection";
import Button from "../../../../shared/components/ui/Button";
import { Icon } from "@iconify/react";
import { useAdminCompanyLogin } from "../../hooks/Admin/useLogin";
const CompanyLoginPage = () => {
  const {
    form,
    handleLogin,
    handleOnChange,
    isLoading,
    setShowingPassword,
    showingPassword,
    navigate,
  } = useAdminCompanyLogin();
  
  return (
    <AuthLayout>
      <AuthSection
        classname="gap-1"
        headingAuth="Selamat Datang Kembali"
        subHeadingAuth="Masuk sebagai Administrator SmartAI."
        formContent={
          <div className="md:w-100 w-90 flex flex-col gap-2">
            <Input
              variant="primary"
              label="Email Perusahaan"
              name="email"
              type="email"
              htmlFor="email"
              placeholder="Masukan email perusahaan"
              value={form.email}
              onchange={handleOnChange}
            />
            <div>
              <Input
                variant="primary"
                label="Kata Sandi"
                name="password"
                placeholder="Masukan kata sandi"
                type={`${showingPassword ? "text" : "password"}`}
                htmlFor="password"
                tooglePassword={() => setShowingPassword(!showingPassword)}
                showPassword={showingPassword}
                value={form.password}
                onchange={handleOnChange}
              />
              <span
                onClick={() => navigate("/auth/reset-password-send-email")}
                className="text-[#0B5C37] text-xs cursor-pointer">
                Lupa kata sandi?
              </span>
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
                onclick={handleLogin}
                variant="primary"
                classname="py-3 w-full">
                Masuk
              </Button>
            )}
            <p className="text-center text-black/65 mt-3 2xl:text-sm text-xs">
              Ingin Mendaftarkan Perusahaan Anda? Daftar Sebagai Admin
              Perusahaan
              <span
                className="text-[#3BC152] cursor-pointer ml-1"
                onClick={() => navigate("/auth/company-admin/register")}>
                di Sini
              </span>
            </p>
          </div>
        }
      />
    </AuthLayout>
  );
};

export default CompanyLoginPage;
