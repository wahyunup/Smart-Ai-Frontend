import Input from "../../../../../shared/components/ui/Input";
import AuthLayout from "../../../../../shared/layouts/AuthLayout";
import AuthSection from "../../../components/AuthSection";
import Button from "../../../../../shared/components/ui/Button";
import { Icon } from "@iconify/react";
import { useResetPasswordSendEmail } from "../../../hooks/Admin/ResetPassword/useResetPasswordSendEmail";

const ResetPasswordSendEmailPage = () => {
  const {email,handleSubmit,isLoading,setEmail} = useResetPasswordSendEmail()
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
              variant="secondary"
              name="email"
              type="email"
              htmlFor="email"
              value={email}
              onchange={(e) => setEmail(e.target.value)}
            />
          </div>
        }
        footerContent={
          <div className="w-80">
            {isLoading ? (
              <Button variant="primary" classname="py-3 w-full flex justify-center">
                <Icon icon="line-md:loading-loop" width="24" height="24" />
              </Button>
            ) : (
              <Button
                onclick={handleSubmit}
                variant="primary"
                classname="py-3 w-full">
                Kirim
              </Button>
            )}
          </div>
        }
      />
    </AuthLayout>
  );
};

export default ResetPasswordSendEmailPage;
