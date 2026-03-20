const reasons = [
  {
    heading: "Data Perusahaan Dijamin Aman",
    subheading:
      "Dokumen perusahaan Anda tidak akan pernah tercampur atau dilihat oleh perusahaan lain yang menggunakan SmartAI.",
    iconBg: "bg-[#16FF6E]/[.08]",
    accentBg: "bg-[#16FF6E]",
    aosDuration: "1400",
    icon: (
      <svg
        className="w-[26px] h-[26px] text-[#16FF6E]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
  },
  {
    heading: "Jawaban Selalu Tepat & Jelas",
    subheading:
      "Chatbot hanya menjawab dari dokumen yang Anda unggah, tidak mengarang, sehingga informasinya selalu akurat.",
    iconBg: "bg-[#0EA84A]/[.08]",
    accentBg: "bg-[#4BFFB8]",
    aosDuration: "1600",
    icon: (
      <svg
        className="w-[26px] h-[26px] text-[#16FF6E]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    heading: "Langsung Bisa Dipakai",
    subheading:
      "Proses pemasangan dan pengenalan dokumen cepat. Perusahaan Anda bisa mulai menggunakan Chatbot dalam waktu singkat.",
    iconBg: "bg-[#4BFFB8]/[.08]",
    accentBg: "bg-[#09E86E]",
    aosDuration: "1800",
    icon: (
      <svg
        className="w-[26px] h-[26px] text-[#16FF6E]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

const SectionWhoWeAre = () => {
  return (
    <section
      id="whoweare"
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
          Keunggulan
        </div>

        <h2
          data-aos="fade-up"
          data-aos-duration="1000"
          className="font-syne font-extrabold text-white
                     tracking-[-1px] leading-[1.1] mb-4
                     text-[clamp(28px,4vw,52px)]"
        >
          Alasan Terbaik Memilih SmartAI
        </h2>

        <p
          data-aos="fade-up"
          data-aos-duration="1200"
          className="font-dm text-[16px] text-[#6B8C80] max-w-[500px] mx-auto leading-[1.7]"
        >
          Solusi chatbot cerdas yang dirancang khusus untuk keamanan dokumen
          setiap perusahaan.
        </p>
      </div>

      {/* ── Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reasons.map((item) => (
          <div
            key={item.heading}
            data-aos="fade-up"
            data-aos-duration={item.aosDuration}
            className="group relative p-10
                       bg-[#0A1A20] border border-[#16FF6E]/[.07] rounded-[20px]
                       overflow-hidden cursor-default
                       transition-all duration-300
                       hover:border-[#16FF6E]/20 hover:-translate-y-1"
          >
            {/* Top shimmer line */}
            <div
              className="absolute top-0 left-0 right-0 h-px
                          bg-gradient-to-r from-transparent via-[#16FF6E] to-transparent
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />

            {/* Icon */}
            <div
              className={`w-14 h-14 ${item.iconBg} rounded-[14px] flex items-center justify-center mb-6`}
            >
              {item.icon}
            </div>

            <h3 className="font-syne font-bold text-[18px] text-white mb-3">
              {item.heading}
            </h3>
            <p className="font-dm text-[14px] text-[#6B8C80] leading-[1.7]">
              {item.subheading}
            </p>

            {/* Decorative accent circle */}
            <div
              className={`absolute -bottom-8 -right-8 w-20 h-20 rounded-full ${item.accentBg} opacity-[.04] pointer-events-none`}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SectionWhoWeAre;
