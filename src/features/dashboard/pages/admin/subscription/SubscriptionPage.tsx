import TableBody from "../../../../../shared/components/common/Table/TableBody";
import TableHeaderList from "../../../../../shared/components/common/Table/TableHeaderList";
import MainLayout from "../../../../../shared/layouts/MainLayout";
import { formatDate } from "../../../../../shared/utils/FormatDate";
import { useSubscription } from "../../../hooks";

export const SubscriptionPage = () => {
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
      <div className="p-10 flex flex-col gap-6">
        {/* ── Page header ── */}
        <div className="flex flex-col gap-1">
          <h1 className="font-syne font-extrabold text-white 2xl:text-3xl md:text-2xl">
            Subscription
          </h1>
          <p className="font-dm text-[#6B8C80] 2xl:text-base md:text-sm">
            Detail Langganan Perusahaan
          </p>
        </div>

        {/* ── Plan summary card ── */}
        <div
          className="relative bg-[#0A1A20] border border-[#16FF6E]/[.07]
                      rounded-[20px] px-8 py-6 flex justify-between overflow-hidden"
        >
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#16FF6E]/20 to-transparent" />

          {/* Paket */}
          <div className="flex flex-col justify-between gap-4">
            <p className="font-dm text-[#6B8C80] 2xl:text-sm md:text-xs uppercase tracking-wider">
              Paket Langganan Saat Ini
            </p>
            <div>
              <h2 className="font-syne font-extrabold text-[#16FF6E] 2xl:text-3xl md:text-2xl">
                {mySub.plan_name}
              </h2>
              <p className="font-dm 2xl:text-xs md:text-[10px] text-red-400 mt-1">
                Sisa Kuota: {mySub.remaining_quota} / {mySub.total_quota}{" "}
                Pertanyaan
              </p>
            </div>
          </div>

          <div className="w-px bg-[#16FF6E]/[.07]" />

          {/* Masa aktif */}
          <div className="flex flex-col justify-between gap-4">
            <p className="font-dm text-[#6B8C80] 2xl:text-sm md:text-xs uppercase tracking-wider">
              Masa Aktif Berakhir
            </p>
            <div>
              <h2 className="font-syne font-extrabold text-[#16FF6E] 2xl:text-3xl md:text-2xl">
                {mySub.end_date}
              </h2>
              <p className="font-dm 2xl:text-xs md:text-[10px] text-yellow-400 mt-1">
                Perlu perpanjangan dalam 30 hari
              </p>
            </div>
          </div>

          <div className="w-px bg-[#16FF6E]/[.07]" />

          {/* Kuota */}
          <div className="flex flex-col justify-between gap-4">
            <p className="font-dm text-[#6B8C80] 2xl:text-sm md:text-xs uppercase tracking-wider">
              Sisa Kuota Keseluruhan
            </p>
            <div>
              <h2 className="font-syne font-extrabold text-[#16FF6E] 2xl:text-3xl md:text-2xl">
                {mySub.remaining_quota}
              </h2>
              <p className="font-dm 2xl:text-xs md:text-[10px] text-red-400 mt-1">
                Tersisa {mySub.remaining_quota_percentage}% dari{" "}
                {mySub.total_quota} kuota
              </p>
            </div>
          </div>

          <div className="w-px bg-[#16FF6E]/[.07]" />

          {/* CTA */}
          <div className="flex flex-col justify-center">
            <button
              onClick={() => navigate("select-sub")}
              className="group relative flex items-center gap-2
                         font-syne font-bold text-[13px] text-[#040B0E]
                         bg-[#16FF6E] px-5 py-2.5 rounded-[10px] overflow-hidden
                         before:absolute before:inset-0
                         before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent
                         before:-translate-x-full before:transition-transform before:duration-500
                         hover:before:translate-x-full
                         hover:shadow-[0_0_24px_rgba(22,255,110,0.4)]
                         transition-all duration-[250ms] cursor-pointer"
            >
              Upgrade Plan / Top Up kuota
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Transaction history ── */}
        <div
          className="relative bg-[#0A1A20] border border-[#16FF6E]/[.07]
                      rounded-[20px] p-6 overflow-hidden"
        >
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#16FF6E]/20 to-transparent" />

          <h2 className="font-syne font-bold text-white 2xl:text-xl md:text-lg mb-5">
            Riwayat Transaksi
          </h2>

          <div className="rounded-[14px] overflow-hidden border border-[#16FF6E]/[.07]">
            <TableHeaderList classname="grid-cols-6">
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
                      <span className="font-dm text-[#6B8C80]/50 text-sm text-center italic">
                        Tidak ditemukan
                      </span>
                    ) : (
                      <span className="font-dm text-[#E8F4F0] text-sm text-center">
                        {item.payment_reference}
                      </span>
                    )}
                    <span className="font-dm text-[#6B8C80] text-sm">
                      {item.type}
                    </span>
                    <span className="font-dm text-[#E8F4F0] text-sm">
                      Rp.{amountIdn}
                    </span>
                    <span className="font-dm text-[#6B8C80] text-sm">
                      {date}
                    </span>

                    {/* Status badge */}
                    <div className="flex justify-center">
                      <span
                        className={`font-dm font-medium text-xs uppercase px-4 py-1.5 rounded-full
                          ${
                            item.status === "paid"
                              ? "bg-[#16FF6E]/10 text-[#16FF6E] border border-[#16FF6E]/20"
                              : item.status === "pending_payment"
                                ? "bg-yellow-400/10 text-yellow-400 border border-yellow-400/20"
                                : item.status === "pending_review"
                                  ? "bg-blue-400/10 text-blue-400 border border-blue-400/20"
                                  : item.status === "expired"
                                    ? "bg-red-500/10 text-red-400 border border-red-500/20"
                                    : "bg-white/5 text-[#6B8C80] border border-white/10"
                          }`}
                      >
                        {item.status}
                      </span>
                    </div>

                    {/* Action link */}
                    <span className="font-dm text-sm text-[#16FF6E] hover:underline underline-offset-2 transition-colors duration-200">
                      {item.status === "pending_payment" ? (
                        <a href={item.payment_url} target="_blank">
                          Lanjutkan Pembayaran
                        </a>
                      ) : item.status === "paid" ? (
                        <a
                          href={`/admin/subcription/invoice?trx-id=${item.payment_reference}`}
                        >
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
    </MainLayout>
  );
};
