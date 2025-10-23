import { Icon } from "@iconify/react";
import Card from "../../../shared/components/ui/Card";

const SectionFeature = () => {
  return (
    <div
      className="bg-white py-20 flex flex-col items-center gap-10 rounded-4xl"
      id="feature">
      <h1 className="text-6xl font-semibold font-manrope">
        Apa yang Bisa Dilakukan SmartAI?
      </h1>
      <p className="text-xl text-[#5A5A5A] font-inter">
        Solusi pintar untuk membantu perusahaan mengelola dan mengakses dokumen
        internal dengan cepat dan efisien.
      </p>
      <div className="grid grid-cols-4 gap-5 container mt-10">
        <Card
          iconLayout="left"
          classname=" bg-[#8BEC8940] px-8 py-10"
          heading="Upload Dokumen"
          subheading="Unggah dokumen penting perusahaan dengan mudah. Sistem akan otomatis memprosesnya untuk digunakan chatbot."
          icon={
            <Icon
              color="#fff"
              icon="carbon:cloud-upload"
              width="40"
              height="40"
            />
          }
        />
        <Card
          iconLayout="left"
          classname=" bg-[#8BEC8940] px-8 py-10"
          heading="Pemindaian OCR Otomatis"
          subheading="Dokumen yang diunggah akan dipindai otomatis menggunakan OCR untuk mengenali dan mengekstrak teks secara cepat dan akurat."
          icon={
            <Icon
              color="#fff"
              icon="fluent:document-search-32-regular"
              width="40"
              height="40"
            />
          }
        />
        <Card
          iconLayout="left"
          classname=" bg-[#8BEC8940] px-8 py-10"
          heading="Chatbot"
          subheading="Ajukan pertanyaan dan dapatkan jawaban akurat berdasarkan dokumen perusahaan Anda, didukung teknologi AI terkini."
          icon={
            <Icon color="#fff" icon="mage:we-chat" width="40" height="40" />
          }
        />
        <Card
          iconLayout="left"
          classname=" bg-[#8BEC8940] px-8 py-10"
          heading="Dashboard & Monitoring"
          subheading="Pantau status dokumen, proses OCR, dan performa chatbot dalam satu tampilan dashboard yang informatif."
          icon={
            <Icon
              color="#fff"
              icon="streamline-plump:signal-full"
              width="35"
              height="35"
            />
          }
        />
      </div>
    </div>
  );
};
export default SectionFeature;
