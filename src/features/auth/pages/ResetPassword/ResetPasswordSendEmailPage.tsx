import { useState } from "react";
import Input from "../../../../shared/components/ui/Input";
import AuthLayout from "../../../../shared/layouts/AuthLayout";
import AuthSection from "../../components/AuthSection";
import Button from "../../../../shared/components/ui/Button";
import { resetPasswordEmail } from "../../services/authApis";
import Swal from "sweetalert2";
import { Icon } from "@iconify/react";

const ResetPasswordSendEmailPage = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsloading] = useState(false);

  const handleSubmit = async () => {
    setIsloading(true);
    try {
      await resetPasswordEmail(email);
      Swal.fire({
        titleText: "Email Terkirim!",
        text: "Silakan periksa kotak masuk email Anda untuk melanjutkan proses reset kata sandi.",
        icon: "success",
        confirmButtonText: "oke",
        confirmButtonColor: "#2BA54B",
        buttonsStyling: true,
        customClass: {
          confirmButton: "primary-button",
        },
      });
    } catch (error: any) {
      Swal.fire({
        titleText: error.response.data.message,
        text: error.response.data.details.errors[0],
        icon: "error",
        confirmButtonText: "oke",
        confirmButtonColor: "#DB3726",
        buttonsStyling: true,
        customClass: {
          confirmButton: "danger-button",
        },
      });
    } finally {
      setIsloading(false);
    }
  };
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
