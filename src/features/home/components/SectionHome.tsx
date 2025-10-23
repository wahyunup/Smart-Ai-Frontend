import { useNavigate } from "react-router-dom";
import Button from "../../../shared/components/ui/Button";
import { Icon } from "@iconify/react";

const SectionHome = () => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="flex flex-col items-center justify-center h-screen  text-center gap-8"
        id="home">
        <h1 className="text-6xl font-semibold font-manrope">
          Bangun Chatbot Cerdas dari <br /> Dokumen Perusahaan Anda
        </h1>
        <p className="text-xl">
          Integrasikan dokumen perusahaan Anda dengan AI untuk menjawab <br />{" "}
          pertanyaan secara otomatis.
        </p>
        <div className="flex flex-col gap-4 items-center">
          <Button
            onclick={() => navigate("/auth/company-employe/login")}
            variant="secondary"
            classname="font-medium w-fit py-4 px-7 rounded-lg flex items-center justify-center text-3xl gap-2 font-manrope group">
            Get Started
            <Icon className="transition-all duration-500 group-hover:ml-5" icon="carbon:arrow-right" width="32" height="32" />
          </Button>
          <Button
            onclick={() => navigate("/auth/company-admin/register")}
            variant="primary"
            classname="font-medium py-5 px-7 font-manrope text-2xl">
            Daftarkan Perusahaan Anda
          </Button>
        </div>
      </div>
    </>
  );
};

export default SectionHome;
