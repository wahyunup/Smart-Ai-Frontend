import Button from "../../../../shared/components/ui/Button";
import Input from "../../../../shared/components/ui/Input";
import AuthLayout from "../../../../shared/layouts/AuthLayout";
import AuthSection from "../../components/AuthSection";
import { Icon } from "@iconify/react";
import { useLoginSuperadmin } from "../../hooks";

export const SuperadminLoginPage = () => {
  const {
    form,
    handleLogin,
    handleOnChange,
    showingPassword,
    setShowingPassword,
    isLoading,
  } = useLoginSuperadmin();

  return (
    <AuthLayout>
      <AuthSection
        headingAuth="Selamat Datang Kembali"
        subHeadingAuth="Masuk ke akun SmartAI sebagai Super Admin."
        formContent={
          <div className="flex flex-col gap-2 md:w-100 w-90">
            <Input
              variant="primary"
              onchange={handleOnChange}
              value={form.username}
              name="username"
              placeholder="masukan username"
              type="text"
              htmlFor="username"
              label="Username"
            />
            <Input
              variant="primary"
              onchange={handleOnChange}
              value={form.password}
              tooglePassword={() => setShowingPassword(!showingPassword)}
              showPassword={showingPassword}
              type={`${showingPassword ? "text" : "password"}`}
              name="password"
              placeholder="masukan kata sandi"
              htmlFor="password"
              label="Kata Sandi"
            />
            <p className="cursor-pointer text-[#0B5C37] text-xs text-start">
              Lupa kata sandi?
            </p>
          </div>
        }
        footerContent={
          <>
            {isLoading ? (
              <Button
                classname="w-80 py-3  flex items-center justify-center"
                variant="primary">
                <Icon icon="line-md:loading-loop" width="24" height="24" />
              </Button>
            ) : (
              <Button
                classname="w-80 py-3"
                variant="primary"
                onclick={handleLogin}>
                Masuk
              </Button>
            )}
          </>
        }></AuthSection>
    </AuthLayout>
  );
};