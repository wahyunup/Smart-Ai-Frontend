import Card from "../../../shared/components/ui/Card";
import { Icon } from "@iconify/react";

const SectionWhoWeAre = () => {
  return (
    <div
      className="bg-white py-50 flex flex-col items-center gap-10 rounded-4xl"
      id="whoweare">
      <h1 className="2xl:text-6xl md:text-5xl font-semibold font-manrope">Alasan Terbaik Memilih SmartAI</h1>
      <p className="2xl:text-xl md:text-md text-[#5A5A5A] font-inter">
        Solusi Chatbot cerdas yang dirancang khusus untuk menjaga rahasia
        dokumen setiap perusahaan.
      </p>
      <div className="container grid grid-cols-3 wrap-break-word gap-20">
        <Card
          iconLayout="center"
          heading="Data Perusahaan Dijamin Aman"
          subheading="Dokumen perusahaan Anda tidak akan pernah tercampur atau dilihat oleh perusahaan lain yang menggunakan SmartAI."
          icon={<Icon icon="circum:lock" color="#2BA54B" width="58" />}
          classname="shadow-xl shadow-[#2BA54B40] outline-3 outline-[#8BEC89] text-center px-8 py-15 
          justify-center text-wrap"
        />
        <Card
          iconLayout="center"
          heading="Jawaban Selalu Tepat & Jelas"
          subheading="Chatbot hanya menjawab dari dokumen yang Anda unggah, tidak mengarang, sehingga informasinya selalu akurat."
          icon={<Icon icon="ph:target-light" color="#2BA54B" width="58" />}
          classname="shadow-xl shadow-[#2BA54B40] outline-3 outline-[#8BEC89] text-center px-8 py-15 
          justify-center"
        />
        <Card
          iconLayout="center"
          heading="Langsung Bisa Dipakai"
          subheading="Proses pemasangan dan pengenalan dokumen cepat. Perusahaan Anda bisa mulai menggunakan Chatbot dalam waktu singkat."
          icon={<Icon icon="mdi:clock-fast" color="#2BA54B" width="58" />}
          classname="shadow-xl shadow-[#2BA54B40] outline-3 outline-[#8BEC89] text-center px-8 py-15 
          justify-center"
        />
      </div>
    </div>
  );
};

export default SectionWhoWeAre;
