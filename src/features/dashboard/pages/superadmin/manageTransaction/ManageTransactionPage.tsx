import MainLayout from "../../../../../shared/layouts/MainLayout";
import TableHeaderList from "../../../../../shared/components/common/Table/TableHeaderList";
import TableBody from "../../../../../shared/components/common/Table/TableBody";
import { formatDate } from "../../../../../shared/utils/FormatDate";
import Input from "../../../../../shared/components/ui/Input";
import Button from "../../../../../shared/components/ui/Button";
import { subNavigate } from "../../../../../shared/config/subNavigationConfig";
import { useManageTransaction } from "../../../hooks";

export const ManageTransactionPage = () => {
  const {
    data,
    date,
    handleChangePlan,
    handleChangeTopup,
    handleSubmitChange,
    isActive,
    isLoadingFetch,
    nextPage,
    page,
    plans,
    prevPage,
    setIsActive,
    topUp,
    totalPage,
  } = useManageTransaction();

  return (
    <MainLayout>
      <div className="p-10 flex flex-col gap-6">
        {/* ── Page header ── */}
        <h1 className="font-syne font-extrabold text-white 2xl:text-2xl md:text-xl">
          Manajemen Riwayat Transaksi
        </h1>

        {/* ── Sub navigation tabs ── */}
        <div className="flex gap-1 border-b border-[#16FF6E]/[.07]">
          {subNavigate.map((nav) => (
            <button
              key={nav.name}
              onClick={() => setIsActive(nav.name)}
              className={`px-5 py-3 font-dm font-medium 2xl:text-base md:text-sm cursor-pointer transition-all duration-200
                          ${
                            isActive === nav.name
                              ? "text-[#16FF6E] border-b-2 border-[#16FF6E]"
                              : "text-[#6B8C80] hover:text-[#E8F4F0]"
                          }`}
            >
              {nav.name}
            </button>
          ))}
        </div>

        {isActive === "Riwayat Transaksi" ? (
          /* ── Transaction history ── */
          <div
            className="bg-[#0A1A20] border border-[#16FF6E]/[.07] rounded-[20px]
                        p-6 relative overflow-hidden"
          >
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#16FF6E]/20 to-transparent" />
            <h2 className="font-syne font-bold text-white 2xl:text-lg mb-5">
              Riwayat Pembayaran Pro & Top Up (Otomatis iPaymu)
            </h2>
            <div className="rounded-[14px] overflow-hidden border border-[#16FF6E]/[.07]">
              <TableHeaderList classname="grid-cols-6 bg-[#16FF6E]/[.05]">
                <span className="font-dm text-[#6B8C80] text-xs uppercase tracking-wider">
                  ID Transaksi
                </span>
                <span className="font-dm text-[#6B8C80] text-xs uppercase tracking-wider">
                  Nama Perusahaan
                </span>
                <span className="font-dm text-[#6B8C80] text-xs uppercase tracking-wider">
                  Tipe Pembelian
                </span>
                <span className="font-dm text-[#6B8C80] text-xs uppercase tracking-wider">
                  Nominal
                </span>
                <span className="font-dm text-[#6B8C80] text-xs uppercase tracking-wider">
                  Tanggal Bayar
                </span>
                <span className="font-dm text-[#6B8C80] text-xs uppercase tracking-wider">
                  Status
                </span>
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
                      <span className="font-dm text-[#6B8C80] text-sm">
                        {item.payment_reference}
                      </span>
                      <span className="font-dm text-[#E8F4F0] text-sm">
                        {item.company_name}
                      </span>
                      <span className="font-dm text-[#6B8C80] text-sm">
                        {item.type}
                      </span>
                      <span className="font-dm text-[#E8F4F0] text-sm">
                        {convertAmount}
                      </span>
                      <span className="font-dm text-[#6B8C80] text-sm">
                        {convertDate}
                      </span>
                      <div className="flex justify-center">
                        <span
                          className={`font-dm font-medium text-xs uppercase px-4 py-1.5 rounded-full ${
                            item.status === "paid"
                              ? "bg-[#16FF6E]/10 text-[#16FF6E] border border-[#16FF6E]/20"
                              : item.status === "expired"
                                ? "bg-red-500/10 text-red-400 border border-red-500/20"
                                : item.status === "pending_payment"
                                  ? "bg-yellow-400/10 text-yellow-400 border border-yellow-400/20"
                                  : "bg-white/5 text-[#6B8C80] border border-white/10"
                          }`}
                        >
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
          /* ── Pricing settings ── */
          <div
            className="bg-[#0A1A20] border border-[#16FF6E]/[.07] rounded-[20px]
                        p-6 relative overflow-hidden"
          >
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#16FF6E]/20 to-transparent" />
            <h2 className="font-syne font-bold text-white text-lg mb-6">
              Atur Harga Dasar Produk
            </h2>
            <div className="flex w-full gap-8">
              <div className="w-full flex flex-col gap-5">
                <Input
                  onchange={(e) => handleChangePlan(0, e.target.value)}
                  value={plans[0]?.price.toLocaleString("id-ID")}
                  label={`Harga ${plans[0]?.name} (Bulanan)`}
                  labelLayout="block"
                  variant="primary"
                />
                <Input
                  onchange={(e) => handleChangePlan(1, e.target.value)}
                  value={plans[1]?.price.toLocaleString("id-ID")}
                  label={`Harga ${plans[1]?.name} (Bulanan)`}
                  labelLayout="block"
                  variant="primary"
                />
                <Input
                  onchange={(e) => handleChangePlan(2, e.target.value)}
                  value={plans[2]?.price.toLocaleString("id-ID")}
                  label={`Harga ${plans[2]?.name} (Bulanan)`}
                  labelLayout="block"
                  variant="primary"
                />
              </div>
              <div className="w-full flex flex-col gap-5">
                <Input
                  onchange={(e) => handleChangeTopup(0, e.target.value)}
                  value={topUp[0]?.price.toLocaleString("id-ID")}
                  label={`Harga Top Up ${topUp[0]?.package_type} (Per ${topUp[0]?.questions} Pertanyaan)`}
                  labelLayout="block"
                  variant="primary"
                />
                <Input
                  onchange={(e) => handleChangeTopup(1, e.target.value)}
                  value={topUp[1]?.price.toLocaleString("id-ID")}
                  label={`Harga Top Up ${topUp[1]?.package_type} (Per ${topUp[1]?.questions} Pertanyaan)`}
                  labelLayout="block"
                  variant="primary"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 items-center mt-10">
              <Button
                onclick={handleSubmitChange}
                variant="primary"
                classname="group px-16 py-3.5 flex items-center gap-2.5"
              >
                Simpan Perubahan
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Button>
              <p className="font-dm text-xs text-[#6B8C80]">
                Terakhir diubah oleh Super Admin pada {date}
              </p>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};
