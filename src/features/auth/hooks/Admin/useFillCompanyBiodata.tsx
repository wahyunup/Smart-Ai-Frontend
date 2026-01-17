import Swal from "sweetalert2";
import { fillInfoCompanyApi } from "../../services/authApis";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useFillCompanyBiodata = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    company_email: "",
    admin_name: "",
    admin_email: "",
    logoCompany: null as File | null,
    admin_password: "",
    address: "",
    pic_phone_number: "",
  });

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await fillInfoCompanyApi(
        form.name,
        form.company_email,
        form.admin_name,
        form.admin_email,
        form.logoCompany,
        form.admin_password,
        form.address,
        form.pic_phone_number
      );

      Swal.fire({
        text: "Submit Berhasil",
        icon: "success",
      }).then((response) => {
        if (response.isConfirmed) {
          navigate("/admin/dashboard");
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setForm((prev) => ({ ...prev, logoCompany: file }));
    setPreviewImage(URL.createObjectURL(file));
  };
  return {
    handleTextChange,
    handleFileChange,
    handleSubmit,
    form,
    previewImage,
    isLoading,
  };
};
