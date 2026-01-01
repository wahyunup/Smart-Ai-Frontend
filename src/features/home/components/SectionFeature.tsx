import { Icon } from "@iconify/react";
import Card from "../../../shared/components/ui/Card";

const SectionFeature = () => {
  return (
    <div
      className="bg-white py-20 flex flex-col items-center md:gap-10 gap-5 rounded-4xl px-7"
      id="feature">
      <h1
        className="text-2xl text-center 2xl:text-6xl md:text-4xl  md:font-semibold font-bold font-manrope"
        data-aos="fade-up"
        data-aos-duration="1000">
        Apa yang Bisa Dilakukan SmartAI?
      </h1>
      <p
        className="text-center text-[15px] 2xl:text-xl text-sm md:text-base text-[#5A5A5A] font-inter"
        data-aos="fade-up"
        data-aos-duration="1200">
        Solusi pintar untuk membantu perusahaan mengelola dan mengakses dokumen
        internal dengan cepat dan efisien.
      </p>
      <div className="grid px-3 md:grid-cols-4 gap-5 container mt-10">
        <div data-aos="fade-up" data-aos-duration="1400">
          <Card
            iconLayout="left"
            classname=" bg-[#FFFFFF] shadow-2xl/5 outline outline-gray-100 hover:scale-105 scale-100 transition-all duration-300 px-4 py-5 2xl:px-8 2xl:py-10 md:px-6 md:py-5"
            heading="Upload Dokumen"
            subheading="Unggah dokumen penting (PDF, Word, Excel). Siap dianalisis dan menjadi sumber jawaban chatbot."
            icon={
              <Icon
                color="#fff"
                icon="carbon:cloud-upload"
                className="2xl:size-[40px] md:size-[30px] size-[25px]"
              />
            }
          />
        </div>
        <div data-aos="fade-up" data-aos-duration="1600">
          <Card
            iconLayout="left"
            classname=" bg-[#FFFFFF] shadow-2xl/5 outline outline-gray-100 hover:scale-105 scale-100 transition-all duration-300 px-4 py-5 2xl:px-8 2xl:py-10 md:px-6 md:py-5"
            heading="Ekstraksi Teks Cerdas"
            subheading="Sistem memindai dan membaca teks dari dokumen, gambar, atau tabel, menjadikannya dapat dicari."
            icon={
              <Icon
                color="#fff"
                icon="fluent:document-search-32-regular"
                className="2xl:size-[40px] md:size-[30px] size-[25px]"
              />
            }
          />
        </div>
        <div data-aos="fade-up" data-aos-duration="1800">
          <Card
            iconLayout="left"
            classname=" bg-[#FFFFFF] shadow-2xl/5 outline outline-gray-100 hover:scale-105 scale-100 transition-all duration-300 px-4 py-5 2xl:px-8 2xl:py-10 md:px-6 md:py-5"
            heading="Chatbot"
            subheading="Ajukan pertanyaan. AI memberikan jawaban akurat dan referensi langsung dari data perusahaan."
            icon={
              <Icon
                color="#fff"
                icon="mage:we-chat"
                className="2xl:size-[40px] md:size-[33px] size-[25px]"
              />
            }
          />
        </div>
        <div data-aos="fade-up" data-aos-duration="2000">
          <Card
            iconLayout="left"
            classname=" bg-[#FFFFFF] shadow-2xl/5 outline outline-gray-100 hover:scale-105 scale-100 transition-all duration-300 px-4 py-5 2xl:px-8 2xl:py-10 md:px-6 md:py-5"
            heading="Dashboard & Monitoring"
            subheading="Lacak penggunaan chatbot, kinerja, dan akurasi data dalam satu dashboard terpusat."
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
    </div>
  );
};
export default SectionFeature;
