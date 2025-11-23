import { useEffect, useState } from "react";
import TableBody from "../../../../../shared/components/common/Table/TableBody";
import TableHeaderList from "../../../../../shared/components/common/Table/TableHeaderList";
import MainLayout from "../../../../../shared/layouts/MainLayout";
import { mySubcriptionApi } from "../../../services/admin/Subcription";
import { formatDate } from "../../../../../shared/utils/FormatDate";
import { useNavigate } from "react-router-dom";

const SubcriptionPage = () => {
  const navigate = useNavigate()
  const [datas, setDatas] = useState<any>();
  const [mySub, setMySub] = useState({
    plan_name: "",
    status: "",
    start_date: "",
    end_date: "",
    question_quota: 0,
    questions_used: 0,
    top_up_quota: 0,
    remaining_questions: 0,
    max_users: 0,
  });
  const transactionLog = [
    {
      id_transaksi: "INV-2025-11-001",
      deskripsi: "Langganan Basic Plan (Nov 2025)",
      total_tagihan: 149.0,
      tanggal_pengajuan: "21 Nov 2025",
      status: "lunas",
    },
    {
      id_transaksi: "INV-2025-11-002",
      deskripsi: "Pengajuan Top Up Kuota (+5.000)",
      total_tagihan: 200.0,
      tanggal_pengajuan: "21 Nov 2025",
      status: "menunggu pembayaran",
    },
  ];

  useEffect(() => {
    const fetchMySub = async () => {
      try {
        const res = await mySubcriptionApi();
        setMySub({
          end_date: res.end_date,
          max_users: res.max_users,
          plan_name: res.plan_name,
          question_quota: res.question_quota,
          questions_used: res.questions_used,
          remaining_questions: res.remaining_questions,
          start_date: res.start_date,
          status: res.status,
          top_up_quota: res.top_up_quota,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchMySub();
  }, []);

  useEffect(() => {
    setDatas(transactionLog);
  }, []);

  const convertDate = formatDate(mySub.end_date)
  return (
    <MainLayout>
      <div className="p-10">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl font-semibold">Subscription</h1>
            <p className="text-xl font-medium">Detail Langganan Perusahaan</p>
          </div>

          <div className="bg-white shadow-xl/3 border-gray-200 border flex justify-between h-50 p-8 rounded-2xl px-10">
            <div className="flex flex-col justify-between ">
              <p className="font-manrope text-[#666666]">
                Paket langganan saat ini
              </p>
              <div>
                <h1 className="text-3xl font-semibold text-[#1D8A45] font-inter">
                  Basic Plan
                </h1>
                <p className="text-sm text-[#008846]">{mySub.question_quota} Pertanyaan / Bulan</p>
                <p className="text-sm text-[#DB3726]">
                  Sisa Kuota: {mySub.questions_used} / {mySub.question_quota} Pertanyaan
                </p>
              </div>
            </div>
            <div className="border-l border-[#E5E5E5]"></div>
            <div className="flex flex-col justify-between ">
              <p className="font-manrope text-[#666666]">Masa Aktif Berakhir</p>
              <div>
                <h1 className="text-3xl font-semibold text-[#1D8A45] font-inter">
                  {convertDate}
                </h1>
                <p className="text-sm text-[#887600]">
                  Perlu perpanjangan dalam 30 hari
                </p>
              </div>
            </div>
            <div className="border-l border-[#E5E5E5]"></div>
            <div className="flex flex-col justify-between ">
              <p className="font-manrope text-[#666666]">
                Sisa Kuota Keseluruhan
              </p>
              <div>
                <h1 className="text-3xl font-semibold text-[#1D8A45] font-inter">
                {mySub.remaining_questions}
                </h1>
                <p className="text-sm text-[#DB3726]">
                  Tersisa 24% dari {mySub.question_quota} kuota
                </p>
              </div>
            </div>
            <div className="border-l border-[#E5E5E5]"></div>
            <div className="flex flex-col justify-center ">
              <button onClick={() => navigate("select-sub")} className="p-2 rounded-lg cursor-pointer border-[#2BA54B] border text-sm">
                Upgrade Plan / Top Up kuota
              </button>
            </div>
          </div>

          <div className="p-6 bg-white shadow-xl/3 border border-gray-200 rounded-2xl">
            <h1 className="text-2xl font-semibold">Riwayat Transaksi</h1>
            <div className="overflow-hidden rounded-2xl mt-5">
              <TableHeaderList classname="grid-cols-6 bg-[#E3F9E8]">
                <span>ID Transaksi</span>
                <span>Deskripsi</span>
                <span>Total Tagihan</span>
                <span>Tanggal Pengajuan</span>
                <span>Status</span>
                <span>Aksi</span>
              </TableHeaderList>
              <TableBody
                classname="grid-cols-6"
                canAction={false}
                data={datas}
                renderItem={(item) => {
                  return (
                    <>
                      <span>{item.id_transaksi}</span>
                      <span>{item.deskripsi}</span>
                      <span>{item.total_tagihan}</span>
                      <span>{item.tanggal_pengajuan}</span>
                      <span
                        className={`${
                          item.status === "lunas"
                            ? "bg-[#00AA58] px-3 text-white py-1 rounded-full"
                            : item.status === "menunggu pembayaran"
                            ? "bg-[#DBBE03] text-white px-3 py-1 rounded-full"
                            : ""
                        }`}>
                        {item.status}
                      </span>
                    </>
                  );
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SubcriptionPage;
