import { useEffect, useState } from "react";
import {
  CompanyByIdApi,
  CreateCompanyApi,
  UpdateCompanyApi,
} from "../../../services/superadmin/ManageCompany";
import Swal from "sweetalert2";
import { formatDateBasic } from "../../../../../shared/utils/FormatDate";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export const useCreateCompany = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const id = Number(params.id);
  const [dogglePassword, setDogglePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isEditPage = location.pathname.startsWith(
    "/superadmin/manage-company/edit"
  );
  const [previewImage, setPreviewImage] = useState<string>();

  const [form, setForm] = useState({
    companyName: "",
    emailCompany: "",
    adminName: "",
    address: "",
    password: "",
    is_active: false,
    profile_picture_file: null as File | null,
  });

  const [placeholder, setPlaceholder] = useState({
    companyName: "",
    emailCompany: "",
    adminName: "",
    address: "",
    code: "",
    subscription_plan: "",
    picPhoneNumber: "",
    joinDate: "",
    is_active: false,
    profile_picture_file: null as File | null,
  });

  const handleCancle = () => {
    setForm({
      companyName: "",
      emailCompany: "",
      address: "",
      adminName: "",
      password: "",
      profile_picture_file: null,
      is_active: false,
    });
  };

  const fetchCompanyById = async () => {
    if (id) {
      try {
        const res = await CompanyByIdApi(id);
        const convertDate = formatDateBasic(res.company_created_at);
        setPlaceholder({
          companyName: res.company_name,
          emailCompany: res.company_email,
          code: res.company_code,
          picPhoneNumber: res.company_pic_phone_number,
          subscription_plan: res.subscription_plan,
          address: res.company_address,
          adminName: res.admin_name,
          joinDate: convertDate,
          is_active: res.company_is_active,
          profile_picture_file: res.admin_profile_picture_url,
        });
        setPreviewImage(res.admin_profile_picture_url);
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
      }
    }
  };

  useEffect(() => {
    fetchCompanyById();
  }, [id]);

  const handleSumbit = async () => {
    setIsLoading(true);
    try {
      if (isEditPage) {
        await UpdateCompanyApi(
          id,
          form.companyName,
          form.emailCompany,
          form.address,
          form.adminName,
          form.is_active,
          form.profile_picture_file
        );
        Swal.fire({
          text: "edit perusahaan berhasil",
          icon: "success",
          confirmButtonText: "oke",
          confirmButtonColor: "#2BA54B",
          buttonsStyling: true,
          customClass: {
            confirmButton: "primary-button",
          },
        }).then((response) => {
          if (response.isConfirmed) {
            navigate("/superadmin/manage-company");
          }
        });
      } else {
        await CreateCompanyApi(
          form.companyName,
          form.emailCompany,
          form.adminName,
          form.address,
          form.password,
          form.is_active,
          form.profile_picture_file
        );
      }
      Swal.fire({
        text: "perusahaan berhasil dibuat",
        icon: "success",
        confirmButtonText: "oke",
        confirmButtonColor: "#2BA54B",
        buttonsStyling: true,
        customClass: {
          confirmButton: "primary-button",
        },
      }).then((response) => {
        if (response.isConfirmed) {
          navigate("/superadmin/manage-company");
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
      setForm({
        address: "",
        adminName: "",
        companyName: "",
        emailCompany: "",
        password: "",
        profile_picture_file: null,
        is_active: false,
      });
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type, files } = e.target;
    if (name === "profile_picture_file" && files) {
      setForm((prev) => ({
        ...prev,
        profile_picture_file: files[0],
      }));
      setPreviewImage(URL.createObjectURL(files[0]));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };
  return {
    form,
    placeholder,
    isEditPage,
    isLoading,
    handleOnChange,
    handleSumbit,
    handleCancle,
    previewImage,
    dogglePassword,
    setDogglePassword,
    navigate,
  };
};
