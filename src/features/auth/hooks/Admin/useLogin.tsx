import { useEffect, useState } from "react";
import { getCookie, setCookie } from "../../../../shared/utils/Cookies";
import { decodeJwt } from "../../../../shared/utils/Decode";
import Swal from "sweetalert2";
import { authLoginApi } from "../../services/authApis";
import { useNavigate } from "react-router-dom";

export const useLoginAdmin = () => {
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
  return {
    form,
    isLoading,
    showingPassword,
    handleOnChange,
    handleLogin,
    setShowingPassword,
    navigate
  };
};
