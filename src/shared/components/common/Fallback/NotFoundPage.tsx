import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">404 Not Found</h1>
      <p className=" mb-6 text-2xl">
        Smart AI sedang maintenance / <br/> halaman tidak ditemukan
      </p>
      <Button
        variant="secondary"
        onclick={() => navigate("/")}
        classname="bg-green-600 text-white px-6 py-4 rounded-lg hover:bg-green-700 transition">
        Kembali ke Beranda
      </Button>
    </div>
  );
};

export default NotFoundPage;
