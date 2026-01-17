import Swal from "sweetalert2";
import { resetPassword } from "../../../services/authApis";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const useResetPassword = () => {
  const [searchParams] = useSearchParams();
  const initTokenParams = searchParams.get("token") ?? "";
  const initEmailParams = searchParams.get("email") ?? "";
  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState(false);

  const [form, setForm] = useState({
    password: "",
    passwordConfirm: "",
  });

  const [isVisible, setIsVisible] = useState({
    password: false,
    passwordConfirm: false,
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitResetPassword = async () => {
    setIsloading(true);
    if (form.passwordConfirm !== form.password) {
      Swal.fire({
        text: "confirm password tidak sama",
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

    try {
      await resetPassword(initEmailParams, initTokenParams, form.password);
      Swal.fire({
        text: "Kata Sandi Berhasil Diperbarui!",
        icon: "success",
        confirmButtonText: "oke",
        confirmButtonColor: "#2BA54B",
        buttonsStyling: true,
        customClass: {
          confirmButton: "primary-button",
        },
      }).then(async (response) => {
        if (response.isConfirmed) {
          navigate("/auth/company-admin/login");
        }
      });
    } catch (error: any) {
      Swal.fire({
        titleText: error.response.data.message,
        text: error.response.data.details.errors[0],
        icon: "error",
        confirmButtonText: "oke",
        confirmButtonColor: "#DB3726",
        buttonsStyling: true,
        customClass: {
          confirmButton: "danger-button",
        },
      });
    } finally {
      setIsloading(false);
    }
  };
  return {
    handleOnChange,
    handleSubmitResetPassword,
    form,
    isVisible,
    setIsVisible,
    isLoading,
  };
};
