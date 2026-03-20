import Input from "../../../../shared/components/ui/Input";
import AuthLayout from "../../../../shared/layouts/AuthLayout";
import AuthSection from "../../components/AuthSection";
import Button from "../../../../shared/components/ui/Button";
import { Icon } from "@iconify/react";
import { useRegister } from "../../hooks/Admin/useRegister";

export const CompanyRegisterPage = () => {
  const {
    handleOnChange,
    handleRegister,
    isLoading,
    setShowingPassword,
    setStep,
    showingPassword,
    step,
    verifyEmail,
    form,
    navigate,
    setIsLoading,
  } = useRegister();

  return (
    <AuthLayout>
      {step === 1 ? (
        <AuthSection
          classname="gap-5"
          headingAuth="Daftar Admin Perusahaan"
          subHeadingAuth="Kami perlu verifikasi manual akun admin perusahaan."
          formContent={
            <>
              <div className="flex flex-col items-start md:w-100 w-90">
                <Input
                  variant="primary"
                  onchange={handleOnChange}
                  value={form.companyName}
                  name="companyName"
                  placeholder="Masukan nama perusahaan"
                  type="text"
                  htmlFor="companyName"
                  label="Nama Perusahaan"
                />
                <p className="font-dm text-[#6B8C80] mt-2 text-xs">
                  Nama resmi yang lengkap.
                </p>
              </div>
              <div className="flex flex-col items-start md:w-100 w-90">
                <Input
                  variant="primary"
                  onchange={handleOnChange}
                  value={form.companyEmail}
                  name="companyEmail"
                  placeholder="Masukan email perusahaan"
                  type="email"
                  htmlFor="companyEmail"
                  label="Email Perusahaan"
                />
                <p className="font-dm text-[#6B8C80] mt-2 text-xs">
                  Email resmi yang lengkap.
                </p>
              </div>
            </>
          }
          footerContent={
            <div className="md:w-100 w-90 flex flex-col items-center gap-3">
              <Button
                onclick={() => setStep(2)}
                variant="primary"
                classname="w-full py-3.5 flex items-center justify-center gap-2.5 group"
              >
                Selanjutnya
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
              <p className="font-dm text-center text-[#6B8C80] text-xs">
                Sudah punya akun?{" "}
                <span
                  className="text-[#16FF6E] cursor-pointer hover:underline underline-offset-2 transition-all duration-200"
                  onClick={() => navigate("/auth/company-admin/login")}
                >
                  Masuk disini
                </span>
              </p>
            </div>
          }
        />
      ) : step === 2 ? (
        <AuthSection
          classname="gap-5"
          headingAuth="Daftar Admin Perusahaan"
          subHeadingAuth="Kami perlu verifikasi manual akun perusahaan"
          formContent={
            <>
              <div className="md:w-100 w-90">
                <Input
                  variant="primary"
                  onchange={handleOnChange}
                  value={form.picName}
                  name="picName"
                  placeholder="Masukan nama PIC"
                  type="text"
                  htmlFor="picName"
                  label="Nama PIC"
                />
              </div>
              <div className="md:w-100 w-90">
                <Input
                  variant="primary"
                  onchange={handleOnChange}
                  value={form.password}
                  name="password"
                  placeholder="Kata sandi"
                  tooglePassword={() => setShowingPassword(!showingPassword)}
                  showPassword={showingPassword}
                  type={`${showingPassword ? "text" : "password"}`}
                  htmlFor="password"
                  label="Kata sandi"
                />
              </div>
              <div className="md:w-100 w-90">
                <Input
                  variant="primary"
                  onchange={handleOnChange}
                  value={form.confirmPassword}
                  name="confirmPassword"
                  placeholder="Konfirmasi kata sandi"
                  tooglePassword={() => setShowingPassword(!showingPassword)}
                  showPassword={showingPassword}
                  type={`${showingPassword ? "text" : "password"}`}
                  htmlFor="confirmPassword"
                />
              </div>
            </>
          }
          footerContent={
            <div className="md:w-100 w-90 flex flex-col items-center gap-3">
              {isLoading ? (
                /* loading — same shape as primary button, disabled */
                <Button
                  variant="primary"
                  classname="w-full py-3.5 flex items-center justify-center gap-2.5 opacity-75 cursor-not-allowed pointer-events-none"
                >
                  <Icon icon="line-md:loading-loop" width="20" height="20" />
                  Memproses...
                </Button>
              ) : (
                <Button
                  onclick={handleRegister}
                  variant="primary"
                  classname="w-full py-3.5 flex items-center justify-center gap-2.5 group"
                >
                  Daftar
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
              <p className="font-dm text-center text-[#6B8C80] text-xs">
                Sudah punya akun?{" "}
                <span
                  className="text-[#16FF6E] cursor-pointer hover:underline underline-offset-2 transition-all duration-200"
                  onClick={() => navigate("/auth/company-admin/login")}
                >
                  Masuk disini
                </span>
              </p>
            </div>
          }
        />
      ) : step === 3 ? (
        <AuthSection
          classname="gap-5"
          headingAuth="Permintaan Anda Sedang Ditinjau"
          subHeadingAuth={
            <p className="text-center font-dm text-[#6B8C80] text-sm leading-relaxed">
              Terima kasih telah mendaftar. Kami akan menghubungi{" "}
              <span className="font-semibold text-[#16FF6E] underline underline-offset-2">
                {verifyEmail}
              </span>{" "}
              dalam 1×24 jam untuk verifikasi manual oleh tim Super Admin.
            </p>
          }
          formContent={
            <div className="relative flex justify-center">
              {!isLoading && (
                <div className="absolute inset-0 flex justify-center items-center">
                  <Icon
                    icon="line-md:loading-loop"
                    width="50"
                    height="50"
                    className="text-[#16FF6E]"
                  />
                </div>
              )}
              <iframe
                className="md:size-90 size-60"
                src="https://lottie.host/embed/a21bfb0a-9614-44ae-8570-4e8ccc51c538/lJq53o4oER.lottie"
                onLoad={() => setIsLoading(true)}
              />
            </div>
          }
          footerContent={
            <Button
              variant="link"
              classname="font-dm text-sm text-[#6B8C80] hover:text-[#16FF6E] underline-offset-2"
            >
              <a href="#">Hubungi Tim Dukungan Teknis</a>
            </Button>
          }
        />
      ) : (
        ""
      )}
    </AuthLayout>
  );
};
