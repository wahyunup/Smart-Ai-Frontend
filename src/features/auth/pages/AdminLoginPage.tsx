import { useEffect, useState } from "react";
import Button from "../../../shared/components/ui/Button";
import Input from "../../../shared/components/ui/Input";
import AuthLayout from "../../../shared/layouts/AuthLayout";
import AuthSection from "../components/AuthSection";
import { authLoginApi } from "../services/authApis";
import { Icon } from "@iconify/react";
import { getCookie, setCookie } from "../../../shared/utils/Cookies";
import { useNavigate } from "react-router-dom";

const AdminLoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
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
    setIsLoading(true);
    try {
      const res = await authLoginApi(form.username, form.password);
      const accessToken = res.access_token;
      const expiresIn = res.expires_in;
      if(accessToken) {
        setCookie("accesstoken", accessToken, expiresIn);
        alert("login berhasil");
        window.location.reload()
      }
    } catch (error: any) {
      alert(error.response.data.detail[0].msg);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = getCookie("accesstoken");
    if (token) {
      navigate("/admin/dashboard");
    }
  }, []);

  return (
    <AuthLayout>
      <AuthSection
        classname=""
        headingAuth="Selamat Datang Kembali"
        subHeadingAuth="Masuk ke akun SmartAI sebagai Super Admin."
        formContent={
          <div className="flex flex-col gap-2 w-100">
            <Input
            variant="primary"
              onchange={handleOnChange}
              value={form.username}
              name="username"
              placeholder="masukan username"
              type="text"
              htmlFor="username"
              label="Username"
            />
            <Input
            variant="primary"
              onchange={handleOnChange}
              value={form.password}
              name="password"
              placeholder="masukan kata sandi"
              type="password"
              htmlFor="password"
              label="Kata Sandi"
            />
            <p className="cursor-pointer text-[#3BC152] text-xs text-start">
              Lupa kata sandi?
            </p>
          </div>
        }
        footerContent={
          <>
            {isLoading ? (
              <Button
                classname="w-80 py-3  flex items-center justify-center"
                variant="primary">
                <Icon icon="line-md:loading-loop" width="24" height="24" />
              </Button>
            ) : (
              <Button
                classname="w-80 py-3"
                variant="primary"
                onclick={handleLogin}>
                Masuk
              </Button>
            )}
          </>
        }></AuthSection>
    </AuthLayout>
  );
};

export default AdminLoginPage;
