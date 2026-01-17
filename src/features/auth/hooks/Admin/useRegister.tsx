import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { authCompanyRegisterApi } from "../../services/authApis";
import Swal from "sweetalert2";

export const useRegister = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const stepParams = Number(searchParams.get("step")) || 1;
  const [step, setStep] = useState(stepParams);
  const emailParams = searchParams.get("verifyEmail") ?? "";
  const [verifyEmail, setVerifyEmail] = useState(emailParams);
  const [showingPassword, setShowingPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    companyName: "",
    companyEmail: "",
    picName: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setSearchParams({ verifyEmail: String(verifyEmail), step: String(step) });
  }, [step, verifyEmail]);

  const handleRegister = async () => {
    setIsLoading(true);
    try {
      await authCompanyRegisterApi(
        form.picName,
        form.companyEmail,
        form.password,
        form.companyName
      );
      Swal.fire({
        text: "register berhasil",
        icon: "success",
        confirmButtonText: "oke",
        confirmButtonColor: "#2BA54B",
        buttonsStyling: true,
        customClass: {
          confirmButton: "primary-button",
        },
      }).then((response) => {
        if (response.isConfirmed) {
          setStep(3);
        }
      });
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

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "companyEmail") {
      setVerifyEmail(value);
    }
  };

  return {
    step,
    setStep,
    verifyEmail,
    showingPassword,
    setShowingPassword,
    isLoading,
    handleOnChange,
    handleRegister,
    form,
    navigate,
    setIsLoading
  };
};
