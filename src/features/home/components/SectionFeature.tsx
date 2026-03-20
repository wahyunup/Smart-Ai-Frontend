const features = [
  {
    heading: "Upload Dokumen",
    subheading:
      "Unggah PDF, Word, Excel. Siap dianalisis dan menjadi sumber jawaban chatbot.",
    aosDuration: "1400",
    icon: (
      <svg
        className="w-[22px] h-[22px] text-[#040B0E]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
    ),
  },
  {
    heading: "Ekstraksi Teks Cerdas",
    subheading:
      "Sistem memindai teks dari dokumen, gambar, atau tabel menjadi data yang dapat dicari.",
    aosDuration: "1600",
    icon: (
      <svg
        className="w-[22px] h-[22px] text-[#040B0E]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    heading: "Chatbot AI",
    subheading:
      "Ajukan pertanyaan. AI memberikan jawaban akurat dengan referensi langsung dari dokumen.",
    aosDuration: "1800",
    icon: (
      <svg
        className="w-[22px] h-[22px] text-[#040B0E]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
  },
  {
    heading: "Dashboard & Monitoring",
    subheading:
      "Lacak penggunaan chatbot, kinerja, dan akurasi data dalam satu dashboard terpusat.",
    aosDuration: "2000",
    icon: (
      <svg
        className="w-[22px] h-[22px] text-[#040B0E]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
];

const SectionFeature = () => {
  return (
    <section
      id="feature"
      className="relative z-10 max-w-[1100px] mx-auto px-10 py-[100px]"
    >
      {/* ── Header ── */}
      <div className="text-center mb-16">
        <div
          data-aos="fade-up"
          className="inline-block font-dm font-medium text-[12px] uppercase tracking-[.1em]
                     bg-[#16FF6E]/[.07] border border-[#16FF6E]/[.18]
                     text-[#16FF6E] px-4 py-1.5 rounded-full mb-5"
        >
          Fitur
        </div>

        <h2
          data-aos="fade-up"
          data-aos-duration="1000"
          className="font-syne font-extrabold text-white
                     tracking-[-1px] leading-[1.1] mb-4
                     text-[clamp(28px,4vw,52px)]"
        >
          Apa yang Bisa Dilakukan SmartAI?
        </h2>

        <p
          data-aos="fade-up"
          data-aos-duration="1200"
          className="font-dm text-[16px] text-[#6B8C80] max-w-[500px] mx-auto leading-[1.7]"
        >
          Solusi pintar untuk mengelola dan mengakses dokumen internal dengan
          cepat dan efisien.
        </p>
      </div>

      {/* ── Feature Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {features.map((feat) => (
          <div
            key={feat.heading}
            data-aos="fade-up"
            data-aos-duration={feat.aosDuration}
            className="group relative px-6 py-7
                       bg-[#0A1A20] border border-white/[.05] rounded-[18px]
                       overflow-hidden cursor-default
                       transition-all duration-300
                       hover:border-[#16FF6E]/20 hover:-translate-y-[3px]"
          >
            {/* Gradient icon box */}
            <div
              className="w-11 h-11 mb-[18px] rounded-xl
                          bg-gradient-to-br from-[#0EA84A] to-[#16FF6E]
                          flex items-center justify-center"
            >
              {feat.icon}
            </div>

            <h3 className="font-syne font-bold text-[15px] text-white mb-2.5">
              {feat.heading}
            </h3>
            <p className="font-dm text-[13px] text-[#6B8C80] leading-[1.6]">
              {feat.subheading}
            </p>

            {/* Sliding bottom accent line */}
            <div
              className="absolute bottom-0 left-0 h-0.5 w-0
                          bg-gradient-to-r from-[#16FF6E] to-transparent
                          transition-[width] duration-[400ms]
                          group-hover:w-full"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SectionFeature;
