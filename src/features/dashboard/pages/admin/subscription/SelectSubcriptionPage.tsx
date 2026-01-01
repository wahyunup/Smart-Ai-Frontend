import { Check } from "lucide-react";
import MainLayout from "../../../../../shared/layouts/MainLayout";
import { useEffect, useState } from "react";
import {
  myPaymentApi,
  planSubcriptionApi,
} from "../../../services/admin/Subcription";
import { Icon } from "@iconify/react";

const SelectSubcriptionPage = () => {
  const [data, setData] = useState([]);
  const [optionPlan, setOptionPlan] = useState<any | []>([]);
  const [currentPlan, setCurrentPlan] = useState();
  const [isLoading, setIsLoading] = useState<string | boolean>(false);
  const isLocalhost = window.location.hostname === "localhost";

  useEffect(() => {
    const fetchSubPlan = async () => {
      try {
        const res = await planSubcriptionApi();
        console.log(res);
        setCurrentPlan(res?.current_subscription?.plan_name);
        setData(res?.plans);
        setOptionPlan(res?.top_up_packages);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSubPlan();
  }, [isLoading]);

  const handlePayment = async (id: number, package_type?: string) => {
    const loadId = package_type ? `topup-${id}` : `plan-${id}`;
    setIsLoading(loadId);
    const baseURL = !isLocalhost
      ? import.meta.env.VITE_VERCEL_URL ?? import.meta.env.VITE_VPS_URL
      : "http://localhost:5173";
    const successRoute = `${baseURL}/admin/subcription/payment-success`;
    const failedRoute = `${baseURL}/admin/subcription/payment-failed`;

    try {
      if (!package_type) {
        const res = await myPaymentApi(id, successRoute, failedRoute, "");

        if (res) {
          window.open(res.payment_url, "_blank");
        }
      } else {
        if (!package_type) {
          return;
        }
        const res = await myPaymentApi(
          0,
          successRoute,
          failedRoute,
          package_type
        );
        if (res) {
          window.open(res.payment_url, "_blank");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  console.log(currentPlan);

  return (
    <MainLayout>
      <div className="p-10 overflow-auto">
        <div>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-semibold text-center">
              Pilih Paket Layanan SMART AI
            </h1>
            <p className="text-[#666666] text-center">
              Paket Anda saat ini adalah Basic Plan. Pilih opsi di bawah untuk
              Upgrade/Top Up.
            </p>
          </div>

          <div className="flex gap-3 justify-center mt-10">
            {currentPlan === undefined && (
            <div
              className={` py-9 px-7 w-80 flex flex-col gap-3 ${
                currentPlan === undefined
                  ? "border-gray-200 bg-gray-50 border"
                  : "bg-white border border-transparent hover:border hover:border-gray-200"
              }  rounded-2xl shadow-2xl/6 `}>
              <div className="flex flex-col gap-1">
                <h1 className="text-[#2BA54B] font-semibold text-4xl">Trial</h1>
                <p className="text-sm">Trial</p>
              </div>
              <p className="text-sm text-gray-500">
                <span className="text-2xl text-black">Gratis 7 Hari</span>
              </p>
              {currentPlan === undefined ? (
                <button className="w-full px-10 py-2 rounded-full text-sm bg-[#88888888] text-[#272727]">
                  Paket Aktif Saat Ini
                </button>
              ) : (
                <button className="w-full cursor-pointer px-10 py-2 rounded-full text-sm bg-[#2BA54B] text-white">
                  Upgrade Ke Trial Plan
                </button>
              )}

              <div className="text-xs flex flex-col gap-2">
                <p className="flex items-center gap-1">
                  <Check color="#13D376" size={15} />
                  <span>100 pertanyaan / bulan</span>
                </p>
                <p className="flex items-center gap-1">
                  <Check color="#13D376" size={15} />
                  <span> Maksimal 2 Users</span>
                </p>
                <p className="flex items-center gap-1">
                  <Check color="#13D376" size={15} />
                  <span>Tidak ada Custom Prompt</span>
                </p>
                <p className="flex items-center gap-1">
                  <Check color="#13D376" size={15} />
                  <span>5 Dokumen</span>
                </p>
              </div>
            </div>
            )}
            {data.map((item: any) => (
              <div
                key={item.id}
                className={` py-9 px-7 w-80 flex flex-col gap-3 ${
                  item.name === currentPlan
                    ? "border-gray-200 bg-gray-50 border"
                    : "bg-white border border-transparent hover:border hover:border-gray-200"
                }  rounded-2xl shadow-2xl/6 `}>
                <div className="flex flex-col gap-1">
                  <h1 className="text-[#2BA54B] font-semibold text-4xl">
                    {item.name}
                  </h1>
                  <p className="text-sm">{item.recomended_for}</p>
                </div>
                <p className="text-sm text-gray-500">
                  <span className="text-2xl text-black">
                    {item.price === "Rp 0"
                      ? "Gratis 7 Hari"
                      : item.price.toLocaleString("id-ID")}
                  </span>
                  {item.price === "Rp 0" ? "" : "/bulan"}
                </p>
                {item.name === currentPlan ? (
                  <button className="w-full px-10 py-2 rounded-full text-sm bg-[#88888888] text-[#272727]">
                    Paket Aktif Saat Ini
                  </button>
                ) : isLoading === `plan-${item.id}` ? (
                  <button className=" w-full cursor-pointer px-10 py-2 rounded-full text-sm border-[#2BA54B] text-[#2BA54B] border flex items-center justify-center">
                    <Icon icon="line-md:loading-loop" width="24" height="24" />
                  </button>
                ) : (
                  <button
                    onClick={() => handlePayment(item.id)}
                    className="w-full cursor-pointer px-10 py-2 rounded-full text-sm bg-[#2BA54B] text-white">
                    Upgrade ke {item.name}
                  </button>
                )}

                <div className="text-xs flex flex-col gap-2">
                  <p className="flex items-center gap-1">
                    <Check color="#13D376" size={15} />
                    <span>{item.question_quota.toLocaleString("id-ID")}</span>
                  </p>
                  <p className="flex items-center gap-1">
                    <Check color="#13D376" size={15} />
                    <span> Maksimal {item.max_users}</span>
                  </p>
                  <p className="flex items-center gap-1">
                    <Check color="#13D376" size={15} />
                    <span>{item.allow_custom_prompts}</span>
                  </p>
                  <p className="flex items-center gap-1">
                    <Check color="#13D376" size={15} />
                    <span>{item.document_quota}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3 justify-center items-center flex-col mt-10 bg-white border border-gray-100 rounded-2xl shadow-2xl/6 p-5">
            <div className="flex flex-col gap-1 border-b border-gray-100 pb-5">
              <h1 className="font-semibold text-2xl text-center">
                Opsi Tambahan: Top Up Kuota (Pay-Per-Use)
              </h1>
              <p className="text-center">
                Tambahkan kuota pertanyaan di luar paket langganan Anda untuk
                fleksibilitas. Kuota ditambahkan ke paket aktif saat ini.
              </p>
            </div>

            <div className="flex gap-3 mt-5 mb-5">
              {optionPlan.map((item: any, i: number) => (
                <div
                  key={i}
                  className="flex flex-col justify-between gap-3 border border-gray-200 bg-[#0DB57526] px-3 py-5 h-50 rounded-2xl w-60">
                  <div className="flex flex-col gap-2">
                    <h1 className="text-[#009C61] text-3xl font-semibold">
                      Top Up{" "}
                      <span className="capitalize">{item.package_type}</span>
                    </h1>
                    <p className="text-sm">
                      + {item.questions.toLocaleString("id-ID")} pertanyaan
                    </p>
                  </div>

                  <p className="text-2xl">
                    Rp {item.price.toLocaleString("id-ID")},-
                  </p>
                  {isLoading === `topup-${i}` ? (
                    <button className=" w-full cursor-pointer px-10 py-2 rounded-full text-sm border-[#2BA54B] text-[#2BA54B] border flex items-center justify-center bg-white">
                      <Icon
                        icon="line-md:loading-loop"
                        width="24"
                        height="24"
                      />
                    </button>
                  ) : (
                    <button
                      onClick={() => handlePayment(i, item.package_type)}
                      className="border border-[#0DB575] text-[#0DB575] font-medium bg-white px-4 text-sm py-2 rounded-full cursor-pointer">
                      Tambah Kuota
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SelectSubcriptionPage;
