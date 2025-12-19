import { useNavigate, useSearchParams } from "react-router-dom";
import Input from "../../../shared/components/ui/Input";
import AuthLayout from "../../../shared/layouts/AuthLayout";
import AuthSection from "../components/AuthSection";
import Button from "../../../shared/components/ui/Button";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { authCompanyRegisterApi } from "../services/authApis";
import Swal from "sweetalert2";

const CompanyRegisterPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const stepParams = Number(searchParams.get("step")) || 1;
  const [step, setStep] = useState(stepParams);
  const emailParams = searchParams.get("verifyEmail") ?? "";
  const [verifyEmail, setVerifyEmail] = useState(emailParams);
  const [showingPassword, setShowingPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    companyName: "",
    companyEmail: "",
    picName: "",
    picNo: 62,
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setSearchParams({ verifyEmail: String(verifyEmail), step: String(step) });
  }, [step, verifyEmail]);

  const handleRegister = async () => {
    setIsLoading(true);
    try {
      await authCompanyRegisterApi(
        form.picName,
        form.companyEmail,
        form.password,
        form.companyName,
        form.picNo
      );
      Swal.fire({
        text: "register berhasil",
        icon: "success",
        confirmButtonText: "oke",
        confirmButtonColor: "#2BA54B",
        buttonsStyling: true,
        customClass: {
          confirmButton: "primary-button",
        },
      }).then((response) => {
        if (response.isConfirmed) {
          setStep(3);
        }
      });
    } catch (error: any) {
      Swal.fire({
        text: error.response.data.message,
        icon: "error",
        confirmButtonText: "oke",
        confirmButtonColor: "#DB3726",
        buttonsStyling: true,
        customClass: {
          confirmButton: "danger-button",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "companyEmail") {
      setVerifyEmail(value);
    }
  };

  return (
    <AuthLayout>
      {step === 1 ? (
        <AuthSection
          classname="gap-3"
          headingAuth="Daftar Admin Perusahaan"
          subHeadingAuth="Kami perlu verifikasi manual akun admin perusahaan."
          formContent={
            <>
              <div className="flex flex-col items-start md:w-100 w-90">
                <Input
                  variant="primary"
                  onchange={handleOnChange}
                  value={form.companyName}
                  name="companyName"
                  placeholder="Masukan nama perusahaan"
                  type="text"
                  htmlFor="companyName"
                  label="Nama Perusahaan"
                />
                <p className="text-center text-black/65 mt-3 text-xs">
                  Nama resmi yang lengkap.
                </p>
              </div>
              <div className="flex flex-col items-start md:w-100 w-90">
                <Input
                  variant="primary"
                  onchange={handleOnChange}
                  value={form.companyEmail}
                  name="companyEmail"
                  placeholder="Masukan email perusahaan"
                  type="email"
                  htmlFor="companyEmail"
                  label="Email Perusahaan"
                />
                <p className="text-center text-black/65 mt-3 text-xs">
                  Email resmi yang lengkap.
                </p>
              </div>
            </>
          }
          footerContent={
            <div className="w-70">
              <Button
                onclick={() => setStep(2)}
                variant="primary"
                classname="py-3 w-full rounded-xl cursor-pointer">
                Selanjutnya
              </Button>
              <p className="text-center text-black/65 mt-3 md:text-sm text-xs">
                sudah punya aku?{" "}
                <span
                  className="text-[#0B5C37] cursor-pointer"
                  onClick={() => navigate("/auth/company-admin/login")}>
                  masuk disini
                </span>
              </p>
            </div>
          }
        />
      ) : step === 2 ? (
        <AuthSection
          classname="gap-3"
          headingAuth="Daftar Admin Perusahaan"
          subHeadingAuth="Kami perlu verifikasi manual akun perusahaan"
          formContent={
            <>
              <div className="md:w-100 w-90">
                <Input
                  variant="primary"
                  onchange={handleOnChange}
                  value={form.picName}
                  name="picName"
                  placeholder="Masukan nama PIC"
                  type="text"
                  htmlFor="picName"
                  label="Nama PIC"
                />
              </div>
              <div className="md:w-100 w-90">
                <Input
                  variant="primary"
                  onchange={handleOnChange}
                  value={form.picNo}
                  name="picNo"
                  placeholder="Masukan nomor PIC"
                  type="number"
                  htmlFor="picNo"
                  label="Nomor PIC"
                />
                <span className="text-gray-400 text-xs">
                  Nomor Whatsapp Yang Aktif
                </span>
              </div>
              <div className="md:w-100 w-90">
                <Input
                  variant="primary"
                  onchange={handleOnChange}
                  value={form.password}
                  name="password"
                  placeholder="Kata sandi"
                  tooglePassword={() => setShowingPassword(!showingPassword)}
                  showPassword={showingPassword}
                  type={`${showingPassword ? "text" : "password"}`}
                  htmlFor="password"
                  label="Kata sandi"
                />
              </div>
              <div className="md:w-100 w-90">
                <Input
                  variant="primary"
                  onchange={handleOnChange}
                  value={form.confirmPassword}
                  name="confirmPassword"
                  placeholder="Konfirmasi kata sandi"
                  tooglePassword={() => setShowingPassword(!showingPassword)}
                  showPassword={showingPassword}
                  type={`${showingPassword ? "text" : "password"}`}
                  htmlFor="confirmPassword"
                />
              </div>
            </>
          }
          footerContent={
            <div className="w-80">
              {isLoading ? (
                <Button
                  variant="primary"
                  classname="py-3 w-full rounded-xl cursor-pointer flex items-center justify-center">
                  <Icon icon="line-md:loading-loop" width="24" height="24" />
                </Button>
              ) : (
                <Button
                  onclick={handleRegister}
                  variant="primary"
                  classname="py-3 w-full rounded-xl cursor-pointer">
                  Daftar
                </Button>
              )}
              <p className="text-center text-black/65 mt-3 md:text-sm text-xs">
                sudah punya aku?{" "}
                <span
                  className="text-[#0B5C37] cursor-pointer"
                  onClick={() => navigate("/auth/company-admin/login")}>
                  masuk disini
                </span>
              </p>
            </div>
          }
        />
      ) : step === 3 ? (
        <AuthSection
          classname="gap-3"
          headingAuth="Permintaan Anda Sedang Ditinjau"
          subHeadingAuth={
            <>
              <p className="text-center font-light font-inter text-[#282222]">
                Terima kasih telah mendaftar. Kami akan menghubungi{" "}
                <span className="font-medium underline">{verifyEmail}</span>{" "}
                dalam 1x24 <br /> jam untuk verifikasi manual oleh tim Super
                Admin.
              </p>
            </>
          }
          formContent={
            <div className="relative flex justify-center">
              {!isLoading && (
                <div className="absolute inset-0 flex justify-center items-center">
                  <Icon icon="line-md:loading-loop" width="50" height="50" />
                </div>
              )}

              <iframe
                width="350"
                height="350"
                src="https://lottie.host/embed/a21bfb0a-9614-44ae-8570-4e8ccc51c538/lJq53o4oER.lottie"
                onLoad={() => setIsLoading(true)}></iframe>
            </div>
          }
          footerContent={
            <>
              <a href="#" className="underline text-[#000000A6] text-sm">
                Hubungi Tim Dukungan Teknis
              </a>
            </>
          }
        />
      ) : (
        ""
      )}
    </AuthLayout>
  );
};

export default CompanyRegisterPage;
