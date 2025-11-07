import Card from "../../../shared/components/ui/Card";
import { Icon } from "@iconify/react";

const SectionHowItWorks = () => {
  return (
    <div
      className="bg-white py-50 flex flex-col items-center gap-10 rounded-4xl  "
      id="howitworks">
      <h1 className="2xl:text-6xl text-xl md:text-5xl font-semibold font-manrope">
        Bagaimana SmartAI Bekerja
      </h1>
      <p className="2xl:text-xl md:text-base text-[15px] text-center text-[#5A5A5A] font-inter">
        SmartAI mengubah dokumen perusahaan Anda menjadi pengetahuan cerdas yang
        bisa diakses melalui chatbot.
      </p>

      <div className="flex items-center flex-wrap md:flex-nowrap container gap-5 mt-15">
        <Card
          iconLayout="center"
          classname="outline-0 text-center"
          icon={
            <Icon
              color="#2BA54B"
              className="2xl:size-[58px] md:size-[48px] size-[50px]"
              icon="carbon:cloud-upload"
            />
          }
          heading="Upload Dokumen"
          subheading="Unggah dokumen perusahaan (PDF, gambar, atau teks). Sistem otomatis memulai proses analisis."
        />
        <Icon
          className="md:inline hidden"
          icon="cil:arrow-right"
          color="#E0E0E0"
          width="100"
          height="100"
        />

        <Card
          iconLayout="center"
          classname="outline-0 text-center"
          icon={
            <Icon
              icon="fluent:document-multiple-20-regular"
              color="#2BA54B"
              className="2xl:size-[58px] md:size-[48px] size-[50px]"
            />
          }
          heading="Ekstraksi Teks (OCR)"
          subheading="SmartAI mengekstrak isi dokumen menggunakan teknologi OCR agar teks bisa dipahami sistem."
        />
        <Icon
          className="md:inline hidden"
          icon="cil:arrow-right"
          color="#E0E0E0"
          width="100"
          height="100"
        />

        <Card
          iconLayout="center"
          classname="outline-0 text-center"
          icon={
            <Icon
              icon="fluent:brain-circuit-28-regular"
              color="#2BA54B"
              className="2xl:size-[58px] md:size-[48px] size-[50px]"
            />
          }
          heading="Pembuatan Embedding"
          subheading="Teks yang sudah dibaca diubah menjadi vektor embedding dan disimpan ke basis data pintar (Vector DB)."
        />
        <Icon
          className="md:inline hidden"
          icon="cil:arrow-right"
          color="#E0E0E0"
          width="100"
          height="100"
        />
        <Card
          iconLayout="center"
          classname="outline-0 text-center"
          icon={
            <Icon
              icon="fluent:chat-multiple-28-regular"
              color="#2BA54B"
              className="2xl:size-[58px] md:size-[48px] size-[50px]"
            />
          }
          heading="Chat dengan AI"
          subheading="Ajukan pertanyaan apa pun! SmartAI akan mencari jawaban dari dokumen Anda dengan cepat dan akurat."
        />
      </div>
    </div>
  );
};

export default SectionHowItWorks;
