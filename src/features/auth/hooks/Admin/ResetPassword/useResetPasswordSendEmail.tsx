import Swal from "sweetalert2";
import { resetPasswordEmail } from "../../../services/authApis";
import { useState } from "react";

export const useResetPasswordSendEmail = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsloading] = useState(false);

  const handleSubmit = async () => {
    setIsloading(true);
    try {
      await resetPasswordEmail(email);
      Swal.fire({
        titleText: "Email Terkirim!",
        text: "Silakan periksa kotak masuk email Anda untuk melanjutkan proses reset kata sandi.",
        icon: "success",
        confirmButtonText: "oke",
        confirmButtonColor: "#2BA54B",
        buttonsStyling: true,
        customClass: {
          confirmButton: "primary-button",
        },
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
    email,
    setEmail,
    isLoading,
    handleSubmit,
  };
};
