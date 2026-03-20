import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative flex flex-col items-center justify-center h-screen text-center
                 bg-[#040B0E] overflow-hidden"
    >
      {/* ambient glow orbs */}
      <div className="absolute top-[15%] left-[10%] w-[350px] h-[350px] rounded-full bg-[#16FF6E]/[.04] blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[15%] right-[10%] w-[400px] h-[400px] rounded-full bg-[#09E86E]/[.03] blur-[80px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* 404 big number */}
        <h1
          className="font-syne font-extrabold leading-none tracking-[-4px]
                     text-[clamp(80px,15vw,160px)]
                     bg-gradient-to-br from-[#16FF6E] via-[#4BFFB8] to-[#09E86E]
                     bg-clip-text text-transparent"
        >
          404
        </h1>

        {/* badge */}
        <div
          className="inline-flex items-center gap-2 font-dm
                     bg-[#16FF6E]/[.07] border border-[#16FF6E]/20
                     rounded-full px-[18px] py-2
                     text-[#16FF6E] text-[13px] leading-none"
        >
          <span className="w-[7px] h-[7px] rounded-full bg-[#16FF6E] animate-pulse shrink-0" />
          Halaman Tidak Ditemukan
        </div>

        {/* message */}
        <p className="font-dm text-[#6B8C80] text-lg leading-[1.7] max-w-[400px]">
          SmartAI sedang maintenance atau halaman yang kamu cari tidak tersedia.
        </p>

        {/* CTA */}
        <Button
          variant="primary"
          onclick={() => navigate("/")}
          classname="group mt-2 px-9 py-3.5 rounded-[10px] flex items-center gap-2.5"
        >
          Kembali ke Beranda
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
