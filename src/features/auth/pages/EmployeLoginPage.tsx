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
import Swal from "sweetalert2";

const EmployeLoginPage = () => {
  const navigate = useNavigate();
  const [showingPassword, setShowingPassword] = useState(false);
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
    setIsLoading(true);
    try {
      const res = await authLoginApi(form.username, form.password);
      const token = res.access_token;
      const expiresIn = res.expires_in;

      if (res.user.role !== "employee") {
        Swal.fire({
          text: "akun tidak memiliki akses",
          icon: "warning",
          confirmButtonText: "oke",
          confirmButtonColor: "#2BA54B",
          buttonsStyling: true,
          customClass: {
            confirmButton: "primary-button",
          },
        });
        return;
      }

      if (token) {
        Swal.fire({
          text: "login berhasil",
          icon: "success",
          confirmButtonText: "oke",
          confirmButtonColor: "#2BA54B",
          buttonsStyling: true,
          customClass: {
            confirmButton: "primary-button",
          },
        }).then((response) => {
          if (response.isConfirmed) {
            setCookie("accesstoken", token, expiresIn);
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
      if (role === "employee") {
        navigate("/chat");
      }
    }
  }, []);
  return (
    <AuthLayout>
      <AuthSection
        classname="gap-1"
        headingAuth="Selamat Datang Kembali"
        subHeadingAuth="Masuk ke akun SmartAI anda"
        subabHeading="Silakan gunakan kredensial yang telah diberikan oleh Admin Anda."
        formContent={
          <div className="flex flex-col gap-4 md:w-100 w-90">
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
                tooglePassword={() => setShowingPassword(!showingPassword)}
                showPassword={showingPassword}
                type={`${showingPassword ? "text" : "password"}`}
              />
              <span className="text-[#0B5C37] text-xs cursor-pointer">
                Lupa kata sandi? Hubungi admin perusahaan
              </span>
            </div>
          </div>
        }
        footerContent={
          <div className="w-80">
            {isLoading ? (
              <Button
                classname="py-3 w-full flex items-center justify-center"
                variant="primary">
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
