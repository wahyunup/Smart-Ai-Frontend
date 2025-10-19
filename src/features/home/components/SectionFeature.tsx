import Card from "../../../shared/components/ui/Card";

const SectionFeature = () => {
  return (
    <div
      className="bg-white py-20 text-center flex flex-col items-center gap-10 rounded-4xl"
      id="feature">
      <h1 className="text-6xl font-semibold">
        Apa yang Bisa Dilakukan SmartAI?
      </h1>
      <p className="text-xl text-[#5A5A5A]">
        Solusi pintar untuk membantu perusahaan mengelola dan mengakses dokumen
        internal dengan cepat dan efisien.
      </p>
      <div className="grid grid-cols-2 gap-5 container px-70">
        <Card
          classname="outline-2 shadow-xl"
          heading="Upload Dokumen"
          subheading="Unggah dokumen penting perusahaan dengan mudah. Sistem akan otomatis memprosesnya untuk digunakan chatbot."
          icon="/src/assets/icons/upload-cloud.svg"
        />
        <Card
          classname="outline-2 shadow-xl"
          heading="Pemindaian OCR Otomatis"
          subheading="Dokumen yang diunggah akan dipindai otomatis menggunakan OCR untuk mengenali dan mengekstrak teks secara cepat dan akurat."
          icon="/src/assets/icons/ocr.svg"
        />
        <Card
          classname="outline-2 shadow-xl"
          heading="Chatbot"
          subheading="Ajukan pertanyaan dan dapatkan jawaban akurat berdasarkan dokumen perusahaan Anda, didukung teknologi AI terkini."
          icon="/src/assets/icons/chatbot.svg"
        />
        <Card
          classname="outline-2 shadow-xl"
          heading="Dashboard & Monitoring"
          subheading="Pantau status dokumen, proses OCR, dan performa chatbot dalam satu tampilan dashboard yang informatif."
          icon="/src/assets/icons/dashboard-and-monitoring.svg"
        />
      </div>
    </div>
  );
};
export default SectionFeature;
