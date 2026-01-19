import TableBody from "../../../../../shared/components/common/Table/TableBody";
import TableHeaderList from "../../../../../shared/components/common/Table/TableHeaderList";
import MainLayout from "../../../../../shared/layouts/MainLayout";
import { formatDate } from "../../../../../shared/utils/FormatDate";
import { useSubscription } from "../../../hooks";
const SubcriptionPage = () => {
  const {
    handleNextPage,
    handlePrevPage,
    isLoading,
    mySub,
    navigate,
    page,
    totalPage,
    transaction,
  } = useSubscription();

  return (
    <MainLayout>
      <div className="p-10">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <h1 className="2xl:text-3xl md:text-2xl font-semibold">
              Subscription
            </h1>
            <p className="2xl:text-xl md:text-base font-medium">
              Detail Langganan Perusahaan
            </p>
          </div>

          <div className="bg-white shadow-xl/3 border-gray-200 border flex justify-between h-50 p-8 rounded-2xl px-10">
            <div className="flex flex-col justify-between ">
              <p className="font-manrope 2xl:text-base md:text-sm text-[#666666]">
                Paket langganan saat ini
              </p>
              <div>
                <h1 className="2xl:text-3xl md:text-2xl font-semibold text-[#1D8A45] font-inter">
                  {mySub.plan_name}
                </h1>
                <p className="2xl:text-sm md:text-xs text-[#DB3726] ">
                  Sisa Kuota: {mySub.remaining_quota} / {mySub.total_quota}{" "}
                  Pertanyaan
                </p>
              </div>
            </div>
            <div className="border-l border-[#E5E5E5]"></div>
            <div className="flex flex-col justify-between ">
              <p className="font-manrope 2xl:text-base md:text-sm text-[#666666]">
                Masa Aktif Berakhir
              </p>
              <div>
                <h1 className="2xl:text-3xl md:text-2xl font-semibold text-[#1D8A45] font-inter">
                  {mySub.end_date}
                </h1>
                <p className="2xl:text-sm md:text-xs text-[#887600]">
                  Perlu perpanjangan dalam 30 hari
                </p>
              </div>
            </div>
            <div className="border-l border-[#E5E5E5]"></div>
            <div className="flex flex-col justify-between ">
              <p className="font-manrope 2xl:text-base md:text-sm text-[#666666]">
                Sisa Kuota Keseluruhan
              </p>
              <div>
                <h1 className="2xl:text-3xl md:text-2xl font-semibold text-[#1D8A45] font-inter">
                  {mySub.remaining_quota}
                </h1>
                <p className="2xl:text-sm md:text-xs text-[#DB3726]">
                  Tersisa {mySub.remaining_quota_percentage}% dari{" "}
                  {mySub.total_quota} kuota
                </p>
              </div>
            </div>
            <div className="border-l border-[#E5E5E5]"></div>
            <div className="flex flex-col justify-center ">
              <button
                onClick={() => navigate("select-sub")}
                className="p-2 rounded-lg cursor-pointer border-[#2BA54B] border 2xl:text-sm md:text-xs">
                Upgrade Plan / Top Up kuota
              </button>
            </div>
          </div>

          <div className="p-6 bg-white shadow-xl/3 border border-gray-200 rounded-2xl">
            <h1 className="2xl:text-2xl md:text-xl font-semibold">
              Riwayat Transaksi
            </h1>
            <div className="overflow-hidden rounded-2xl mt-5 border border-[#B2B2B2]">
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
                nextPage={handleNextPage}
                prevPage={handlePrevPage}
                isLoadingFetch={isLoading}
                totalPage={totalPage}
                page={page}
                data={transaction}
                renderItem={(item) => {
                  const dateCondition =
                    item.paid_at === null ? item.created_at : item.paid_at;
                  const date = formatDate(dateCondition);
                  const amountIdn = item?.amount?.toLocaleString("id-ID");
                  return (
                    <>
                      {item.payment_reference === null ? (
                        <span className="text-center">id tidak di temukan</span>
                      ) : (
                        <span className="text-center">
                          {item.payment_reference}
                        </span>
                      )}
                      <span>{item.type}</span>
                      <span>Rp.{amountIdn}</span>
                      <span>{date}</span>
                      <div className="flex justify-center">
                        <div
                          className={`${
                            item.status === "paid"
                              ? "bg-[#00AA58] px-3 text-white py-1 rounded-full"
                              : item.status === "pending_payment"
                              ? "bg-[#DBBE03] text-white px-3 py-1 rounded-full"
                              : item.status === "pending_review"
                              ? "bg-[#1069C9] text-white px-3 py-1 rounded-full"
                              : item.status === "expired"
                              ? "bg-red-600 text-white px-3 py-1 rounded-full"
                              : ""
                          } w-fit`}>
                          <span>{item.status}</span>
                        </div>
                      </div>
                      <span className="text-sm text-[#2BA54B] underline">
                        {item.status === "pending_payment" ? (
                          <a href={item.payment_url} target="_blank">
                            Lanjutkan Pembayaran
                          </a>
                        ) : item.status === "paid" ? (
                          <a
                            href={`/admin/subcription/invoice?trx-id=${item.payment_reference}`}>
                            Lihat/unduh bukti
                          </a>
                        ) : (
                          ""
                        )}
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
