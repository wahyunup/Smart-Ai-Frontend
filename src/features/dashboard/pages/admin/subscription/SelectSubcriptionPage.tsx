import { Check } from "lucide-react";
import MainLayout from "../../../../../shared/layouts/MainLayout";
import { useEffect, useState } from "react";
import { planSubcriptionApi } from "../../../services/admin/Subcription";

const SelectSubcriptionPage = () => {
  const [data, setData] = useState([]);
  const [optionPlan, setOptionPlan] = useState<any | []>([]);

  const dataPlan = [
    {
      planHeading: "Top Up kecil",
      question: 1000,
      price: 50000,
    },
    {
      planHeading: "Top Up Besar",
      question: 5000,
      price: 200000,
    },
  ];

  useEffect(() => {
    setOptionPlan(dataPlan);
  }, []);

  useEffect(() => {
    const fetchSubPlan = async () => {
      try {
        const res = await planSubcriptionApi();
        console.log(res, "<-----plans");
        setData(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSubPlan();
  }, []);

  return (
    <MainLayout>
      <div className="p-10 overflow-auto">
        <div>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-semibold text-center">
              Pilih Paket Layanan SMART AI
            </h1>
            <p className="text-[#666666] text-center">
              Paket Anda saat ini adalah Basic Plan. Pilih opsi di bawah untuk
              Upgrade/Top Up.
            </p>
          </div>

          <div className="flex gap-3 justify-center mt-10">
            {data.map((item: any) => (
              <div className="py-9 px-7 w-80 flex flex-col gap-3 border hover:border-gray-200 even:border-gray-50 rounded-2xl shadow-2xl/6 odd:bg-gray-50">
                <div className="flex flex-col gap-1">
                  <h1 className="text-[#2BA54B] font-semibold text-4xl">
                    {item.name}
                  </h1>
                  <p className="text-sm">UMKM / Startup Kecil</p>
                </div>
                <p className="text-sm text-gray-500">
                  <span className="text-2xl text-black">
                    Rp {item.price.toLocaleString("id-ID")}
                  </span>
                  /bulan
                </p>
                <button className="w-full px-10 py-2 rounded-full text-sm bg-[#88888888] text-[#272727]">
                  Paket Aktif Saat Ini
                </button>

                <div className="text-xs flex flex-col gap-2">
                  <p className="flex items-center gap-1">
                    <Check color="#13D376" size={15} />
                    <span>{item.question_quota} pertanyaan / bulan</span>
                  </p>
                  <p className="flex items-center gap-1">
                    <Check color="#13D376" size={15} />
                    <span> Hanya bisa digunakan {item.max_users} user</span>
                  </p>
                  <p className="flex items-center gap-1">
                    <Check color="#13D376" size={15} />
                    <span>Tidak ada custom prompt</span>
                  </p>
                  <p className="flex items-center gap-1">
                    <Check color="#13D376" size={15} />
                    <span>Akses fitur dasar chat + admin</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3 justify-center items-center flex-col mt-10 bg-white border border-gray-100 rounded-2xl shadow-2xl/6 p-5">
            <div className="flex flex-col gap-1 border-b border-gray-100 pb-5">
              <h1 className="font-semibold text-2xl text-center">
                Opsi Tambahan: Top Up Kuota (Pay-Per-Use)
              </h1>
              <p className="text-center">
                Tambahkan kuota pertanyaan di luar paket langganan Anda untuk
                fleksibilitas. Kuota ditambahkan ke paket aktif saat ini.
              </p>
            </div>

            <div className="flex gap-3 mt-10">
              {optionPlan.map((item: any) => (
                <div className="flex flex-col gap-3 border border-gray-200 bg-[#0DB57526] px-3 py-10 rounded-2xl w-60">
                  <div>
                    <h1 className="text-[#009C61] text-2xl font-semibold">
                      {item.planHeading}
                    </h1>
                    <p className="text-sm">
                      + {item.question.toLocaleString("id-ID")} pertanyaan
                    </p>
                  </div>

                  <p className="text-xl">
                    Rp {item.price.toLocaleString("id-ID")},-
                  </p>
                  <button className="border border-[#0DB575] text-[#0DB575] font-medium bg-[#F2F2F2] px-4 text-sm py-1 rounded-lg">
                    Tambah Kuota
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SelectSubcriptionPage;
