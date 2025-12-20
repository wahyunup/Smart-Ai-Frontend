import { useNavigate } from "react-router-dom";
import Input from "../../../shared/components/ui/Input";
import AuthLayout from "../../../shared/layouts/AuthLayout";
import AuthSection from "../components/AuthSection";
import Button from "../../../shared/components/ui/Button";
import { authLoginApi } from "../services/authApis";
import React, { useEffect, useState } from "react";
import { getCookie, setCookie } from "../../../shared/utils/Cookies";
import { Icon } from "@iconify/react";
import { decodeJwt } from "../../../shared/utils/Decode";
import Swal from "sweetalert2";
const CompanyLoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showingPassword, setShowingPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const res = await authLoginApi(form.email, form.password);
      const token = res?.access_token;

      if (!token) {
        throw new Error("access tokennya kosong");
      }

      if (res.user.role !== "admin") {
        Swal.fire({
          text: "akun tidak memiliki akses",
          icon: "warning",
          confirmButtonText: "oke",
          confirmButtonColor: "#2BA54B",
          buttonsStyling: true,
          customClass: {
            confirmButton: "primary-button",
          },
        }).then((response) => {
          if (response.isConfirmed) {
            return;
          }
        });
      } else {
        Swal.fire({
          text: "login berhasil",
          icon: "success",
          confirmButtonText: "oke",
          confirmButtonColor: "#2BA54B",
          buttonsStyling: true,
          customClass: {
            confirmButton: "primary-button",
          },
        }).then(async (response) => {
          if (response.isConfirmed) {
            setCookie("accesstoken", token, 3600);
            window.location.reload();
          }
        });
      }
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

  useEffect(() => {
    const token = getCookie("accesstoken");
    if (token) {
      const decode = decodeJwt(token);
      const role = decode.role;
      if (role === "admin") {
        navigate("/admin/dashboard");
      }
    }
  }, []);
  return (
    <AuthLayout>
      <AuthSection
        classname="gap-1"
        headingAuth="Selamat Datang Kembali"
        subHeadingAuth="Masuk sebagai Administrator SmartAI."
        formContent={
          <div className="md:w-100 w-90 flex flex-col gap-2">
            <Input
              variant="primary"
              label="Email Perusahaan"
              name="email"
              type="email"
              htmlFor="email"
              placeholder="Masukan email perusahaan"
              value={form.email}
              onchange={handleOnChange}
            />
            <div>
              <Input
                variant="primary"
                label="Kata Sandi"
                name="password"
                placeholder="Masukan kata sandi"
                type={`${showingPassword ? "text" : "password"}`}
                htmlFor="password"
                tooglePassword={() => setShowingPassword(!showingPassword)}
                showPassword={showingPassword}
                value={form.password}
                onchange={handleOnChange}
              />
              <span
                onClick={() => navigate("/auth/reset-password-send-email")}
                className="text-[#0B5C37] text-xs cursor-pointer">
                Lupa kata sandi?
              </span>
            </div>
          </div>
        }
        footerContent={
          <div className="w-80">
            {isLoading ? (
              <Button
                classname="py-3 w-full flex justify-center"
                variant="primary">
                <Icon icon="line-md:loading-loop" width="24" height="24" />
              </Button>
            ) : (
              <Button
                onclick={handleLogin}
                variant="primary"
                classname="py-3 w-full">
                Masuk
              </Button>
            )}
            <p className="text-center text-black/65 mt-3 md:text-sm text-xs">
              Ingin Mendaftarkan Perusahaan Anda? Daftar Sebagai Admin
              Perusahaan
              <span
                className="text-[#3BC152] cursor-pointer ml-1"
                onClick={() => navigate("/auth/company-admin/register")}>
                di Sini
              </span>
            </p>
          </div>
        }
      />
    </AuthLayout>
  );
};

export default CompanyLoginPage;
