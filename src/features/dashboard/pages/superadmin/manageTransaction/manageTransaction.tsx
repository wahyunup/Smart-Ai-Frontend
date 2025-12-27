import { useEffect, useState } from "react";
import MainLayout from "../../../../../shared/layouts/MainLayout";
import TableHeaderList from "../../../../../shared/components/common/Table/TableHeaderList";
import TableBody from "../../../../../shared/components/common/Table/TableBody";
import {
  allPlanApi,
  allTransactionApi,
  updateTransactionApi,
} from "../../../services/superadmin/Transaction";
import { formatDate } from "../../../../../shared/utils/FormatDate";
import Input from "../../../../../shared/components/ui/Input";
import Button from "../../../../../shared/components/ui/Button";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";

const manageTransaction = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initParamsPage = Number(searchParams.get("page")) || 1;
  const initNav = searchParams.get("nav") ?? "Riwayat Transaksi";
  const [isActive, setIsActive] = useState(initNav);
  const [isLoadingFetch, setIsLoadingFetch] = useState(false)
  const [data, setData] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(initParamsPage);
  const [plans, setplans] = useState<any>([]);
  const [topUp, setTopUp] = useState<any>([]);
  const [date, setDate] = useState("")

  const fetchTransaction = async () => {
    try {
      const res = await allTransactionApi(page, 4);
      setTotalPage(res.total_pages);
      setPage(res.current_page);
      setData(res.items);
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    setSearchParams({ page: String(page), nav: String(isActive) });
  }, [page, isActive]);

  const handleChangePlan = (index: number, value: string) => {
    const cleanValue = Number(value.replace(/\D/g, ""));
    const updated = [...plans];
    updated[index].price = cleanValue;
    setplans(updated);
  };

  const handleChangeTopup = (index: number, value: string) => {
    const cleanValue = Number(value.replace(/\D/g, ""));
    const updated = [...topUp];
    updated[index].price = cleanValue;
    setTopUp(updated);
  };

  const fetchPlans = async () => {
    setIsLoadingFetch(true)
    try {
      const res = await allPlanApi();
      console.log(res);
      const convert_date = formatDate(res.updated_at)
      setDate(convert_date)
      setTopUp(res.top_up_packages);
      setplans(res.plans);
    } catch (error: any) {
      console.log(error.response.data.message);
    } finally {
      setIsLoadingFetch(false)
    }
  };

  const handleSubmitChange = async () => {
    try {
      const payload = {
        plans: plans.map((p: { name: string; price: number }) => ({
          name: p.name,
          price: Number(p.price),
        })),
        top_up_packages: topUp.map(
          (t: { package_type: string; price: number }) => ({
            package_type: t.package_type,
            price: Number(t.price),
          })
        ),
      };

      await updateTransactionApi(payload);

      Swal.fire({
        text: "Harga berhasil diperbarui!",
        icon: "success",
        confirmButtonText: "oke",
        confirmButtonColor: "#2BA54B",
        buttonsStyling : true,
        customClass: {
          confirmButton: "primary-button",
        },
      }).then(async (response) => {
        if (response.isConfirmed) {
          window.location.reload();
        }
      });
    } catch (error: any) {
      Swal.fire({
        text: error.response?.data?.message,
        icon: "error",
        confirmButtonText: "OKE",
      });
    }
  };

  useEffect(() => {
    fetchPlans();
    fetchTransaction();
  }, [page]);

  const subNavigate = [
    {
      name: "Riwayat Transaksi",
    },
    {
      name: "Kelola Harga",
    },
  ];

  const nextPage = () => {
    if (page < totalPage) {
      setPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  return (
    <MainLayout>
      <div className="p-10 flex flex-col gap-3">
        <h1 className="2xl:text-2xl md:text-xl font-semibold">Manajemen Riwayat Transaksi</h1>
        <div className="flex gap-5 items-center border-b">
          {subNavigate.map((nav) => (
            <button
              onClick={() => setIsActive(nav.name)}
              className={`p-3 cursor-pointer 2xl:text-base md:text-sm  ${
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
            <h1 className="2xl:text-xl font-semibold">
              Riwayat Pembayaran Pro & Top Up (Otomatis iPaymu)
            </h1>
            <div className="rounded-2xl overflow-hidden mt-4 border border-[#B2B2B2]">
              <TableHeaderList classname="grid-cols-6 bg-[#E3F9E8]">
                <span>ID Transaksi</span>
                <span>Nama Perusahaan</span>
                <span>Tipe Pembelian</span>
                <span>Nominal</span>
                <span>Tanggal Bayar</span>
                <span>Status</span>
              </TableHeaderList>
              <TableBody
              isLoadingFetch={isLoadingFetch}
                nextPage={nextPage}
                prevPage={prevPage}
                page={page}
                totalPage={totalPage}
                canAction={false}
                data={data}
                classname="grid-cols-6 text-center"
                renderItem={(item) => {
                  const convertAmount = item.amount.toLocaleString("id-ID");
                  const convertDate = formatDate(item.created_at);
                  return (
                    <>
                      <span>{item.payment_reference}</span>
                      <span>{item.company_name}</span>
                      <span>{item.type}</span>
                      <span>{convertAmount}</span>
                      <span>{convertDate}</span>
                      <div>
                      <span
                        className={`px-4 py-2 rounded-full text-white ${
                          item.status === "paid"
                            ? "bg-[#00AA58]"
                            : item.status === "expired"
                            ? "bg-[#DB3726]"
                            : item.status === "pending_payment"
                            ? "bg-[#DBBE03]"
                            : null
                        }`}>
                        {item.status}
                      </span>
                      </div>
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
                    onchange={(e) => handleChangePlan(0, e.target.value)}
                    value={plans[0]?.price.toLocaleString("id-ID")}
                    label={`Harga ${plans[0]?.name} (Bulanan)`}
                    labelLayout="block"
                    variant="secondary"
                  />
                  <Input
                    onchange={(e) => handleChangePlan(1, e.target.value)}
                    value={plans[1]?.price.toLocaleString("id-ID")}
                    label={`Harga ${plans[1]?.name} (Bulanan)`}
                    labelLayout="block"
                    variant="secondary"
                  />
                  <Input
                    onchange={(e) => handleChangePlan(2, e.target.value)}
                    value={plans[2]?.price.toLocaleString("id-ID")}
                    label={`Harga ${plans[2]?.name} (Bulanan)`}
                    labelLayout="block"
                    variant="secondary"
                  />
                </div>
                <div className="w-full flex flex-col gap-5">
                  <Input
                    onchange={(e) => handleChangeTopup(0, e.target.value)}
                    value={topUp[0]?.price.toLocaleString("id-ID")}
                    label={`Harga Top Up ${topUp[0]?.package_type} (Per ${topUp[0]?.questions} Pertanyaan)`}
                    labelLayout="block"
                    variant="secondary"
                  />
                  <Input
                    onchange={(e) => handleChangeTopup(1, e.target.value)}
                    value={topUp[1]?.price.toLocaleString("id-ID")}
                    label={`Harga Top Up ${topUp[1]?.package_type} (Per ${topUp[1]?.questions} Pertanyaan)`}
                    labelLayout="block"
                    variant="secondary"
                  />
                </div>
              </div>
              {/* submit */}
              <div className="flex flex-col gap-3 items-center">
                <Button
                  onclick={handleSubmitChange}
                  variant="secondary"
                  classname="px-30 py-3 mt-10 rounded-xl">
                  Simpan Perubahan
                </Button>
                <p className="text-xs text-[#666666]">
                  Terakhir diubah oleh Super Admin pada {date}
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
