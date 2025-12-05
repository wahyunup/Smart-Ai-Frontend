import { useEffect, useState } from "react";
import Input from "../../../../../shared/components/ui/Input";
import MainLayout from "../../../../../shared/layouts/MainLayout";
import Button from "../../../../../shared/components/ui/Button";

const SubscriptionRequestPage = () => {
  const [dataCompany, setDataCompany] = useState({
    companyName: "",
    companyEmail: "",
  });

  useEffect(() => {
    setDataCompany({
      companyEmail: "mycompany@example.com",
      companyName: "PT. myCompany",
    });
  }, []);
  return (
    <MainLayout>
      <div className="flex flex-col gap-6 items-center mt-5 ">
        <div className="flex flex-col gap-1 items-center">
          <h1 className="text-3xl font-semibold">Subcription</h1>
          <p className="text-sm text-[#666666]">
            Pengajuan Pesanan: Upgrade ke Enterprise Plan
          </p>
        </div>

        <div className="flex gap-5 ">
          {/* row 1 */}
          <div className="bg-white border rounded-2xl">
            <div className="border-b border-gray-100">
              <h1 className="px-5 py-4 text-2xl">
                1. Detail Penggunaan & Kebutuhan
              </h1>
            </div>

            <div className="p-5 flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <Input
                  label=" Perkiraan Jumlah Karyawan yang Akan Menggunakan Chatbot (Saat
                  Ini)"
                  labelLayout="block"
                  type="number"
                  variant="primary"
                  classname=""
                />
                <p className="text-[#000000A6] text-xs">
                  *(Paket Enterprise mendukung pengguna tak terbatas, namun
                  jumlah awal memengaruhi setup kami)
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <p className="font-semibold 2xl:text-md md:text-sm">
                  Perlu Dihubungkan ke Sistem Internal Perusahaan? (Contoh: CRM,
                  Database)
                </p>
                <textarea
                  className="outline-2 rounded-xl p-3 outline-[#48E48954] h-30 placeholder:text-xs placeholder:text-gray-400 text-sm"
                  placeholder="Jelaskan kebutuhan Anda. Contoh: Kami ingin data dari Chatbot masuk ke sistem CRM Sales kami / Kami ingin menghubungkannya ke Database internal."
                />
              </div>

              <div className="flex flex-col gap-2">
                <p className="font-semibold 2xl:text-md md:text-sm">
                  Permintaan Fitur Khusus Lainnya (Contoh: Pelaporan custom,
                  bahasa asing, dll.)
                </p>
                <textarea
                  className="outline-2 rounded-xl outline-[#48E48954] h-30 placeholder:text-xs placeholder:text-gray-400 p-3 text-sm"
                  placeholder="Tuliskan permintaan khusus Anda di luar fitur standar. (Opsional)"
                />
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex gap-5">
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
                <p className="text-xs text-[#666666] text-center">
                  *Jika data ini salah, silakan ubah di halaman Profile
                  Perusahaan sebelum mengajukan pesanan.
                </p>
              </div>
            </div>
          </div>

          {/* row 2 */}
          <div className="bg-white border rounded-2xl h-fit max-w-[450px]">
            <div className="border-b ">
              <h1 className="px-5 text-3xl font-bold py-5 text-[#126F3D]">
                Ringkasan Kostum
              </h1>
            </div>

            <div className="p-5 flex flex-col gap-3">
              <div className="bg-[#FFF06933] rounded-xl border-l-4 border-[#FFE105] p-3 flex flex-col gap-1">
                <h1 className="text-xl font-semibold">
                  Enterprise Plan: Harga Kustom
                </h1>
                <p className="text-xs text-[#2F2F2F]">
                  Harga akan dibuat khusus setelah Tim Kami meninjau kebutuhan
                  integrasi dan skala pengguna Anda.
                </p>
              </div>

              <div>
                <h1 className="text-sm">
                  Paket yang Diminta:{" "}
                  <span className="font-semibold">Enterprise Plan </span>Akan
                  Dikonfirmasi
                </h1>
              </div>

              <div className="flex flex-col gap-2 mt-5">
                <p className="text-sm">Estimasi Biaya & Kostum</p>
                <div className="bg-[#FFAC854D] rounded-xl border-l-4 border-[#DB3726] p-3 flex flex-col gap-1">
                  <h1 className="text-lg font-semibold">
                    Penting! Alur Selanjutnya
                  </h1>
                  <p className="text-xs text-[#2F2F2F]">
                    1. Permintaan Anda diteruskan ke Tim Kami. <br />
                    2. Tim akan menganalisis kebutuhan API. <br />
                    3. Anda akan dihubungi untuk negosiasi & penentuan harga
                    akhir. <br />
                    4. Invoice akan dibuat setelah harga disepakati.
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-3">
                <Button variant="secondary" classname="py-3 rounded-2xl">
                  Kirim Permintaan Harga Khusus
                </Button>
                <Button
                  classname="py-3 rounded-2xl border-red-600"
                  variant="cancel">
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
