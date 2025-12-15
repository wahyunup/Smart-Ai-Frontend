import { useEffect, useState } from "react";
import Button from "../../../shared/components/ui/Button";
import Input from "../../../shared/components/ui/Input";
import AuthLayout from "../../../shared/layouts/AuthLayout";
import AuthSection from "../components/AuthSection";
import { authLoginApi } from "../services/authApis";
import { Icon } from "@iconify/react";
import {
  getCookie,
  removeCookie,
  setCookie,
} from "../../../shared/utils/Cookies";
import { useNavigate } from "react-router-dom";
import { decodeJwt } from "../../../shared/utils/Decode";
import Swal from "sweetalert2";

const AdminLoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showingPassword, setShowingPassword] = useState(false);

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

      if (res.user.role !== "super_admin") {
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
            removeCookie("accesstoken");
            navigate("/auth/admin/login");
            setForm({
              password: "",
              username: "",
            });
          }
        });
        return;
      }

      if (accessToken && res.user.role === "super_admin") {
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
            setCookie("accesstoken", accessToken, expiresIn);
            navigate("/superadmin/dashboard");
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
      } else if (role === "super_admin") {
        navigate("/superadmin/dashboard");
      }
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
              tooglePassword={() => setShowingPassword(!showingPassword)}
              showPassword={showingPassword}
              type={`${showingPassword ? "text" : "password"}`}
              name="password"
              placeholder="masukan kata sandi"
              htmlFor="password"
              label="Kata Sandi"
            />
            <p className="cursor-pointer text-[#0B5C37] text-xs text-start">
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
