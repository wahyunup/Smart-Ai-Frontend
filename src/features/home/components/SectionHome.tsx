import { useNavigate } from "react-router-dom";

const SectionHome = () => {
  const navigate = useNavigate();
  const stats = [
    { num: "500+", label: "Perusahaan" },
    { num: "99.8%", label: "Akurasi" },
    { num: "< 2s", label: "Respons" },
    { num: "24/7", label: "Uptime" },
  ];

  return (
    <section
      id="home"
      className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-10 pt-[120px] pb-20"
    >
      {/* ── Badge ── */}
      <div
        data-aos="fade-up"
        className="inline-flex items-center gap-2 font-dm
                   bg-[#16FF6E]/[.07] border border-[#16FF6E]/20
                   rounded-full px-[18px] py-2
                   text-[#16FF6E] text-[13px] leading-none mb-10"
      >
        <div className="relative flex items-center justify-center">
          <span className="absolute inline-flex h-2 w-2 rounded-full bg-[#16FF6E] animate-ping"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#16FF6E]"></span>
        </div>
        AI-Powered Document Intelligence
      </div>

      {/* ── Heading ── */}
      <h1
        data-aos="fade-up"
        data-aos-duration="800"
        className="font-syne font-extrabold text-white
                   leading-[1.05] tracking-[-2px] mb-6
                   text-[clamp(36px,6vw,80px)]"
      >
        Bangun Chatbot Cerdas
        <br />
        dari{" "}
        <span className="bg-gradient-to-br from-[#16FF6E] via-[#4BFFB8] to-[#09E86E] bg-clip-text text-transparent">
          Dokumen Perusahaan
        </span>
        <br />
        Anda
      </h1>

      {/* ── Subheading ── */}
      <p
        data-aos="fade-up"
        data-aos-duration="1200"
        className="font-dm text-[clamp(15px,2vw,18px)] text-[#6B8C80]
                   max-w-[520px] leading-[1.7] mb-12"
      >
        Integrasikan dokumen perusahaan Anda dengan AI untuk menjawab pertanyaan
        secara otomatis, akurat, cepat, dan aman.
      </p>

      {/* ── Buttons ── */}
      <div
        data-aos="fade-up"
        data-aos-duration="1400"
        className="flex flex-wrap gap-4 justify-center"
      >
        {/* Primary */}
        <button
          onClick={() => navigate("/auth/company-employe/login")}
          className="group flex items-center gap-2.5
                     font-syne font-bold text-[15px]
                     bg-[#16FF6E] text-[#040B0E]
                     px-9 py-4 rounded-[10px]
                     transition-all duration-[250ms]
                     hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(22,255,110,0.4)]"
        >
          Mulai Sekarang
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>

        {/* Secondary */}
        <button
          onClick={() => navigate("/auth/company-admin/register")}
          className="font-syne font-semibold text-[15px]
                     text-[#E8F4F0] bg-transparent
                     px-8 py-[15px] rounded-[10px]
                     border border-white/[.12]
                     transition-all duration-[250ms]
                     hover:border-[#16FF6E]/30 hover:text-[#16FF6E] hover:-translate-y-0.5"
        >
          Daftarkan Perusahaan
        </button>
      </div>

      {/* ── Stats ── */}
      <div
        data-aos="fade-up"
        data-aos-duration="1600"
        className="flex flex-wrap justify-center gap-12
                   mt-[72px] pt-12 border-t border-white/[.06]"
      >
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-syne text-[28px] font-extrabold text-[#16FF6E]">
              {s.num}
            </div>
            <div className="font-dm text-[12px] text-[#6B8C80] mt-1 uppercase tracking-[.08em]">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SectionHome;
