import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../../../shared/layouts/AuthLayout";
import AuthSection from "../../components/AuthSection";
import Button from "../../../../shared/components/ui/Button";

export const VerifiedAccountPage = () => {
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <AuthSection
        headingAuth="Selamat! Akun Admin Anda Telah Aktif!"
        formContent={
          <div className="flex flex-col items-center gap-10">
            <Icon
              icon="qlementine-icons:success-12"
              color="#1D8A45"
              width="100"
            />
            <p className="text-[#282222] text-lg text-center">
              Perusahaan Anda kini terdaftar di sistem multi-tenant SmartAI.
              Anda dapat login dengan <br /> Email Perusahaan dan Kata Sandi
              yang sudah Anda daftarkan.
            </p>
          </div>
        }
        footerContent={
          <>
            <Button
              onclick={() => navigate("/auth/company-admin/login")}
              variant="primary"
              classname="px-30 py-3">
              Masuk
            </Button>
          </>
        }
      />
    </AuthLayout>
  );
};