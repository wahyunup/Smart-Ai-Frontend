import { Check } from "lucide-react";
import MainLayout from "../../../../../shared/layouts/MainLayout";
import { Icon } from "@iconify/react";
import { useSelectSubcription } from "../../../hooks";

export const SelectSubcriptionPage = () => {
  const { currentPlan, data, handlePayment, isLoading, optionPlan } =
    useSelectSubcription();

  return (
    <MainLayout>
      <div className="p-10 overflow-auto">
        {/* ── Header ── */}
        <div className="flex flex-col gap-2 text-center mb-10">
          <h1 className="font-syne font-extrabold text-white text-4xl">
            Pilih Paket Layanan SMART AI
          </h1>
          <p className="font-dm text-[#6B8C80]">
            Paket Anda saat ini adalah Basic Plan. Pilih opsi di bawah untuk
            Upgrade/Top Up.
          </p>
        </div>

        {/* ── Plan cards ── */}
        <div className="flex gap-4 justify-center flex-wrap">
          {/* Trial card */}
          {currentPlan === undefined && (
            <div
              className={`relative py-8 px-6 w-72 flex flex-col gap-4 rounded-[20px] overflow-hidden
                          transition-all duration-300
                          ${
                            currentPlan === undefined
                              ? "bg-[#16FF6E]/[.04] border-2 border-[#16FF6E]/30"
                              : "bg-[#0A1A20] border border-[#16FF6E]/[.07] hover:border-[#16FF6E]/20"
                          }`}
            >
              {currentPlan === undefined && (
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#16FF6E]/40 to-transparent" />
              )}
              <div className="flex flex-col gap-1">
                <h2 className="font-syne font-extrabold text-[#16FF6E] text-4xl">
                  Trial
                </h2>
                <p className="font-dm text-[#6B8C80] text-sm">Trial</p>
              </div>
              <p className="font-dm text-[#6B8C80] text-sm">
                <span className="font-syne font-bold text-white text-2xl">
                  Gratis 7 Hari
                </span>
              </p>
              {currentPlan === undefined ? (
                <button className="w-full px-6 py-2.5 rounded-full font-dm font-medium text-sm bg-[#16FF6E]/10 text-[#16FF6E] border border-[#16FF6E]/20 cursor-default">
                  Paket Aktif Saat Ini
                </button>
              ) : (
                <button className="w-full cursor-pointer px-6 py-2.5 rounded-full font-dm font-medium text-sm bg-[#16FF6E] text-[#040B0E] hover:shadow-[0_0_24px_rgba(22,255,110,0.4)] transition-all duration-200">
                  Upgrade ke Trial Plan
                </button>
              )}
              <div className="font-dm text-xs text-[#6B8C80] flex flex-col gap-2">
                {[
                  "100 pertanyaan / bulan",
                  "Maksimal 2 Users",
                  "Tidak ada Custom Prompt",
                  "5 Dokumen",
                ].map((f) => (
                  <p key={f} className="flex items-center gap-2">
                    <Check className="text-[#16FF6E] shrink-0" size={13} />
                    {f}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Plan cards */}
          {data.map((item: any) => (
            <div
              key={item.id}
              className={`relative py-8 px-6 w-72 flex flex-col gap-4 rounded-[20px] overflow-hidden
                          transition-all duration-300
                          ${
                            item.name === currentPlan
                              ? "bg-[#16FF6E]/[.04] border-2 border-[#16FF6E]/30"
                              : "bg-[#0A1A20] border border-[#16FF6E]/[.07] hover:border-[#16FF6E]/20 hover:-translate-y-1"
                          }`}
            >
              {item.name === currentPlan && (
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#16FF6E]/40 to-transparent" />
              )}
              <div className="flex flex-col gap-1">
                <h2 className="font-syne font-extrabold text-[#16FF6E] text-4xl">
                  {item.name}
                </h2>
                <p className="font-dm text-[#6B8C80] text-sm">
                  {item.recomended_for}
                </p>
              </div>
              <p className="font-dm text-[#6B8C80] text-sm">
                <span className="font-syne font-bold text-white text-2xl">
                  {item.price === "Rp 0"
                    ? "Gratis 7 Hari"
                    : item.price.toLocaleString("id-ID")}
                </span>
                {item.price !== "Rp 0" && <span> /bulan</span>}
              </p>

              {item.name === currentPlan ? (
                <button className="w-full px-6 py-2.5 rounded-full font-dm font-medium text-sm bg-[#16FF6E]/10 text-[#16FF6E] border border-[#16FF6E]/20 cursor-default">
                  Paket Aktif Saat Ini
                </button>
              ) : isLoading === `plan-${item.id}` ? (
                <button className="w-full px-6 py-2.5 rounded-full font-dm text-sm border border-[#16FF6E]/30 text-[#16FF6E] flex items-center justify-center">
                  <Icon icon="line-md:loading-loop" width="20" height="20" />
                </button>
              ) : (
                <button
                  onClick={() => handlePayment(item.id)}
                  className="w-full cursor-pointer px-6 py-2.5 rounded-full font-syne font-bold text-sm bg-[#16FF6E] text-[#040B0E] hover:shadow-[0_0_24px_rgba(22,255,110,0.4)] transition-all duration-200"
                >
                  Upgrade ke {item.name}
                </button>
              )}

              <div className="font-dm text-xs text-[#6B8C80] flex flex-col gap-2">
                {[
                  item.question_quota.toLocaleString("id-ID"),
                  `Maksimal ${item.max_users}`,
                  item.allow_custom_prompts,
                  item.document_quota,
                ].map((f, i) => (
                  <p key={i} className="flex items-center gap-2">
                    <Check className="text-[#16FF6E] shrink-0" size={13} />
                    {f}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── Top Up section ── */}
        <div
          className="relative mt-10 bg-[#0A1A20] border border-[#16FF6E]/[.07]
                      rounded-[20px] p-6 flex flex-col items-center gap-6 overflow-hidden"
        >
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#16FF6E]/20 to-transparent" />

          <div className="flex flex-col gap-2 text-center border-b border-[#16FF6E]/[.07] pb-5 w-full">
            <h2 className="font-syne font-bold text-white text-2xl">
              Opsi Tambahan: Top Up Kuota (Pay-Per-Use)
            </h2>
            <p className="font-dm text-[#6B8C80] text-sm">
              Tambahkan kuota pertanyaan di luar paket langganan Anda untuk
              fleksibilitas. Kuota ditambahkan ke paket aktif saat ini.
            </p>
          </div>

          <div className="flex gap-4 flex-wrap justify-center">
            {optionPlan.map((item: any, i: number) => (
              <div
                key={i}
                className="flex flex-col justify-between gap-4
                           bg-[#16FF6E]/[.04] border border-[#16FF6E]/15
                           px-5 py-6 rounded-[16px] w-56
                           hover:border-[#16FF6E]/30 hover:-translate-y-1
                           transition-all duration-300"
              >
                <div className="flex flex-col gap-2">
                  <h3 className="font-syne font-bold text-[#16FF6E] text-2xl">
                    Top Up{" "}
                    <span className="capitalize">{item.package_type}</span>
                  </h3>
                  <p className="font-dm text-[#6B8C80] text-sm">
                    + {item.questions.toLocaleString("id-ID")} pertanyaan
                  </p>
                </div>
                <p className="font-syne font-bold text-white text-xl">
                  Rp {item.price.toLocaleString("id-ID")},-
                </p>
                {isLoading === `topup-${i}` ? (
                  <button className="w-full cursor-pointer px-5 py-2.5 rounded-full font-dm text-sm border border-[#16FF6E]/30 text-[#16FF6E] flex items-center justify-center">
                    <Icon icon="line-md:loading-loop" width="18" height="18" />
                  </button>
                ) : (
                  <button
                    onClick={() => handlePayment(i, item.package_type)}
                    className="font-dm font-medium text-sm text-[#040B0E]
                               bg-[#16FF6E] px-4 py-2.5 rounded-full cursor-pointer
                               hover:shadow-[0_0_20px_rgba(22,255,110,0.4)]
                               transition-all duration-200"
                  >
                    Tambah Kuota
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SelectSubcriptionPage;
