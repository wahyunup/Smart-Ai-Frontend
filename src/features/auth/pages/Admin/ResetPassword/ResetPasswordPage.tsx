import Input from "../../../../../shared/components/ui/Input";
import AuthLayout from "../../../../../shared/layouts/AuthLayout";
import AuthSection from "../../../components/AuthSection";
import Button from "../../../../../shared/components/ui/Button";
import { Icon } from "@iconify/react";
import { useResetPassword } from "../../../hooks/Admin/ResetPassword/useResetPassword";

export const ResetPasswordPage = () => {
  const {
    form,
    handleOnChange,
    handleSubmitResetPassword,
    isLoading,
    isVisible,
    setIsVisible,
  } = useResetPassword();

  return (
    <AuthLayout>
      <AuthSection
        headingAuth="Reset Kata Sandi"
        subHeadingAuth="Buat kata sandi yang kuat dan beda dari kata sandi lamamu."
        formContent={
          <div className="md:w-100 w-90 flex flex-col gap-4">
            <Input
              variant="primary"
              htmlFor="password"
              label="Kata Sandi Baru"
              labelLayout="block"
              name="password"
              onchange={handleOnChange}
              value={form.password}
              type={!isVisible.password ? "password" : "text"}
              showPassword={isVisible.password}
              tooglePassword={() =>
                setIsVisible({
                  password: !isVisible.password,
                  passwordConfirm: false,
                })
              }
            />
            <Input
              variant="primary"
              htmlFor="passwordConfirm"
              label="Konfirmasi Kata Sandi"
              labelLayout="block"
              name="passwordConfirm"
              onchange={handleOnChange}
              value={form.passwordConfirm}
              type={!isVisible.passwordConfirm ? "password" : "text"}
              showPassword={isVisible.passwordConfirm}
              tooglePassword={() =>
                setIsVisible({
                  password: false,
                  passwordConfirm: !isVisible.passwordConfirm,
                })
              }
            />
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
                onclick={handleSubmitResetPassword}
                variant="primary"
                classname="group w-full py-3.5 flex items-center justify-center gap-2.5"
              >
                Reset Kata Sandi
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
