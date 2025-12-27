import Card from "../../../shared/components/ui/Card";
import { Icon } from "@iconify/react";

const SectionHowItWorks = () => {
  return (
    <div
      className="bg-white md:py-50 py-24 flex flex-col items-center md:gap-10 gap-5 rounded-4xl  px-7"
      id="howitworks">
      <h1
        className="2xl:text-6xl text-2xl md:text-5xl font-semibold font-manrope"
        data-aos="fade-up"
        data-aos-duration="1000">
        Bagaimana SmartAI Bekerja
      </h1>
      <p
        className="2xl:text-xl md:text-base text-sm text-[15px] text-center text-[#5A5A5A] font-inter"
        data-aos="fade-up"
        data-aos-duration="1200">
        SmartAI mengubah dokumen perusahaan Anda menjadi pengetahuan cerdas yang
        bisa diakses melalui chatbot.
      </p>

      <div className="flex items-center flex-wrap md:flex-nowrap container md:gap-5 gap-10 mt-15">
        <div data-aos="fade-right" data-aos-duration="1400">
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
            subheading="Unggah semua file perusahaan Anda (dari berbagai format)."
          />
        </div>

        <div data-aos="fade-right" data-aos-duration="1800">
          <Icon
            className="md:inline hidden size-15"
            icon="cil:arrow-right"
            color="#E0E0E0"
            width="100"
            height="100"
          />
        </div>

        <div data-aos="fade-right" data-aos-duration="2200">
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
            heading="Analisis Data Cerdas"
            subheading="AI membaca, mengekstrak, dan memahami semua teks di dalamnya."
          />
        </div>

        <div data-aos="fade-right" data-aos-duration="2600">
          <Icon
            className="md:inline hidden size-15"
            icon="cil:arrow-right"
            color="#E0E0E0"
            width="100"
            height="100"
          />
        </div>

        <div data-aos="fade-right" data-aos-duration="3000">
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
            heading="Bentuk Pengetahuan AI"
            subheading="Data diubah menjadi basis pengetahuan yang terstruktur, siap menjawab pertanyaan."
          />
        </div>

        <div data-aos="fade-right" data-aos-duration="3000">
          <Icon
            className="md:inline hidden size-15"
            icon="cil:arrow-right"
            color="#E0E0E0"
            width="100"
            height="100"
          />
        </div>

        <div data-aos="fade-right" data-aos-duration="3000">
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
            heading="Akses Jawaban Instan"
            subheading="Tim Anda langsung mendapat jawaban akurat dan cepat dari Chatbot."
          />
        </div>
      </div>
    </div>
  );
};

export default SectionHowItWorks;
