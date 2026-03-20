import { Search } from "lucide-react";
import Dropdown from "../../../shared/components/common/Dropdown/Dropdown";
import Input from "../../../shared/components/ui/Input";
import MainLayout from "../../../shared/layouts/MainLayout";
import { useFAQ } from "../hooks/useFAQ";

export const FAQPage = () => {
  const { filter, setValue } = useFAQ();

  return (
    <MainLayout>
      <div className="md:p-10 p-5 flex flex-col gap-8">
        {/* ── Header ── */}
        <div className="text-center flex flex-col gap-4 max-w-[600px] mx-auto w-full">
          {/* section tag */}
          <div
            className="inline-flex items-center gap-2 font-dm text-[12px] uppercase tracking-[.1em]
                        bg-[#16FF6E]/[.07] border border-[#16FF6E]/[.18]
                        text-[#16FF6E] px-4 py-1.5 rounded-full mx-auto"
          >
            Pusat Bantuan
          </div>

          <h1 className="font-syne font-extrabold text-white text-2xl">
            Pusat Bantuan Smart AI
          </h1>
          <p className="font-dm text-[#6B8C80] text-sm">
            Temukan jawaban cepat untuk pertanyaan umum mengenai penggunaan
            Chatbot.
          </p>

          {/* Search */}
          <Input
            icon={<Search size={16} className="text-[#6B8C80]" />}
            type="text"
            variant="primary"
            onchange={(e) => setValue(e.target.value)}
            placeholder="Cari Jawaban, Contoh: 'Cara Upload Dokumen'"
          />
        </div>

        {/* ── FAQ list card ── */}
        <div
          className="relative bg-[#0A1A20] border border-[#16FF6E]/[.07]
                      rounded-[20px] md:p-6 p-4 flex flex-col gap-3 overflow-hidden
                      max-w-[800px] mx-auto w-full"
        >
          {/* shimmer top */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#16FF6E]/20 to-transparent" />

          <h2 className="font-syne font-bold text-white md:text-xl text-lg text-center mb-2">
            Pertanyaan
          </h2>

          {filter.length > 0 ? (
            filter.map((item, i) => (
              <Dropdown
                key={i}
                headingDropdown={item.heading}
                fieldDropdown={item.field}
              />
            ))
          ) : (
            <div className="flex items-center justify-center py-10">
              <p className="font-dm text-[#6B8C80] text-sm">
                Tidak ditemukan FAQ yang sesuai.
              </p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};
