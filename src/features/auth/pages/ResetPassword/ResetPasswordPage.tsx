import React, { useState } from "react";
import Input from "../../../../shared/components/ui/Input";
import AuthLayout from "../../../../shared/layouts/AuthLayout";
import AuthSection from "../../components/AuthSection";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../../services/authApis";
import Swal from "sweetalert2";
import Button from "../../../../shared/components/ui/Button";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const initTokenParams = searchParams.get("token") ?? "";
  const initEmailParams = searchParams.get("email") ?? "";
  const navigate = useNavigate();

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
    }
  };

  return (
    <AuthLayout>
      <AuthSection
        headingAuth="Reset Kata Sandi"
        subHeadingAuth="Buat kata sandi yang kuat dan beda dari kata sandi lamamu."
        formContent={
          <div className="md:w-100 w-90 flex flex-col">
            <Input
              variant="secondary"
              htmlFor="password"
              label="Kata Sandi Baru"
              labelLayout="block"
              name="password"
              onchange={handleOnChange}
              value={form.password}
              type={!isVisible.password ? "password" : "text"}
              showPassword={isVisible.password}
              tooglePassword={() =>
                setIsVisible({
                  password: !isVisible.password,
                  passwordConfirm: false,
                })
              }
            />
            <Input
              variant="secondary"
              htmlFor="passwordConfirm"
              label="Konfirmasi Kata Sandi"
              labelLayout="block"
              name="passwordConfirm"
              onchange={handleOnChange}
              value={form.passwordConfirm}
              type={!isVisible.passwordConfirm ? "password" : "text"}
              showPassword={isVisible.passwordConfirm}
              tooglePassword={() =>
                setIsVisible({
                  password: false,
                  passwordConfirm: !isVisible.passwordConfirm,
                })
              }
            />
          </div>
        }
        footerContent={
          <>
            <Button
              onclick={handleSubmitResetPassword}
              variant="primary"
              classname="py-3 w-80 mt-5">
              Reset Kata Sandi
            </Button>
          </>
        }
      />
    </AuthLayout>
  );
};

export default ResetPasswordPage;
