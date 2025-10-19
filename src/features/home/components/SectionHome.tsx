import { useNavigate } from "react-router-dom"
import Button from "../../../shared/components/ui/Button"

const SectionHome = () => {
  const navigate = useNavigate()
    return (
        <>
        <div className="flex flex-col items-center justify-center h-screen  text-center gap-8" id="home">
        <h1 className="text-6xl font-semibold">
          Bangun Chatbot Cerdas dari <br /> Dokumen Perusahaan Anda
        </h1>
        <p className="text-xl">
          Integrasikan dokumen perusahaan Anda dengan AI untuk menjawab <br />{" "}
          pertanyaan secara otomatis.
        </p>
        <div className="flex flex-col gap-4">
          <Button onclick={() => navigate("/auth/authorization")} variant="primary" classname="font-medium">
            Get Started
          </Button>
          <Button onclick={() => navigate("/auth/company/register")} variant="primary" classname="font-medium">
            Daftarkan Perusahaan Anda
          </Button>
        </div>
      </div>
        </>
    )
}

export default SectionHome