import { SquarePen, X } from "lucide-react";
import MainLayout from "../../../../../shared/layouts/MainLayout";
import TableCompanyProfile from "../../../components/admin/TableCompanyProfile";
import Input from "../../../../../shared/components/ui/Input";
import Button from "../../../../../shared/components/ui/Button";
import { useCompanyProfile } from "../../../hooks";

export const CompanyProfilePage = () => {
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
        {/* ── Page header ── */}
        <h1 className="font-syne font-extrabold text-white 2xl:text-3xl md:text-2xl mb-8">
          Profile Perusahaan
        </h1>

        <div className="flex gap-8">
          {/* ── Account card ── */}
          <div
            className="relative w-full flex flex-col gap-5 p-8
                        bg-[#0A1A20] border border-[#16FF6E]/[.07]
                        rounded-[20px] overflow-hidden"
          >
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#16FF6E]/20 to-transparent" />

            <h2 className="font-syne font-bold text-white text-lg">
              Informasi Akun
            </h2>

            <div className="flex flex-col">
              {/* Nama Admin */}
              <TableCompanyProfile
                icon={
                  editNamaAdmin ? (
                    <div className="flex items-center gap-2">
                      <Button
                        onclick={handleEditProfile}
                        classname="px-4 py-1.5 rounded-[8px] text-sm"
                      >
                        Simpan
                      </Button>
                      <X
                        className="text-red-400 cursor-pointer hover:text-red-300 transition-colors duration-200"
                        onClick={() => setEditNamaAdmin(false)}
                        size={18}
                      />
                    </div>
                  ) : (
                    <SquarePen
                      onClick={() => setEditNamaAdmin(!editNamaAdmin)}
                      className="text-[#6B8C80] hover:text-[#16FF6E] cursor-pointer transition-colors duration-200"
                      size={18}
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
                      placeholder="Input nama admin"
                      variant="primary"
                      classname="flex-1"
                    />
                  ) : (
                    datas.admin_name
                  )
                }
              />

              {/* Email */}
              <TableCompanyProfile label="Email" value={datas.company_email} />

              {/* Nama Perusahaan */}
              <TableCompanyProfile label="Nama Perusahaan" value={datas.name} />

              {/* Alamat */}
              <TableCompanyProfile
                label="Alamat Perusahaan"
                value={
                  editEmailCompany ? (
                    <Input
                      onchange={handleOnChange}
                      name="companyAddress"
                      value={value.companyAddress}
                      placeholder="Input alamat"
                      variant="primary"
                      classname="flex-1"
                    />
                  ) : (
                    datas.address
                  )
                }
                icon={
                  editEmailCompany ? (
                    <div className="flex items-center gap-2">
                      <Button
                        onclick={handleEditProfile}
                        classname="px-4 py-1.5 rounded-[8px] text-sm"
                      >
                        Simpan
                      </Button>
                      <X
                        className="text-red-400 cursor-pointer hover:text-red-300 transition-colors duration-200"
                        onClick={() => setEditEmailCompany(false)}
                        size={18}
                      />
                    </div>
                  ) : (
                    <SquarePen
                      onClick={() => setEditEmailCompany(!editEmailCompany)}
                      className="text-[#6B8C80] hover:text-[#16FF6E] cursor-pointer transition-colors duration-200"
                      size={18}
                    />
                  )
                }
              />

              {/* Logo */}
              <TableCompanyProfile
                name="imageProfile"
                previewImage={previewImage}
                editPreviewImage={editPreviewImage}
                onchange={handleOnChange}
                label="Logo Perusahaan"
                icon={
                  editPhotoProfile ? (
                    <div className="flex items-center gap-2">
                      <Button
                        onclick={handleEditProfile}
                        classname="px-4 py-1.5 rounded-[8px] text-sm"
                      >
                        Simpan
                      </Button>
                      <X
                        className="text-red-400 cursor-pointer hover:text-red-300 transition-colors duration-200"
                        onClick={() => {
                          setEditPhotoProfile(false);
                          setEditPreviewImage(null);
                        }}
                        size={18}
                      />
                    </div>
                  ) : (
                    <SquarePen
                      onClick={() => setEditPhotoProfile(true)}
                      className="text-[#6B8C80] hover:text-[#16FF6E] cursor-pointer transition-colors duration-200"
                      size={18}
                    />
                  )
                }
              />

              {/* Password */}
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
                      placeholder="Ubah password"
                      variant="primary"
                      classname="flex-1"
                    />
                  ) : (
                    "*".repeat(password.length)
                  )
                }
                icon={
                  editPassword ? (
                    <div className="flex items-center gap-2">
                      <Button
                        onclick={handleEditProfile}
                        classname="px-4 py-1.5 rounded-[8px] text-sm"
                      >
                        Simpan
                      </Button>
                      <X
                        className="text-red-400 cursor-pointer hover:text-red-300 transition-colors duration-200"
                        onClick={() => setEditPassword(false)}
                        size={18}
                      />
                    </div>
                  ) : (
                    <SquarePen
                      onClick={() => setEditPassword(true)}
                      className="text-[#6B8C80] hover:text-[#16FF6E] cursor-pointer transition-colors duration-200"
                      size={18}
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
