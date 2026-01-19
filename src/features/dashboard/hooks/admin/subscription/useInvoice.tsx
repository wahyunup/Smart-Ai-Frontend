import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { receiptApi } from "../../../services/admin/Subcription";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const useInvoice = () => {
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
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
      } finally {
        setIsLoading(false);
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

  return {
    invoice,
    isLoading,
    downloadPdf,
    navigate,
  };
};
