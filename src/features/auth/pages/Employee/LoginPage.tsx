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
        classname="gap-4"
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
              label="Username"
              name="username"
              placeholder="Masukan username"
              type="text"
            />
            <div className="flex flex-col gap-1.5">
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
              <span className="font-dm text-[12px] text-[#6B8C80] cursor-default w-fit">
                Lupa kata sandi?{" "}
                <span className="text-[#16FF6E]">Hubungi admin perusahaan</span>
              </span>
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
                onclick={handleLogin}
                variant="primary"
                classname="group w-full py-3.5 flex items-center justify-center gap-2.5"
              >
                Masuk
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
