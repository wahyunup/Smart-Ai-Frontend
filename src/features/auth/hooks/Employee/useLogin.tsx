import { useEffect, useState } from "react";
import { getCookie, setCookie } from "../../../../shared/utils/Cookies";
import { decodeJwt } from "../../../../shared/utils/Decode";
import Swal from "sweetalert2";
import { authLoginEmployeeApi } from "../../services/authApis";
import { useNavigate } from "react-router-dom";

export const useLoginEmployee = () => {
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
      const res = await authLoginEmployeeApi(form.username, form.password);
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
  return {
    form,
    handleOnChange,
    handleLogin,
    isLoading,
    showingPassword,
    setShowingPassword,
  };
};
