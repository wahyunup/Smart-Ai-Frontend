import Card from "../../../shared/components/ui/Card";

const SectionWhoWeAre = () => {
  return (
    <div className="bg-white py-50 my-30 flex flex-col items-center gap-10 rounded-4xl" id="whoweare">
      <h1 className="text-6xl font-semibold">Alasan Terbaik Memilih SmartAI</h1>
      <p className="text-xl">
        Solusi Chatbot cerdas yang dirancang khusus untuk menjaga rahasia
        dokumen setiap perusahaan.
      </p>
      <div className="container flex gap-5">
        <Card
          heading="Data Perusahaan Dijamin Aman"
          subheading="Dokumen perusahaan Anda tidak akan pernah tercampur atau dilihat oleh perusahaan lain yang menggunakan SmartAI."
          icon="/src/assets/icons/lock.svg"
          classname="shadow-xl"
        />
        <Card
          heading="Jawaban Selalu Tepat & Jelas"
          subheading="Chatbot hanya menjawab dari dokumen yang Anda unggah, tidak mengarang, sehingga informasinya selalu akurat."
          icon="/src/assets/icons/target.svg"
          classname="shadow-xl"
        />
        <Card
          heading="Langsung Bisa Dipakai"
          subheading="Proses pemasangan dan pengenalan dokumen cepat. Perusahaan Anda bisa mulai menggunakan Chatbot dalam waktu singkat."
          icon="/src/assets/icons/speed.svg"
          classname="shadow-xl"
        />
      </div>
    </div>
  );
};

export default SectionWhoWeAre;
