const steps = [
  {
    num: "01",
    heading: "Upload Dokumen",
    subheading:
      "Unggah file dari berbagai format — PDF, Word, Excel siap diproses.",
    icon: (
      <svg
        className="w-7 h-7 text-[#16FF6E]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
    ),
  },
  {
    num: "02",
    heading: "Analisis Data Cerdas",
    subheading: "AI membaca, mengekstrak, dan memahami semua teks di dalamnya.",
    icon: (
      <svg
        className="w-7 h-7 text-[#16FF6E]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    num: "03",
    heading: "Bentuk Pengetahuan AI",
    subheading:
      "Data diubah menjadi basis pengetahuan terstruktur yang siap menjawab.",
    icon: (
      <svg
        className="w-7 h-7 text-[#16FF6E]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    num: "04",
    heading: "Akses Jawaban Instan",
    subheading:
      "Tim Anda mendapat jawaban akurat dan cepat dari Chatbot kapan saja.",
    icon: (
      <svg
        className="w-7 h-7 text-[#16FF6E]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
  },
];

const SectionHowItWorks = () => {
  return (
    <section
      id="howitworks"
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
          Cara Kerja
        </div>

        <h2
          data-aos="fade-up"
          data-aos-duration="1000"
          className="font-syne font-extrabold text-white
                     tracking-[-1px] leading-[1.1] mb-4
                     text-[clamp(28px,4vw,52px)]"
        >
          Bagaimana SmartAI Bekerja
        </h2>

        <p
          data-aos="fade-up"
          data-aos-duration="1200"
          className="font-dm text-[16px] text-[#6B8C80] max-w-[500px] mx-auto leading-[1.7]"
        >
          Dari dokumen mentah menjadi chatbot cerdas dalam 4 langkah sederhana.
        </p>
      </div>

      {/* ── Steps ── */}
      <div className="flex items-center flex-wrap md:flex-nowrap justify-center">
        {steps.map((step, i) => (
          <div key={step.num} className="flex items-center">
            {/* Card */}
            <div
              data-aos="fade-right"
              data-aos-duration={1400 + i * 400}
              className="group relative flex-1 min-w-[180px] max-w-[240px]
                         px-7 py-10 text-center
                         bg-[#0A1A20] border border-[#16FF6E]/[.07] rounded-[20px]
                         cursor-default transition-all duration-300
                         hover:border-[#16FF6E]/25 hover:-translate-y-1
                         hover:shadow-[0_20px_60px_rgba(22,255,110,0.06)]"
            >
              {/* Number badge */}
              <div
                className="absolute -top-[14px] left-1/2 -translate-x-1/2
                            font-syne font-extrabold text-[12px]
                            bg-[#16FF6E] text-[#040B0E]
                            px-[14px] py-1 rounded-full whitespace-nowrap"
              >
                {step.num}
              </div>

              {/* Icon box */}
              <div
                className="w-16 h-16 mx-auto mb-5
                            bg-[#16FF6E]/[.07] border border-[#16FF6E]/[.15]
                            rounded-2xl flex items-center justify-center"
              >
                {step.icon}
              </div>

              <h3 className="font-syne font-bold text-[15px] text-white mb-2.5">
                {step.heading}
              </h3>
              <p className="font-dm text-[13px] text-[#6B8C80] leading-[1.6]">
                {step.subheading}
              </p>
            </div>

            {/* Arrow separator */}
            {i < steps.length - 1 && (
              <div className="hidden md:flex w-10 shrink-0 items-center justify-center text-[#16FF6E]/25 text-xl">
                →
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default SectionHowItWorks;
