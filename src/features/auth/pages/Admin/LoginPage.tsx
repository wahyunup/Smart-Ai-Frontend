import Input from "../../../../shared/components/ui/Input";
import AuthLayout from "../../../../shared/layouts/AuthLayout";
import AuthSection from "../../components/AuthSection";
import Button from "../../../../shared/components/ui/Button";
import { Icon } from "@iconify/react";
import { useLoginAdmin } from "../../hooks";

export const CompanyLoginPage = () => {
  const {
    form,
    handleLogin,
    handleOnChange,
    isLoading,
    setShowingPassword,
    showingPassword,
    navigate,
  } = useLoginAdmin();

  return (
    <AuthLayout>
      <AuthSection
        classname="gap-4"
        headingAuth="Selamat Datang Kembali"
        subHeadingAuth="Masuk sebagai Administrator SmartAI."
        formContent={
          <div className="md:w-100 w-90 flex flex-col gap-4">
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
            <div className="flex flex-col gap-1.5">
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
                className="font-dm text-[12px] text-[#16FF6E] cursor-pointer
                           hover:underline underline-offset-2 transition-all duration-200
                           w-fit"
              >
                Lupa kata sandi?
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

            <p className="font-dm text-center text-[#6B8C80] 2xl:text-sm text-xs leading-relaxed">
              Ingin Mendaftarkan Perusahaan Anda? Daftar Sebagai Admin
              Perusahaan{" "}
              <span
                className="text-[#16FF6E] cursor-pointer hover:underline underline-offset-2 transition-all duration-200"
                onClick={() => navigate("/auth/company-admin/register")}
              >
                di Sini
              </span>
            </p>
          </div>
        }
      />
    </AuthLayout>
  );
};
