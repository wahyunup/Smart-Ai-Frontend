import { useEffect, useState } from "react";
import {
  CompanyInformationApi,
  EditCompanyInformationApi,
} from "../../../services/admin/CompanyProfile";
import Swal from "sweetalert2";

export const useCompanyProfile = () => {
  const [password, setPassword] = useState("");
  const [editPassword, setEditPassword] = useState<boolean>(false);
  const [editNamaAdmin, setEditNamaAdmin] = useState<boolean>(false);
  const [editEmailCompany, setEditEmailCompany] = useState<boolean>(false);
  const [editPhotoProfile, setEditPhotoProfile] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewPassword, setPreviewPassword] = useState<boolean>(false);
  const [editPreviewImage, setEditPreviewImage] = useState<string | null>(null);
  const [datas, setDatas] = useState({
    address: "",
    admin_email: "",
    admin_name: "",
    company_email: "",
    name: "",
  });
  const [value, setValue] = useState({
    adminName: "",
    companyAddress: "",
    password: "",
    imageProfile: null as File | null,
  });

  const handleEditProfile = async () => {
    try {
      await EditCompanyInformationApi(
        value.adminName,
        value.companyAddress,
        value.imageProfile,
        value.password
      );
      Swal.fire({
        titleText: "Pembaruan profil berhasil",
        text: "Mohon lakukan login ulang untuk memastikan perubahan diterapkan",
        icon: "success",
        confirmButtonText: "oke",
        confirmButtonColor: "#2BA54B",
        buttonsStyling: true,
        customClass: {
          confirmButton: "primary-button",
        },
      }).then((response) => {
        if (response.isConfirmed) {
          setEditEmailCompany(false);
          setEditNamaAdmin(false);
          setEditPassword(false);
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
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name, files } = e.target;
    const max_size = 200 * 1024;
    if (name === "imageProfile" && files) {
      if (files[0].size > max_size) {
        Swal.fire({
          icon: "warning",
          text: "file lebih dari 200kb",
        });
        return;
      }
      setValue((prev) => ({
        ...prev,
        imageProfile: files[0],
      }));

      setEditPreviewImage(URL.createObjectURL(files[0]));
      setEditPhotoProfile(true);
    } else {
      setValue((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    const fetchInformationCompany = async () => {
      try {
        const res = await CompanyInformationApi();

        setDatas({
          address: res.address,
          admin_email: res.admin_email,
          admin_name: res.admin_name,
          company_email: res.company_email,
          name: res.name,
        });
        setPreviewImage(res.logo_s3_path);
      } catch (error) {
        console.log(error);
      }
    };
    fetchInformationCompany();
  }, [editPassword, editEmailCompany, editNamaAdmin, value.imageProfile]);

  useEffect(() => {
    setPassword("kepo yaa");
  }, []);

  return {password, setPassword,editPassword,setEditPassword,editNamaAdmin,setEditNamaAdmin,editEmailCompany,setEditEmailCompany,editPhotoProfile,setEditPhotoProfile,previewImage,editPreviewImage,setEditPreviewImage,datas,value,setValue,previewPassword,setPreviewPassword,handleEditProfile,handleOnChange};
};
