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
          <div className="md:w-100 w-90 flex flex-col">
            <Input
              variant="secondary"
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
              variant="secondary"
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
          <div className="w-80">
            {isLoading ? (
              <Button
                variant="primary"
                classname="py-3 flex justify-center w-full">
                <Icon
                  className="text-center"
                  icon="line-md:loading-loop"
                  width="24"
                  height="24"
                />
              </Button>
            ) : (
              <Button
                onclick={handleSubmitResetPassword}
                variant="primary"
                classname="py-3 w-full">
                Reset Kata Sandi
              </Button>
            )}
          </div>
        }
      />
    </AuthLayout>
  );
};