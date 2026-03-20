import Input from "../../../../../shared/components/ui/Input";
import AuthLayout from "../../../../../shared/layouts/AuthLayout";
import AuthSection from "../../../components/AuthSection";
import Button from "../../../../../shared/components/ui/Button";
import { Icon } from "@iconify/react";
import { useResetPasswordSendEmail } from "../../../hooks/Admin/ResetPassword/useResetPasswordSendEmail";

export const ResetPasswordSendEmailPage = () => {
  const { email, handleSubmit, isLoading, setEmail } =
    useResetPasswordSendEmail();

  return (
    <AuthLayout>
      <AuthSection
        headingAuth="Pemulihan Akun SmartAI"
        subHeadingAuth="Masukkan alamat email akun Anda, kami akan mengirimkan link untuk mereset password."
        formContent={
          <div className="md:w-100 w-90">
            <Input
              label="Email"
              placeholder="Masukan Email"
              labelLayout="block"
              variant="primary"
              name="email"
              type="email"
              htmlFor="email"
              value={email}
              onchange={(e) => setEmail(e.target.value)}
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
                onclick={handleSubmit}
                variant="primary"
                classname="group w-full py-3.5 flex items-center justify-center gap-2.5"
              >
                Kirim Link Reset
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
