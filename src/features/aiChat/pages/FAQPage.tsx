import Dropdown from "../../../shared/components/common/Dropdown/Dropdown";
import MainLayout from "../../../shared/layouts/MainLayout";

const FAQPage = () => {
  const faq = [
    {
      heading: "Bisakah saya mengunggah dokumen sendiri?",
      field: "Ya",
    },
    {
      heading: "Apakah riwayat obrolan saya tersimpan?",
      field: "Ya, semua obrolan disimpan secara otomatis dan dapat diakses kembali melalui daftar riwayat di sidebar kiri.",
    },
    {
      heading: "Apa saja topik yang bisa saya tanyakan?",
      field: "banyak",
    },
  ];
  return (
    <MainLayout>
      <div className="md:p-10 p-5">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Pusat Bantuan Smart AI</h1>
          <p className="text-[#666666] text-sm">
            Temukan jawaban cepat untuk pertanyaan umum mengenai penggunaan
            Chatbot.
          </p>
        </div>
        <div className="text-center mt-5 flex flex-col md:gap-4 gap-2 border md:p-5 p-3 rounded-xl">
          <h1 className="md:text-2xl font-semibold">Pertanyaan</h1>
          {faq.map((item, i) => (
              <Dropdown
              key={i}
              headingDropdown={item.heading}
              fieldDropdown={item.field}
              />
            ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default FAQPage;
