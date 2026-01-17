import { Search } from "lucide-react";
import Dropdown from "../../../shared/components/common/Dropdown/Dropdown";
import Input from "../../../shared/components/ui/Input";
import MainLayout from "../../../shared/layouts/MainLayout";
import { useFAQ } from "../hooks/useFAQ";

const FAQPage = () => {
  const { filter, setValue } = useFAQ();

  return (
    <MainLayout>
      <div className="md:p-10 p-5">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Pusat Bantuan Smart AI</h1>
          <p className="text-[#666666] text-sm">
            Temukan jawaban cepat untuk pertanyaan umum mengenai penggunaan
            Chatbot.
          </p>
          <Input
            icon={<Search />}
            type="text"
            variant="third"
            onchange={(e) => setValue(e.target.value)}
            placeholder="Cari Jawaban, Contoh: ‘Cara Upload Dokumen’"
            classname="mt-5"
          />
        </div>
        <div className="text-center mt-5 flex flex-col md:gap-2 gap-2 border md:p-5 p-3 rounded-xl">
          <h1 className="md:text-2xl font-semibold">Pertanyaan</h1>
          {filter.length > 0 ? (
            filter.map((item, i) => (
              <Dropdown
                key={i}
                headingDropdown={item.heading}
                fieldDropdown={item.field}
              />
            ))
          ) : (
            <div>
              <p>"Tidak ditemukan FAQ yang sesuai"</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default FAQPage;
