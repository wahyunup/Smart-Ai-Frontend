import { useEffect, useState } from "react";
import MainLayout from "../../../../../shared/layouts/MainLayout";
import TableHeaderList from "../../../../../shared/components/common/Table/TableHeaderList";
import TableBody from "../../../../../shared/components/common/Table/TableBody";
import {
  allPlanApi,
  allTransactionApi,
} from "../../../services/superadmin/Transaction";
import { formatDate } from "../../../../../shared/utils/FormatDate";
import Input from "../../../../../shared/components/ui/Input";
import Button from "../../../../../shared/components/ui/Button";

const manageTransaction = () => {
  const [isActive, setIsActive] = useState("Riwayat Transaksi");
  const [data, setData] = useState([]);
  const [plans, setplans] = useState<any>([]);

  const fetchTransaction = async () => {
    try {
      const res = await allTransactionApi();
      setData(res);
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };

  const fetchPlans = async () => {
    try {
      const res = await allPlanApi();
      setplans(res);
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchPlans();
    fetchTransaction();
  }, []);

  const subNavigate = [
    {
      name: "Riwayat Transaksi",
    },
    {
      name: "Kelola Harga",
    },
  ];
  return (
    <MainLayout>
      <div className="p-10 flex flex-col gap-3">
        <h1 className="text-2xl font-semibold">Manajemen Riwayat Transaksi</h1>
        <div className="flex gap-5 items-center border-b">
          {subNavigate.map((nav) => (
            <button
              onClick={() => setIsActive(nav.name)}
              className={`p-3 cursor-pointer  ${
                isActive === nav.name
                  ? "border-[#126F3D] border-b-3"
                  : "text-[#B2B2B2]"
              } `}>
              {nav.name}
            </button>
          ))}
        </div>

        {isActive === "Riwayat Transaksi" ? (
          <div className=" mt-5 bg-white border border-gray-100 rounded-2xl p-6 shadow-2xl/8">
            <h1 className="text-lg font-semibold">
              Riwayat Pembayaran Pro & Top Up (Otomatis iPaymu)
            </h1>
            <div className="rounded-2xl overflow-hidden mt-4">
              <TableHeaderList classname="grid-cols-6 bg-[#E3F9E8]">
                <span>ID Transaksi</span>
                <span>Nama Perusahaan</span>
                <span>Tipe Pembelian</span>
                <span>Nominal</span>
                <span>Tanggal Bayar</span>
                <span>Status</span>
              </TableHeaderList>
              <TableBody
                canAction={false}
                data={data}
                classname="grid-cols-6"
                renderItem={(item) => {
                  const convertAmount = item.amount.toLocaleString("id-ID");
                  const convertDate = formatDate(item.created_at);
                  return (
                    <>
                      <span>{item.payment_reference}</span>
                      <span>{item.company_id}</span>
                      <span>{item.type}</span>
                      <span>{convertAmount}</span>
                      <span>{convertDate}</span>
                      <span
                        className={`px-4 py-2 rounded-full text-white ${
                          item.status === "paid"
                            ? "bg-[#00AA58]"
                            : item.status === "expired"
                            ? "bg-[#DB3726]"
                            : null
                        }`}>
                        {item.status}
                      </span>
                    </>
                  );
                }}
              />
            </div>
          </div>
        ) : (
          <div>
            <div className="bg-white p-5 border flex flex-col items-center border-gray-100 rounded-2xl shadow-2xl/8">
              <div className="w-full">
                <h1 className="text-lg font-semibold">
                  Atur Harga dasar Produk
                </h1>
              </div>
              {/* input */}
              <div className="flex w-full gap-5 mt-5">
                <div className="w-full flex flex-col gap-5">
                  <Input
                    value={`Rp ${plans[0]?.price.toLocaleString("id-ID")} ,-`}
                    label="Harga Basic Plan (Bulanan)"
                    labelLayout="block"
                    variant="secondary"
                  />
                  <Input
                    value={`Rp ${plans[1]?.price.toLocaleString("id-ID")} ,-`}
                    label="Harga Premium Plan (Bulanan)"
                    labelLayout="block"
                    variant="secondary"
                  />
                  <Input
                    value={`Rp ${plans[2]?.price.toLocaleString("id-ID")} ,-`}
                    label="Harga Pro Plan (Bulanan)"
                    labelLayout="block"
                    variant="secondary"
                  />
                </div>
                <div className="w-full flex flex-col gap-5">
                  <Input
                    label="Harga Top Up Kecil (Per 1.000 Pertanyaan)"
                    labelLayout="block"
                    variant="secondary"
                  />
                  <Input
                    label="Harga Top Up Besar (Per 5.000 Pertanyaan)"
                    labelLayout="block"
                    variant="secondary"
                  />
                </div>
              </div>
              {/* submit */}
              <div className="flex flex-col gap-3 items-center">
                <Button
                  variant="secondary"
                  classname="px-30 py-3 mt-10 rounded-xl">
                  Simpan Perubahan
                </Button>
                <p className="text-xs text-[#666666]">
                  Terakhir diubah oleh Super Admin pada 10 November 2025
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default manageTransaction;
