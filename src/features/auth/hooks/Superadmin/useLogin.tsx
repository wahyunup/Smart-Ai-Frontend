import { useEffect, useState } from "react";
import {
  getCookie,
  removeCookie,
  setCookie,
} from "../../../../shared/utils/Cookies";
import { decodeJwt } from "../../../../shared/utils/Decode";
import Swal from "sweetalert2";
import { authLoginSuperadminApi } from "../../services/authApis";
import { useNavigate } from "react-router-dom";

export const useLoginSuperadmin = () => {
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
      const res = await authLoginSuperadminApi(form.username, form.password);

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
  return {
    handleOnChange,
    form,
    showingPassword,
    setShowingPassword,
    isLoading,
    handleLogin,
  };
};
