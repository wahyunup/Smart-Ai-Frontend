import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export const useCreateAdminCompany = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const [showPassword, setShowPassword] = useState(false);

  const isEditPage = location.pathname.startsWith(
    "/superadmin/manage-company/edit"
  );

  const isDetailPage = location.pathname.startsWith(
    "/superadmin/manage-admin-company/details"
  );

  const [form, setForm] = useState({
    companyName: "",
    fullname: "",
    emailAdmin: "",
    password: "",
  });

  const handleCancle = () => {
    setForm({
      companyName: "",
      fullname: "",
      emailAdmin: "",
      password: "",
    });
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return {
    isEditPage,
    isDetailPage,
    form,
    showPassword,
    navigate,
    handleCancle,
    handleOnChange,
    id,
    setShowPassword
  };
};
