import Button from "../../../../../shared/components/ui/Button";
import successImage from "../../../../../../public/img succes transaction.png";
import { usePaymentSuccess } from "../../../hooks";

export const PaymentSuccessPage = () => {
  const { navigate, status, trx_id } = usePaymentSuccess();

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#040B0E] relative overflow-hidden">
      {/* ambient glow */}
      <div className="absolute top-[20%] left-[25%] w-[400px] h-[400px] rounded-full bg-[#16FF6E]/[.04] blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[20%] w-[300px] h-[300px] rounded-full bg-[#09E86E]/[.03] blur-[80px] pointer-events-none" />

      <div
        className="relative z-10 py-8 px-10
                    bg-[#0A1A20] border border-[#16FF6E]/[.12]
                    rounded-[24px] flex flex-col items-center gap-6
                    shadow-[0_0_0_1px_rgba(22,255,110,0.08),0_20px_60px_rgba(0,0,0,0.5)]
                    overflow-hidden"
      >
        {/* shimmer top */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#16FF6E]/40 to-transparent" />

        {/* Success image */}
        <img
          src={successImage}
          alt="success"
          className="w-32 h-32 object-contain"
        />

        {/* Title */}
        <h1 className="font-syne font-extrabold text-white text-3xl">
          Pembayaran Sukses!
        </h1>

        {/* Status card */}
        <div
          className="bg-[#16FF6E]/[.05] border border-[#16FF6E]/20
                      rounded-[14px] p-5 flex flex-col gap-4 w-96"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-[#16FF6E]/15 to-transparent" />

          {[
            { label: "Paket Aktif", value: status.plan_name },
            { label: "Masa Aktif", value: status.active_end },
            { label: "Status", value: status.subscription_status },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-1">
              <h2 className="font-syne font-bold text-[#16FF6E] text-xs uppercase tracking-wider">
                {label}
              </h2>
              <p className="font-dm text-[#E8F4F0] text-sm">{value}</p>
            </div>
          ))}

          <div className="h-px bg-gradient-to-r from-transparent via-[#16FF6E]/15 to-transparent" />
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <Button
            onclick={() => navigate("/admin/subcription")}
            variant="secondary"
            classname="px-5 py-3 rounded-[10px] font-dm text-sm"
          >
            Kembali ke Dashboard Langganan
          </Button>
          <Button
            onclick={() =>
              navigate(`/admin/subcription/invoice?trx-id=${trx_id}`)
            }
            variant="primary"
            classname="group px-6 py-3 rounded-[10px] font-dm text-sm flex items-center gap-2"
          >
            Unduh Bukti Pembayaran
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </Button>
        </div>

        {/* Help text */}
        <p className="font-dm text-xs text-[#6B8C80]">
          Ada kendala? Hubungi Super Admin{" "}
          <span className="text-[#16FF6E] cursor-pointer hover:underline underline-offset-2 transition-colors duration-200">
            di Sini
          </span>
        </p>
      </div>
    </div>
  );
};
