import Input from "../../../../../shared/components/ui/Input";
import MainLayout from "../../../../../shared/layouts/MainLayout";
import Button from "../../../../../shared/components/ui/Button";
import { useSubscriptionRequest } from "../../../hooks";

export const SubscriptionRequestPage = () => {
  const { dataCompany } = useSubscriptionRequest();

  return (
    <MainLayout>
      <div className="p-10 flex flex-col gap-8">
        {/* ── Page header ── */}
        <div className="text-center flex flex-col gap-2">
          <h1 className="font-syne font-extrabold text-white text-3xl">
            Subscription
          </h1>
          <p className="font-dm text-[#6B8C80] text-sm">
            Pengajuan Pesanan: Upgrade ke Enterprise Plan
          </p>
        </div>

        <div className="flex gap-5">
          {/* ── Row 1: Detail & Kebutuhan ── */}
          <div
            className="relative bg-[#0A1A20] border border-[#16FF6E]/[.07]
                        rounded-[20px] overflow-hidden flex-1"
          >
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#16FF6E]/20 to-transparent" />
            <div className="border-b border-[#16FF6E]/[.07] px-6 py-4">
              <h2 className="font-syne font-bold text-white text-xl">
                1. Detail Penggunaan & Kebutuhan
              </h2>
            </div>

            <div className="p-6 flex flex-col gap-6">
              {/* Jumlah karyawan */}
              <div className="flex flex-col gap-2">
                <Input
                  label="Perkiraan Jumlah Karyawan yang Akan Menggunakan Chatbot (Saat Ini)"
                  labelLayout="block"
                  type="number"
                  variant="primary"
                />
                <p className="font-dm text-[#6B8C80] text-xs">
                  *(Paket Enterprise mendukung pengguna tak terbatas, namun
                  jumlah awal memengaruhi setup kami)
                </p>
              </div>

              {/* Sistem internal */}
              <div className="flex flex-col gap-2">
                <p className="font-dm font-medium text-[#6B8C80] text-sm">
                  Perlu Dihubungkan ke Sistem Internal Perusahaan? (Contoh: CRM,
                  Database)
                </p>
                <textarea
                  className="w-full h-28 px-4 py-3 rounded-[10px]
                             bg-[#0D1F27] border border-[#16FF6E]/[.10]
                             font-dm text-[#E8F4F0] text-sm
                             placeholder:text-[#6B8C80]/60 placeholder:text-xs
                             outline-none resize-none
                             focus:border-[#16FF6E]/40
                             focus:shadow-[0_0_0_3px_rgba(22,255,110,0.07)]
                             transition-all duration-200"
                  placeholder="Jelaskan kebutuhan Anda. Contoh: Kami ingin data dari Chatbot masuk ke sistem CRM Sales kami / Kami ingin menghubungkannya ke Database internal."
                />
              </div>

              {/* Fitur khusus */}
              <div className="flex flex-col gap-2">
                <p className="font-dm font-medium text-[#6B8C80] text-sm">
                  Permintaan Fitur Khusus Lainnya (Contoh: Pelaporan custom,
                  bahasa asing, dll.)
                </p>
                <textarea
                  className="w-full h-28 px-4 py-3 rounded-[10px]
                             bg-[#0D1F27] border border-[#16FF6E]/[.10]
                             font-dm text-[#E8F4F0] text-sm
                             placeholder:text-[#6B8C80]/60 placeholder:text-xs
                             outline-none resize-none
                             focus:border-[#16FF6E]/40
                             focus:shadow-[0_0_0_3px_rgba(22,255,110,0.07)]
                             transition-all duration-200"
                  placeholder="Tuliskan permintaan khusus Anda di luar fitur standar. (Opsional)"
                />
              </div>

              {/* Company info */}
              <div className="flex flex-col gap-3">
                <div className="flex gap-4">
                  <Input
                    variant="disable"
                    value={dataCompany.companyName}
                    label="Nama Perusahaan"
                    labelLayout="block"
                  />
                  <Input
                    variant="disable"
                    value={dataCompany.companyEmail}
                    label="Email Perusahaan"
                    labelLayout="block"
                  />
                </div>
                <p className="font-dm text-xs text-[#6B8C80]/70 text-center">
                  *Jika data ini salah, silakan ubah di halaman Profile
                  Perusahaan sebelum mengajukan pesanan.
                </p>
              </div>
            </div>
          </div>

          {/* ── Row 2: Ringkasan ── */}
          <div
            className="relative bg-[#0A1A20] border border-[#16FF6E]/[.07]
                        rounded-[20px] h-fit max-w-[420px] overflow-hidden"
          >
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#16FF6E]/20 to-transparent" />
            <div className="border-b border-[#16FF6E]/[.07] px-6 py-4">
              <h2 className="font-syne font-extrabold text-[#16FF6E] text-2xl">
                Ringkasan Kostum
              </h2>
            </div>

            <div className="p-6 flex flex-col gap-4">
              {/* Pricing notice */}
              <div
                className="bg-yellow-400/[.07] border-l-4 border-yellow-400/60
                            rounded-r-[10px] p-4 flex flex-col gap-1"
              >
                <h3 className="font-syne font-bold text-white text-lg">
                  Enterprise Plan: Harga Kustom
                </h3>
                <p className="font-dm text-xs text-[#6B8C80]">
                  Harga akan dibuat khusus setelah Tim Kami meninjau kebutuhan
                  integrasi dan skala pengguna Anda.
                </p>
              </div>

              <p className="font-dm text-sm text-[#6B8C80]">
                Paket yang Diminta:{" "}
                <span className="text-[#E8F4F0] font-medium">
                  Enterprise Plan
                </span>{" "}
                — Akan Dikonfirmasi
              </p>

              {/* Flow notice */}
              <div className="flex flex-col gap-2 mt-2">
                <p className="font-dm text-sm text-[#6B8C80]">
                  Estimasi Biaya & Kostum
                </p>
                <div
                  className="bg-red-400/[.07] border-l-4 border-red-400/60
                              rounded-r-[10px] p-4 flex flex-col gap-1"
                >
                  <h3 className="font-syne font-bold text-white text-base">
                    Penting! Alur Selanjutnya
                  </h3>
                  <p className="font-dm text-xs text-[#6B8C80] leading-relaxed">
                    1. Permintaan Anda diteruskan ke Tim Kami.
                    <br />
                    2. Tim akan menganalisis kebutuhan API.
                    <br />
                    3. Anda akan dihubungi untuk negosiasi & penentuan harga
                    akhir.
                    <br />
                    4. Invoice akan dibuat setelah harga disepakati.
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-4 flex flex-col gap-3">
                <Button
                  variant="primary"
                  classname="group py-3 rounded-[10px] flex items-center justify-center gap-2"
                >
                  Kirim Permintaan Harga Khusus
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
                <Button classname="py-3 rounded-[10px]" variant="cancel">
                  Batalkan Pesanan
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SubscriptionRequestPage;
