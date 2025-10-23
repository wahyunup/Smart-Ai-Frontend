import Carosel from "../../../shared/components/partials/Carosel";

const SectionClient = () => {
const logos = [
    {
      src: "https://download.logo.wine/logo/Astra_International/Astra_International-Logo.wine.png",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwUrWGDWP0xi1k8CogJyY22MIU_KtZjQnYlw&s",
    },
    {
      src: "https://image.idntimes.com/post/20250530/c8-9d1e8451099788b88ead085e8f83eba5.jpg",
    },
    {
      src: "https://instiki.ac.id/wp-content/uploads/2022/06/36.jpg",
    },
    {
      src: "https://onero.id/wp-content/uploads/2025/05/logo-keren-starbucks-1024x1024.png",
    },
    {
      src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhdx__IzwkQflSyprbXUjAWvm-obOv00pUF3TTMas_ZQmf3YZ0x4dSz26i5bnzNMjspH9oK-8o9QtIt89x_ZJbDTl_wXaH_DCsJlJdKtUvTspaR-0O1ZN4GO6imo6wkSXr3hpDjBC-FouE/s800/gillette.png",
    },
    {
      src: "https://jasalogo.id/wp-content/uploads/2024/01/Logo-Garuda-Food.png",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQte9BXjZGLtFuCxxpTrNn4H73iholW6It3tw&s",
    },
  ];

  return (
    <div className="bg-white py-20 rounded-4xl flex flex-col items-center gap-20 px-10 overflow-hidden">
      <div className="flex flex-col gap-7 items-center">
        <h1 className="font-semibold font-manrope text-5xl text-center">
          Dipercaya oleh Perusahaan-Perusahaan Terkemuka.
        </h1>
        <p className="font-inter text-[#5A5A5A] text-xl">
          Dibangun dengan keamanan tingkat enterprise dan akurasi yang teruji di
          berbagai industri.
        </p>
      </div>

      <div className=" overflow-x-auto scrollbar-hide w-full scroll-smooth">
        <Carosel
        logos={logos}
        />
      </div>
    </div>
  );
};

export default SectionClient;
