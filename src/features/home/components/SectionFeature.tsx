import Card from "../../../shared/components/ui/Card";
import UploadCloud from "../../../assets/icons/upload-cloud.svg";
import Ocr from "../../../assets/icons/ocr.svg";
import Chatbot from "../../../assets/icons/chatbot.svg";
import Dashboard from "../../../assets/icons/dashboard-and-monitoring.svg";

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
          icon={UploadCloud}
        />
        <Card
          classname="outline-2 shadow-xl"
          heading="Pemindaian OCR Otomatis"
          subheading="Dokumen yang diunggah akan dipindai otomatis menggunakan OCR untuk mengenali dan mengekstrak teks secara cepat dan akurat."
          icon={Ocr}
        />
        <Card
          classname="outline-2 shadow-xl"
          heading="Chatbot"
          subheading="Ajukan pertanyaan dan dapatkan jawaban akurat berdasarkan dokumen perusahaan Anda, didukung teknologi AI terkini."
          icon={Chatbot}
        />
        <Card
          classname="outline-2 shadow-xl"
          heading="Dashboard & Monitoring"
          subheading="Pantau status dokumen, proses OCR, dan performa chatbot dalam satu tampilan dashboard yang informatif."
          icon={Dashboard}
        />
      </div>
    </div>
  );
};
export default SectionFeature;
