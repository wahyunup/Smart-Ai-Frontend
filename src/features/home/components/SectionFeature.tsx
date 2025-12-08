import { Icon } from "@iconify/react";
import Card from "../../../shared/components/ui/Card";

const SectionFeature = () => {
  return (
    <div
      className="bg-white py-20 flex flex-col items-center md:gap-10 gap-5 rounded-4xl px-7"
      id="feature">
      <h1 className="text-2xl text-center 2xl:text-6xl md:text-4xl  md:font-semibold font-bold font-manrope">
        Apa yang Bisa Dilakukan SmartAI?
      </h1>
      <p className="text-center text-[15px] 2xl:text-xl text-sm md:text-base text-[#5A5A5A] font-inter">
        Solusi pintar untuk membantu perusahaan mengelola dan mengakses dokumen
        internal dengan cepat dan efisien.
      </p>
      <div className="grid px-3 md:grid-cols-4 gap-5 container mt-10">
        <Card
          iconLayout="left"
          classname=" bg-[#8BEC8940] px-4 py-5 2xl:px-8 2xl:py-10 md:px-6 md:py-5"
          heading="Upload Dokumen"
          subheading="Unggah dokumen penting perusahaan dengan mudah. Sistem akan otomatis memprosesnya untuk digunakan chatbot."
          icon={
            <Icon
              color="#fff"
              icon="carbon:cloud-upload"
              className="2xl:size-[40px] md:size-[30px] size-[25px]"
            />
          }
        />
        <Card
          iconLayout="left"
          classname=" bg-[#8BEC8940] px-4 py-5 2xl:px-8 2xl:py-10 md:px-6 md:py-5"
          heading="Pemindaian OCR Otomatis"
          subheading="Dokumen yang diunggah akan dipindai otomatis menggunakan OCR untuk mengenali dan mengekstrak teks secara cepat dan akurat."
          icon={
            <Icon
              color="#fff"
              icon="fluent:document-search-32-regular"
              className="2xl:size-[40px] md:size-[30px] size-[25px]"
            />
          }
        />
        <Card
          iconLayout="left"
          classname=" bg-[#8BEC8940] px-4 py-5 2xl:px-8 2xl:py-10 md:px-6 md:py-5"
          heading="Chatbot"
          subheading="Ajukan pertanyaan dan dapatkan jawaban akurat berdasarkan dokumen perusahaan Anda, didukung teknologi AI terkini."
          icon={
            <Icon
              color="#fff"
              icon="mage:we-chat"
              className="2xl:size-[40px] md:size-[33px] size-[25px]"
            />
          }
        />
        <Card
          iconLayout="left"
          classname=" bg-[#8BEC8940] px-4 py-5 2xl:px-8 2xl:py-10 md:px-6 md:py-5"
          heading="Dashboard & Monitoring"
          subheading="Pantau status dokumen, proses OCR, dan performa chatbot dalam satu tampilan dashboard yang informatif."
          icon={
            <Icon
              className="2xl:size-[35px] md:size-[25px] size-[25px]"
              color="#fff"
              icon="streamline-plump:signal-full"
            />
          }
        />
      </div>
    </div>
  );
};
export default SectionFeature;
