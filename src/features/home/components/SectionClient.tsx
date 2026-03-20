const logos = [
  {
    src: "https://download.logo.wine/logo/Astra_International/Astra_International-Logo.wine.png",
    alt: "Astra International",
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwUrWGDWP0xi1k8CogJyY22MIU_KtZjQnYlw&s",
    alt: "Brand",
  },
  {
    src: "https://jasalogo.id/wp-content/uploads/2024/01/Logo-Garuda-Food.png",
    alt: "Garuda Food",
  },
  {
    src: "https://instiki.ac.id/wp-content/uploads/2022/06/36.jpg",
    alt: "Brand",
  },
  {
    src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhdx__IzwkQflSyprbXUjAWvm-obOv00pUF3TTMas_ZQmf3YZ0x4dSz26i5bnzNMjspH9oK-8o9QtIt89x_ZJbDTl_wXaH_DCsJlJdKtUvTspaR-0O1ZN4GO6imo6wkSXr3hpDjBC-FouE/s800/gillette.png",
    alt: "Gillette",
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQte9BXjZGLtFuCxxpTrNn4H73iholW6It3tw&s",
    alt: "Brand",
  },
];

const trustItems = [
  { icon: "🔒", text: "SOC 2 Type II Certified" },
  { icon: "🛡️", text: "ISO 27001 Compliant" },
  { icon: "⚡", text: "99.9% Uptime SLA" },
  { icon: "🌏", text: "Data Hosted in Indonesia" },
];

const SectionClient = () => {
  return (
    <section id="clients" className="relative z-10 py-[100px] overflow-hidden">
      {/* ── Header ── */}
      <div className="text-center mb-16 px-10">
        <div
          data-aos="fade-up"
          className="inline-block font-dm font-medium text-[12px] uppercase tracking-[.1em]
                     bg-[#16FF6E]/[.07] border border-[#16FF6E]/[.18]
                     text-[#16FF6E] px-4 py-1.5 rounded-full mb-5"
        >
          Klien
        </div>

        <h2
          data-aos="fade-up"
          data-aos-duration="1000"
          className="font-syne font-extrabold text-white
                     tracking-[-1px] leading-[1.1] mb-4
                     text-[clamp(28px,4vw,52px)]"
        >
          Dipercaya Perusahaan-Perusahaan Terkemuka
        </h2>

        <p
          data-aos="fade-up"
          data-aos-duration="1200"
          className="font-dm text-[16px] text-[#6B8C80] max-w-[500px] mx-auto leading-[1.7]"
        >
          Keamanan tingkat enterprise dan akurasi yang teruji di berbagai
          industri.
        </p>
      </div>

      {/* ── Infinite logo carousel ── */}
      {/*
        How it works:
        - Two identical sets of logos sit side-by-side inside a flex row.
        - CSS animates translateX from 0 → -50% (exactly one set width).
        - At -50% the animation resets to 0 — visually seamless because
          the second set is pixel-identical to the first.
        - No JS, no rAF, no jump.
        - `animation-play-state: paused` on hover stops the whole track.
      */}
      <div
        className="overflow-hidden"
        style={{
          WebkitMaskImage:
            "linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)",
          maskImage:
            "linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)",
        }}
      >
        <div className="flex w-max h-20 animate-[marquee_28s_linear_infinite] hover:[animation-play-state:paused]">
          {/* set 1 */}
          <div className="flex items-center gap-[72px] px-9">
            {logos.map((logo, i) => (
              <div
                key={`a-${i}`}
                className="h-10 shrink-0 flex items-center justify-center
                           opacity-30 grayscale brightness-200
                           hover:opacity-70 hover:grayscale-0 hover:brightness-100
                           transition-all duration-300 cursor-default mix-blend-multiply"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="max-h-20 max-w-[120px] object-contain mix-blend-multiply"
                />
              </div>
            ))}
          </div>
          {/* set 2 — identical clone */}
          <div className="flex items-center gap-[72px] px-9" aria-hidden>
            {logos.map((logo, i) => (
              <div
                key={`b-${i}`}
                className="h-20 max-w-[120px] shrink-0 flex items-center justify-center
                           opacity-30 grayscale brightness-200
                           hover:opacity-70 hover:grayscale-0 hover:brightness-100
                           transition-all duration-300 cursor-default"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-fu20 max-w-[120px] object-contain mix-blend-multiply"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Trust badges ── */}
      <div
        data-aos="20 max-w-[120px]de-up"
        data-aos-duration="1200"
        className="flex flex-wrap justify-center gap-4
                   mt-16 pt-12 border-t border-white/[.06] px-10"
      >
        {trustItems.map((item) => (
          <div
            key={item.text}
            className="flex items-center gap-2.5
                       font-dm text-[13px] text-[#6B8C80]
                       bg-[#16FF6E]/[.04] border border-[#16FF6E]/10
                       rounded-[10px] px-5 py-3"
          >
            <span className="text-base leading-none">{item.icon}</span>
            {item.text}
          </div>
        ))}
      </div>

      {/* keyframe — translateX -50% = exactly one set width → seamless loop */}
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(50%); }
        }
      `}</style>
    </section>
  );
};

export default SectionClient;
