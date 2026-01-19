import { SquarePen, X } from "lucide-react";
import MainLayout from "../../../../../shared/layouts/MainLayout";
import TableCompanyProfile from "../../../components/admin/TableCompanyProfile";
import Input from "../../../../../shared/components/ui/Input";
import Button from "../../../../../shared/components/ui/Button";
import { useCompanyProfile } from "../../../hooks";
const CompanyProfilePage = () => {
  const {
    datas,
    editEmailCompany,
    editNamaAdmin,
    editPhotoProfile,
    previewImage,
    editPreviewImage,
    handleEditProfile,
    handleOnChange,
    value,
    editPassword,
    password,
    previewPassword,
    setEditEmailCompany,
    setEditNamaAdmin,
    setEditPassword,
    setEditPhotoProfile,
    setEditPreviewImage,
    setPreviewPassword,
  } = useCompanyProfile();
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
              <TableCompanyProfile label="Email" value={datas.company_email} />
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
                      tooglePassword={() =>
                        setPreviewPassword(!previewPassword)
                      }
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
