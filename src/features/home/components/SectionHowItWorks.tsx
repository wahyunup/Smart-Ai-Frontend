import Card from "../../../shared/components/ui/Card";
import UploadCloud from "../../../assets/icons/upload-cloud.svg";
import Ocr from "../../../assets/icons/ekstaksi-text.svg";
import Embeding from "../../../assets/icons/embeding.svg";
import Chatbot from "../../../assets/icons/chatbot.svg";
import Arrow from "../../../assets/icons/arrow.svg";

const SectionHowItWorks = () => {
  return (
    <div className="bg-white py-50 my-30 flex flex-col items-center gap-10 rounded-4xl  " id="howitworks">
      <h1 className="text-6xl font-semibold">Bagaimana SmartAI Bekerja</h1>
      <p className="text-xl text-[#5A5A5A]">
        SmartAI mengubah dokumen perusahaan Anda menjadi pengetahuan cerdas yang
        bisa diakses melalui chatbot.
      </p>

      <div className="flex container gap-5">
        <Card
          classname="outline-0"
          icon={UploadCloud}
          heading="Upload Dokumen"
          subheading="Unggah dokumen perusahaan (PDF, gambar, atau teks). Sistem otomatis memulai proses analisis."
        />
        <img src={Arrow} alt="" />
        <Card
          classname="outline-0"
          icon={Ocr}
          heading="Ekstraksi Teks (OCR)"
          subheading="SmartAI mengekstrak isi dokumen menggunakan teknologi OCR agar teks bisa dipahami sistem."
        />
        <img src={Arrow} alt="" />
        <Card
          classname="outline-0"
          icon={Embeding}
          heading="Pembuatan Embedding"
          subheading="Teks yang sudah dibaca diubah menjadi vektor embedding dan disimpan ke basis data pintar (Vector DB)."
        />
        <img src={Arrow} alt="" />
        <Card
          classname="outline-0"
          icon={Chatbot}
          heading="Chat dengan AI"
          subheading="Ajukan pertanyaan apa pun! SmartAI akan mencari jawaban dari dokumen Anda dengan cepat dan akurat."
        />
      </div>
    </div>
  );
};

export default SectionHowItWorks;
