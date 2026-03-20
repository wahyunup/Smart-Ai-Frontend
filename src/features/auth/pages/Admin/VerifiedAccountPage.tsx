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
          <div className="flex flex-col items-center gap-8">
            {/* success icon with green glow */}
            <div className="relative flex items-center justify-center">
              <div className="absolute w-24 h-24 rounded-full bg-[#16FF6E]/10 blur-xl" />
              <Icon
                icon="qlementine-icons:success-12"
                color="#16FF6E"
                width="80"
                className="relative z-10 drop-shadow-[0_0_16px_rgba(22,255,110,0.5)]"
              />
            </div>
            <p className="font-dm text-[#6B8C80] text-base text-center leading-[1.7] max-w-[460px]">
              Perusahaan Anda kini terdaftar di sistem multi-tenant SmartAI.
              Anda dapat login dengan Email Perusahaan dan Kata Sandi yang sudah
              Anda daftarkan.
            </p>
          </div>
        }
        footerContent={
          <Button
            onclick={() => navigate("/auth/company-admin/login")}
            variant="primary"
            classname="group px-16 py-3.5 flex items-center gap-2.5"
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
        }
      />
    </AuthLayout>
  );
};
