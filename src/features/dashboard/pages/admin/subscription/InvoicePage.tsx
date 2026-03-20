import logo from "../../../../../../public/LOGO FIX.svg";
import Button from "../../../../../shared/components/ui/Button";
import { useInvoice } from "../../../hooks";

export const InvoicePage = () => {
  const { downloadPdf, invoice, isLoading, navigate } = useInvoice();

  return (
    <>
      {/* ── Visible invoice (display) ── */}
      <div className="flex justify-center items-center min-h-screen bg-[#040B0E]">
        <div className="flex items-center flex-col gap-5">
          {/* Card — keep white bg for print/readability */}
          <div
            className="bg-white border border-[#16FF6E]/20
                        shadow-[0_0_0_1px_rgba(22,255,110,0.08),0_20px_60px_rgba(0,0,0,0.5)]
                        py-5 px-6 rounded-[20px] w-[680px] flex flex-col gap-5"
          >
            {/* Logo row */}
            <div className="flex justify-between items-center">
              <img src="" alt="" />
              <img
                src={logo}
                alt="logo"
                className="w-16 h-16 drop-shadow-[0_0_8px_rgba(22,255,110,0.15)]"
              />
            </div>

            {/* Title + status */}
            <div className="flex justify-between items-center">
              <h1 className="font-syne font-bold text-[#111] text-2xl">
                Bukti Pembayaran
              </h1>
              {isLoading ? (
                <p className="h-3 w-10 bg-gray-200 animate-pulse rounded-full" />
              ) : (
                <span className="font-dm font-medium text-xs uppercase px-4 py-1.5 rounded-full bg-[#16FF6E]/10 text-[#16FF6E] border border-[#16FF6E]/20">
                  {invoice.PaidStatus}
                </span>
              )}
            </div>

            {/* Detail rows */}
            <div className="flex flex-col gap-3">
              {[
                {
                  label: "Nomor Transaksi",
                  width: "w-52",
                  content: `${invoice.SessionId} (${invoice.PaymentName} ID ${invoice.TransactionId})`,
                },
                {
                  label: "Pembayar (PIC Perusahaan)",
                  width: "w-72",
                  content: `${invoice.BuyerName} (${invoice.BuyerEmail})`,
                },
                {
                  label: "Tanggal Pembayaran",
                  width: "w-40",
                  content: new Date(invoice.SuccessDate).toLocaleString(
                    "id-ID",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                      timeZone: "Asia/Jakarta",
                    },
                  ),
                },
                {
                  label: "Metode Pembayaran",
                  width: "w-32",
                  content: `Payment Gateway (${invoice.PaymentMethod})`,
                },
              ].map(({ label, width, content }) => (
                <div
                  key={label}
                  className="text-sm flex justify-between items-center"
                >
                  <p className="text-[#666666]">{label}</p>
                  {isLoading ? (
                    <p
                      className={`h-3 ${width} bg-gray-200 animate-pulse rounded-full`}
                    />
                  ) : (
                    <p className="font-dm text-[#111] text-right">{content}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Detail tagihan */}
            <div className="flex flex-col gap-2">
              <h2 className="font-syne font-semibold text-lg text-[#16FF6E] border-b border-gray-200 pb-2">
                Detail Tagihan
              </h2>
              {isLoading ? (
                <div className="flex justify-between text-xs">
                  <p className="h-3 w-32 bg-gray-200 animate-pulse rounded-full" />
                  <p className="h-3 w-20 bg-gray-200 animate-pulse rounded-full" />
                </div>
              ) : (
                <div className="flex justify-between font-dm text-sm text-[#333]">
                  <p>Upgrade Paket: {invoice.plan_name}</p>
                  <p>Rp. {invoice.SubTotal.toLocaleString("id-ID")},-</p>
                </div>
              )}
            </div>

            {/* Total */}
            <div className="flex flex-col gap-2 border-b border-gray-200 pb-4">
              <h2 className="font-syne font-semibold text-lg text-[#16FF6E] border-b border-gray-200 pb-2">
                Total Bayar
              </h2>
              <div className="flex justify-end font-syne font-extrabold text-xl text-[#16FF6E]">
                {isLoading ? (
                  <p className="h-3 w-40 bg-gray-200 animate-pulse rounded-full" />
                ) : (
                  <p>Rp. {invoice.Amount.toLocaleString("id-ID")},-</p>
                )}
              </div>
            </div>

            <p className="font-dm text-xs text-[#767676] text-center leading-relaxed">
              Bukti pembayaran ini sah dan diterbitkan secara otomatis oleh
              sistem kami setelah notifikasi sukses dari iPaymu. <br /> © 2025
              PT. SmartAI. Hak Cipta Dilindungi.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <Button
              variant="secondary"
              onclick={() => navigate("/admin/subcription")}
              classname="px-5 py-3 rounded-[10px] font-dm text-sm"
            >
              Kembali ke Dashboard Langganan
            </Button>
            <Button
              onclick={downloadPdf}
              variant="primary"
              classname="group px-5 py-3 rounded-[10px] font-dm text-sm flex items-center gap-2"
            >
              Cetak Bukti Pembayaran
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* ── Hidden canvas for PDF download — keep white, no dark styling ── */}
      <div
        id="canvas-download"
        className="bg-white border absolute top-0 left-0 -z-1 py-3 px-5 justify-between w-170 h-screen flex flex-col gap-4"
      >
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <img src="" alt="" />
            <img src={logo} alt="logo" className="w-17 h-17" />
          </div>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Bukti Pembayaran</h1>
            <span className="bg-[#00AA58] px-3 py-1 rounded-full text-white text-sm">
              {invoice.PaidStatus}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-sm flex justify-between items-center">
              <p className="text-[#666666]">Nomor Transaksi</p>
              <p>
                {invoice.SessionId} ({invoice.PaymentName} ID{" "}
                {invoice.TransactionId})
              </p>
            </div>
            <div className="text-sm flex justify-between items-center">
              <p className="text-[#666666]">Pembayar (PIC Perusahaan)</p>
              <p>
                {invoice.BuyerName} ({invoice.BuyerEmail})
              </p>
            </div>
            <div className="text-sm flex justify-between items-center">
              <p className="text-[#666666]">Tanggal Pembayaran</p>
              <p>
                {new Date(invoice.SuccessDate).toLocaleString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                  timeZone: "Asia/Jakarta",
                })}
              </p>
            </div>
            <div className="text-sm flex justify-between items-center">
              <p className="text-[#666666]">Metode Pembayaran</p>
              <p>Payment Gateway ({invoice.PaymentMethod})</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg text-[#126F3D] border-b-2 pb-2 border-dashed border-gray-200 font-semibold">
              Detail Tagihan
            </h2>
            <div className="flex justify-between text-xs">
              <p>Upgrade Paket: {invoice.plan_name}</p>
              <p>Rp. {invoice.SubTotal.toLocaleString("id-ID")},-</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 border-b-2 border-dashed border-gray-200 pb-3">
            <h2 className="text-lg text-[#126F3D] border-b-2 border-dashed pb-2 border-gray-200 font-semibold">
              Total Bayar
            </h2>
            <div className="flex justify-end text-xl font-bold text-[#126F3D]">
              <p>Rp. {invoice.Amount.toLocaleString("id-ID")},-</p>
            </div>
          </div>
        </div>
        <p className="text-xs text-[#767676] text-center">
          Bukti pembayaran ini sah dan diterbitkan secara otomatis oleh sistem
          kami setelah notifikasi sukses dari iPaymu. <br /> © 2025 PT. SmartAI.
          Hak Cipta Dilindungi.
        </p>
      </div>
    </>
  );
};
