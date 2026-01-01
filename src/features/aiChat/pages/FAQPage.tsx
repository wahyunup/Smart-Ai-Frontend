import { Search } from "lucide-react";
import Dropdown from "../../../shared/components/common/Dropdown/Dropdown";
import Input from "../../../shared/components/ui/Input";
import MainLayout from "../../../shared/layouts/MainLayout";
import { useState } from "react";

const FAQPage = () => {
  const [value, setValue] = useState("");
  const faq = [
    {
      heading: "Apa itu Smart AI?",
      field:
        "Smart AI adalah aplikasi chatbot berbasis Generative AI yang dirancang untuk membantu perusahaan dan tim dalam mencari informasi serta menganalisis data sesuai dengan kebutuhan dan peran pengguna di dalam perusahaan.",
    },
    {
      heading: "Siapa saja yang dapat menggunakan Smart AI?",
      field:
        "Smart AI digunakan oleh perusahaan atau divisi yang telah terdaftar. Pengguna (user) akan ditambahkan dan disetujui oleh Admin Perusahaan, kemudian dapat menggunakan Smart AI sesuai dengan peran (role) yang diberikan.",
    },
    {
      heading: "Apakah setiap user harus berlangganan sendiri?",
      field:
        "Tidak. Sistem berlangganan Smart AI berbasis perusahaan, bukan per user. Paket dan kuota ditentukan serta dibeli oleh Admin Perusahaan, dan seluruh user dalam perusahaan akan menggunakan paket tersebut.",
    },
    {
      heading: "Bagaimana cara mendapatkan akses ke Smart AI?",
      field:
        "Akses diperoleh melalui undangan atau pendaftaran yang disetujui oleh pihak Smart AI. Setelah akun Admin Perusahaan disetujui akan masuk ke masa trial untuk mulai menggunakan Smart AI.",
    },
    {
      heading: "Apa saja yang didapatkan dalam masa trial?",
      field:
        "Admin perusahaan dapat menambahkan maksimal tiga (3) user atau staf di dalam perusahaan. User yang ditambahkan tersebut dapat menggunakan Smart AI selama masa uji coba (trial) selama satu minggu.",
    },
    {
      heading: "Apa yang terjadi jika kuota penggunaan habis?",
      field:
        "Jika kuota perusahaan telah habis, seluruh user/staff tidak dapat menggunakan chatbot hingga Admin Perusahaan melakukan top-up kuota atau upgrade paket.",
    },
    {
      heading:
        "Apakah Smart AI dapat menyesuaikan jawaban berdasarkan role user?",
      field:
        "Ya. Smart AI dapat memberikan respons yang disesuaikan dengan role pengguna, sehingga informasi yang diberikan relevan dengan kewenangan dan kebutuhan masing-masing user/staff.",
    },
    {
      heading: "Apakah data perusahaan saya aman?",
      field:
        "Ya. Setiap data dan percakapan dipisahkan berdasarkan perusahaan (multi-company isolation) dan hanya dapat diakses oleh pihak yang berwenang sesuai peran masing-masing.",
    },
    {
      heading: "Siapa yang dapat melihat laporan penggunaan Smart AI?",
      field:
        "Laporan penggunaan, sisa kuota, dan aktivitas user hanya dapat dilihat oleh Admin Perusahaan dan pihak Smart AI untuk keperluan monitoring dan evaluasi sistem.",
    },
    {
      heading: "Apa yang terjadi jika masa berlangganan berakhir?",
      field:
        "Jika masa berlangganan berakhir, akses chatbot akan dibatasi hingga Admin Perusahaan melakukan perpanjangan paket. User tetap dapat login namun tidak dapat menggunakan fitur chatbot.",
    },
  ];
  const filter = faq.filter((f) =>
    f.heading.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="md:p-10 p-5">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Pusat Bantuan Smart AI</h1>
          <p className="text-[#666666] text-sm">
            Temukan jawaban cepat untuk pertanyaan umum mengenai penggunaan
            Chatbot.
          </p>
          <Input
            icon={<Search />}
            type="text"
            variant="third"
            onchange={(e) => setValue(e.target.value)}
            placeholder="Cari Jawaban, Contoh: ‘Cara Upload Dokumen’"
            classname="mt-5"
          />
        </div>
        <div className="text-center mt-5 flex flex-col md:gap-2 gap-2 border md:p-5 p-3 rounded-xl">
          <h1 className="md:text-2xl font-semibold">Pertanyaan</h1>
          {filter.length > 0 ? (
            filter.map((item, i) => (
              <Dropdown
                key={i}
                headingDropdown={item.heading}
                fieldDropdown={item.field}
              />
            ))
          ) : (
            <div>
              <p>"Tidak ditemukan FAQ yang sesuai"</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default FAQPage;
