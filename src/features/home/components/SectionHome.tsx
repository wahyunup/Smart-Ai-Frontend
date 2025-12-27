import { useNavigate } from "react-router-dom";
import Button from "../../../shared/components/ui/Button";
import { Icon } from "@iconify/react";

const SectionHome = () => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="flex flex-col items-center justify-center h-screen  text-center md:gap-8 gap-4"
        id="home">
        <h1
          data-aos="fade-up"
          className="2xl:text-6xl md:text-5xl text-2xl md:font-semibold font-bold font-manrope">
          Bangun Chatbot Cerdas dari <br /> Dokumen Perusahaan Anda
        </h1>
        <p
          data-aos="fade-up"
          data-aos-duration="1200"
          className="2xl:text-xl md:text-md text-sm text-[#5A5A5A] font-inter">
          Integrasikan dokumen perusahaan Anda <br /> dengan AI untuk menjawab
          pertanyaan secara otomatis.
        </p>
        <div className="flex flex-col gap-4 items-center">
          <div data-aos="fade-up" data-aos-duration="1400">
            <Button
              onclick={() => navigate("/auth/company-employe/login")}
              variant="secondary"
              classname="font-medium w-fit 2xl:py-4 2xl:px-7 md:py-3 py-2 px-4 md:px-8 rounded-lg flex items-center justify-center 2xl:text-3xl md:text-md gap-2 font-manrope group">
              Mulai Sekarang
              <Icon
                className="transition-all duration-500 group-hover:ml-5 2xl:size-[32px] md:size-[25px]"
                icon="carbon:arrow-right"
              />
            </Button>
          </div>
          <div data-aos="fade-up" data-aos-duration="1600">
            <Button
              onclick={() => navigate("/auth/company-admin/register")}
              variant="primary"
              classname="font-medium 2xl:py-5 2xl:px-7 md:py-3 py-2 px-4 md:px-5 font-manrope 2xl:text-2xl md:text-md">
              Daftarkan Perusahaan Anda
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SectionHome;
