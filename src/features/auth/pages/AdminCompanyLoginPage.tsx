import { useNavigate } from "react-router-dom";
import Input from "../../../shared/components/ui/Input";
import AuthLayout from "../../../shared/layouts/AuthLayout";
import AuthSection from "../components/AuthSection";
import Button from "../../../shared/components/ui/Button";
import { authLoginApi } from "../services/authApis";
import React, { useEffect, useState } from "react";
import { getCookie, setCookie } from "../../../shared/utils/Cookies";
import { Icon } from "@iconify/react";

const CompanyLoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
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

      setCookie("accesstoken", token, 3600);
      alert("login sukses");
      window.location.reload()
    } catch (error:any) {
      alert(error.response.data.detail[0].msg)
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = getCookie("accesstoken")
    if (token) {
      navigate("/admin/dashboard")
    }
  },[])
  return (
    <AuthLayout>
      <AuthSection
        classname="gap-1"
        headingAuth="Selamat Datang Kembali"
        subHeadingAuth="Masuk sebagai Administrator SmartAI."
        formContent={
          <div className="w-100 flex flex-col gap-2">
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
                type="password"
                htmlFor="password"
                value={form.password}
                onchange={handleOnChange}
              />
              <span className="text-[#3BC152] text-xs cursor-pointer">
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
            <p className="text-center text-black/65 mt-3 text-sm">
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
