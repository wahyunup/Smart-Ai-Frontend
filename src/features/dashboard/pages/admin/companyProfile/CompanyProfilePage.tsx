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
  const [previewImage, setPreviewImage] = useState<string | null>(null);
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
        text: "profile berhasil diedit",
        icon: "success",
        confirmButtonText: "oke",
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
      });
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name, files } = e.target;
    if (name === "imageProfile" && files) {
      setValue((prev) => ({
        ...prev,
        imageProfile: files[0],
      }));
      setEditPreviewImage(URL.createObjectURL(files[0]));
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
        console.log(res);
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
        <p className="text-2xl">Profile Perusahaan</p>
        <div className="flex gap-10 mt-10">
          <div className="flex flex-col gap-5 w-50 items-start">
            <button className="cursor-pointer">Informasi Akun</button>
            <button className="cursor-pointer">Tampilan & Tema</button>
          </div>

          <div className="w-full flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <h1 className="text-xl font-medium">Informasi Akun</h1>
              <p className="text-base">informasi Dasar</p>
            </div>
            <div className="flex flex-col border-t border-r border-l border-gray-300">
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
                label="Email Admin"
                value={datas.admin_email}
              />
              <TableCompanyProfile label="Nama Perusahaan" value={datas.name} />
              <TableCompanyProfile label="Email" value={datas.company_email} />
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
              />
            </div>
            <div className="border-t border-r border-l border-gray-300">
              <TableCompanyProfile
                label="Password"
                value={
                  editPassword ? (
                    <Input
                      name="password"
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
