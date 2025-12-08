import Button from "../../../../../shared/components/ui/Button";
import successImage from "../../../../../../public/img succes transaction.png";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { paymentStatus } from "../../../services/admin/Subcription";
import { formatDate } from "../../../../../shared/utils/FormatDate";

const paymentSuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const trx_id = Number(searchParams.get("trx_id")) || 0;
  const [status, setStatus] = useState({
    plan_name: "",
    active_end: "",
    subscription_status: "",
  });
  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        const res = await paymentStatus(trx_id);
        const date = formatDate(res.active_end);

        setStatus({
          active_end: date,
          plan_name: res.plan_name,
          subscription_status: res.subscription_status,
        });
      } catch (error: any) {
        console.log(error.response.data.message);
      }
    };
    fetchPaymentStatus();
  }, []);

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="py-5 px-10 bg-white border rounded-2xl flex flex-col items-center gap-5 shadow-2xl/15">
          <img src={successImage} alt="success-image" />
          <h1 className="text-3xl font-semibold">Pembayaran Sukses!</h1>
          <div className="bg-[#6DF19740] border-l-4 border-[#0DB575] w-100 rounded-2xl p-3 flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <h2 className="text-sm font-semibold">Paket Aktif</h2>
              <p className="text-xs text-[#2F2F2F]">{status.plan_name}</p>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-sm font-semibold">Masa Aktif</h2>
              <p className="text-xs text-[#2F2F2F]">{status.active_end}</p>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-sm font-semibold">Status</h2>
              <p className="text-xs text-[#2F2F2F]">
                {status.subscription_status}
              </p>
            </div>
          </div>

          <div className="flex gap-5">
            <Button
              onclick={() => navigate("/admin/subcription")}
              variant="secondary"
              classname="px-3 py-3 rounded-lg text-sm">
              Kembali Ke Dashboard Langganan
            </Button>
            <Button
              onclick={() =>
                navigate(`/admin/subcription/invoice?trx-id=${trx_id}`)
              }
              variant="primary"
              classname="px-5 py-3 rounded-2xl text-sm">
              Unduh Bukti Pembayaran
            </Button>
          </div>
          <p className="text-xs">
            Ada kendala? Hubungi Super Admin{" "}
            <span className="text-sm text-[#08891E]">di Sini</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default paymentSuccessPage;
