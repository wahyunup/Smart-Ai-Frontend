import Input from "../../../shared/components/ui/Input";
import AuthSection from "../components/AuthSection";
import AuthLayout from "../../../shared/layouts/AuthLayout";
import Button from "../../../shared/components/ui/Button";
import { authLoginApi } from "../services/authApis";
import { useEffect, useState } from "react";
import { getCookie, setCookie } from "../../../shared/utils/Cookies";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { decodeJwt } from "../../../shared/utils/Decode";

const EmployeLoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    username: "",
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
    setIsLoading(true)
    try {
      const res = await authLoginApi(form.username, form.password);
      const token = res.access_token;
      const expiresIn = res.expires_in;
      if (token) {
        setCookie("accesstoken", token, expiresIn);
        alert("login berhasil");
        window.location.reload()
      }
    } catch (error:any) {
      alert(error.response.data.detail[0].msg)
    } finally {
      setIsLoading(false)
    }
  };

useEffect(() => {
    const token = getCookie("accesstoken")
    if (token) {
      const decode = decodeJwt(token)
      const role = decode.role
      if (role === "employee") {
        navigate("/chat")
      } else if (role === "admin") {
        navigate("/admin/dashboard")
      }
    } 
  },[])
  return (
    <AuthLayout>
      <AuthSection
        classname="gap-1"
        headingAuth="Selamat Datang Kembali"
        subHeadingAuth="Masuk ke akun SmartAI anda"
        subabHeading="Silakan gunakan kredensial yang telah diberikan oleh Admin Anda."
        formContent={
          <div className="flex flex-col gap-4 w-100">
            <Input
            variant="primary"
              onchange={handleOnChange}
              value={form.username}
              htmlFor={form.username}
              label="username"
              name="username"
              placeholder="Masukan username"
              type="text"
            />
            <div>
              <Input
              variant="primary"
                onchange={handleOnChange}
                value={form.password}
                name="password"
                htmlFor={form.password}
                label="Kata Sandi"
                placeholder="Masukan kata sandi"
                type="password"
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
              <Button classname="py-3 w-full flex items-center justify-center" variant="primary">
                <Icon icon="line-md:loading-loop" width="24" height="24" />
              </Button>
            ) : (
              <Button
                onclick={handleLogin}
                classname="py-3 w-full"
                variant="primary">
                Masuk
              </Button>
            )}
          </div>
        }
      />
    </AuthLayout>
  );
};

export default EmployeLoginPage;
