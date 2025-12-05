import { useNavigate, useSearchParams } from "react-router-dom";
import logo from "../../../../../../public/LOGO FIX.svg";
import Button from "../../../../../shared/components/ui/Button";
import { useEffect, useState } from "react";
import { receiptApi } from "../../../services/admin/Subcription";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

const InvoicePage = () => {
  const [searchParams] = useSearchParams();
  const initParams = Number(searchParams.get("trx-id")) || 0;
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState({
    SessionId: "",
    TransactionId: 0,
    BuyerName: "",
    BuyerEmail: "",
    SuccessDate: "",
    PaymentMethod: "",
    PaymentName: "",
    PaidStatus: "",
    SubTotal: 0,
    Amount: 0,
    plan_name: "",
  });

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await receiptApi(initParams);
        console.log(res);
        setInvoice({
          BuyerEmail: res.receipt.BuyerEmail,
          BuyerName: res.receipt.BuyerName,
          PaidStatus: res.receipt.PaidStatus,
          PaymentMethod: res.receipt.PaymentMethod,
          PaymentName: res.receipt.PaymentName,
          SessionId: res.receipt.SessionId,
          SubTotal: res.receipt.SubTotal,
          SuccessDate: res.receipt.SuccessDate,
          TransactionId: res.receipt.TransactionId,
          Amount: res.receipt.Amount,
          plan_name: res.plan_name,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchInvoice();
  }, []);

  const downloadPdf = async () => {
    const elementInvoice = document.getElementById("canvas-download");
    if (!elementInvoice) return;

    const canvas = await html2canvas(elementInvoice, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#fff",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = 210;
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "pdf", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`invoice-${invoice.BuyerName}-${invoice.SessionId}.pdf`);
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="flex items-center flex-col gap-5">
          <div className="bg-white shadow-2xl/15 border py-3 px-5 rounded-2xl w-170 flex  flex-col gap-4">
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

            <div className=" flex flex-col gap-2">
              <h2 className="text-lg text-[#126F3D] border-b pb-2 border-gray-200 font-semibold">
                Detail Tagihan
              </h2>
              <div className="flex justify-between text-xs">
                <p>Upgrade Paket: {invoice.plan_name}</p>
                <p>Rp. {invoice.SubTotal.toLocaleString("id-ID")},-</p>
              </div>
            </div>
            <div className=" flex flex-col gap-2 border-b border-gray-200 pb-3">
              <h2 className="text-lg text-[#126F3D] border-b pb-2 border-gray-200 font-semibold">
                Total Bayar
              </h2>
              <div className="flex justify-end text-xl font-bold text-[#126F3D]">
                <p>Rp. {invoice.Amount.toLocaleString("id-ID")},-</p>
              </div>
            </div>

            <p className="text-xs text-[#767676] text-center">
              Bukti pembayaran ini sah dan diterbitkan secara otomatis oleh
              sistem kami setelah notifikasi sukses dari iPaymu. <br /> © 2025
              PT. SmartAI. Hak Cipta Dilindungi.
            </p>
          </div>
          <div className="flex gap-5">
            <Button
              variant="secondary"
              onclick={() => navigate("/admin/subcription")}
              classname="px-3 py-3 rounded-lg text-sm">
              Kembali Kedashboard Langganan
            </Button>
            <Button
              onclick={downloadPdf}
              variant="primary"
              classname="px-3 py-3 rounded-lg text-sm">
              Cetak Bukti Pembayaran
            </Button>
          </div>
        </div>
      </div>

      <div id="canvas-download" className="bg-white border absolute top-0 left-0 -z-1 py-3 px-5 justify-between w-170 h-screen flex flex-col gap-4">
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

          <div className=" flex flex-col gap-2">
            <h2 className="text-lg text-[#126F3D] border-b-2 pb-2 border-dashed border-gray-200 font-semibold">
              Detail Tagihan
            </h2>
            <div className="flex justify-between text-xs">
              <p>Upgrade Paket: {invoice.plan_name}</p>
              <p>Rp. {invoice.SubTotal.toLocaleString("id-ID")},-</p>
            </div>
          </div>
          <div className=" flex flex-col gap-2 border-b-2 border-dashed border-gray-200 pb-3">
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

export default InvoicePage;
