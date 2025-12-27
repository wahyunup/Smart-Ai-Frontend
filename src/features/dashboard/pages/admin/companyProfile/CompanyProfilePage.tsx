import { SquarePen, X } from "lucide-react";
import MainLayout from "../../../../../shared/layouts/MainLayout";
import TableCompanyProfile from "../../../components/admin/TableCompanyProfile";
import { useEffect, useState } from "react";
import Input from "../../../../../shared/components/ui/Input";
import Button from "../../../../../shared/components/ui/Button";
import {
  CompanyInformationApi,
  EditCompanyInformationApi,
} from "../../../services/admin/CompanyProfile";
import Swal from "sweetalert2";

const CompanyProfilePage = () => {
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
        titleText : "Pembaruan profil berhasil",
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
    const max_size = 200 * 1024
    if (name === "imageProfile" && files) {
      if(files[0].size > max_size) {
        Swal.fire({
          icon : "warning",
          text : "file lebih dari 200kb"
        })
        return
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
        console.log(res);

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
  return (
    <MainLayout>
      <div className="p-10">
        <p className="2xl:text-3xl md:text-2xl font-semibold">
          Profile Perusahaan
        </p>
        <div className="flex gap-10 2xl:mt-10 md:mt-5">
          <div className="w-full flex flex-col gap-5 p-8 bg-white shadow-2xl rounded-3xl">
            <div className="flex flex-col gap-1">
              <h1 className="text-xl font-medium">Informasi Akun</h1>
            </div>
            <div className="flex flex-col">
              <TableCompanyProfile              
                icon={
                  editNamaAdmin ? (
                    <div className="flex items-center gap-3">
                      <Button onclick={handleEditProfile} classname="px-5 py-2">
                        submit
                      </Button>
                      <X
                        className="text-red-700"
                        onClick={() => setEditNamaAdmin(false)}
                        size={22}
                      />
                    </div>
                  ) : (
                    <SquarePen
                      onClick={() => setEditNamaAdmin(!editNamaAdmin)}
                      color="#0B5C37"
                      size={22}
                    />
                  )
                }
                label="Nama Admin"
                value={
                  editNamaAdmin ? (
                    <Input
                      name="adminName"
                      onchange={handleOnChange}
                      value={value.adminName}
                      placeholder="input nama admin"
                      classname="border rounded-xl px-2"
                    />
                  ) : (
                    datas.admin_name
                  )
                }
              />
              <TableCompanyProfile
                label="Email"
                value={datas.company_email}
              />
              <TableCompanyProfile label="Nama Perusahaan" value={datas.name} />
              <TableCompanyProfile
                label="Alamat Perusahaan"
                value={
                  editEmailCompany ? (
                    <Input
                      onchange={handleOnChange}
                      name="companyAddress"
                      value={value.companyAddress}
                      placeholder="input alamat"
                      classname="border rounded-xl px-2"
                    />
                  ) : (
                    datas.address
                  )
                }
                icon={
                  editEmailCompany ? (
                    <div className="flex items-center gap-3">
                      <Button onclick={handleEditProfile} classname="px-5 py-2">
                        submit
                      </Button>
                      <X
                        className="text-red-700"
                        onClick={() => setEditEmailCompany(false)}
                        size={22}
                      />
                    </div>
                  ) : (
                    <SquarePen
                      onClick={() => setEditEmailCompany(!editEmailCompany)}
                      color="#0B5C37"
                      size={22}
                    />
                  )
                }
              />
              <TableCompanyProfile
                name="imageProfile"
                previewImage={previewImage}
                editPreviewImage={editPreviewImage}
                onchange={handleOnChange}
                label="Logo Perusahaan"
                icon={
                  editPhotoProfile ? (
                    <div className="flex items-center gap-3">
                      <Button onclick={handleEditProfile} classname="px-5 py-2">
                        submit
                      </Button>
                      <X
                        className="text-red-700"
                        onClick={() => {
                          setEditPhotoProfile(false);
                          setEditPreviewImage(null);
                        }}
                        size={22}
                      />
                    </div>
                  ) : (
                    <SquarePen
                      onClick={() => setEditPhotoProfile(true)}
                      color="#0B5C37"
                      size={22}
                    />
                  )
                }
              />
            </div>
            <div>
              <TableCompanyProfile
                label="Password"
                value={
                  editPassword ? (
                    <Input
                    showPassword={previewPassword}
                    tooglePassword={() => setPreviewPassword(!previewPassword)}
                      name="password"
                      type={previewPassword ? "text" : "password"}
                      value={value.password}
                      onchange={handleOnChange}
                      placeholder="ubah password"
                      classname="border rounded-xl px-2"
                    />
                  ) : (
                    "*".repeat(password.length)
                  )
                }
                icon={
                  editPassword ? (
                    <div className="flex items-center gap-3">
                      <Button onclick={handleEditProfile} classname="px-5 py-2">
                        submit
                      </Button>
                      <X
                        className="text-red-700"
                        onClick={() => setEditPassword(false)}
                        size={22}
                      />
                    </div>
                  ) : (
                    <SquarePen
                      onClick={() => setEditPassword(true)}
                      color="#0B5C37"
                      size={22}
                    />
                  )
                }
              />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CompanyProfilePage;
