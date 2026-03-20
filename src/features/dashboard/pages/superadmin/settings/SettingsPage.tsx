import { SquarePen, X } from "lucide-react";
import MainLayout from "../../../../../shared/layouts/MainLayout";
import TableCompanyProfile from "../../../components/admin/TableCompanyProfile";
import Button from "../../../../../shared/components/ui/Button";
import mascot from "../../../../../assets/icons/SmartAI-2.png";
import Input from "../../../../../shared/components/ui/Input";
import { useSettings } from "../../../hooks";

export const SettingsPage = () => {
  const {
    edit,
    handleOnChange,
    handleSubmit,
    previewPassword,
    setPreviewPassword,
    setEdit,
    value,
  } = useSettings();

  return (
    <MainLayout>
      <div className="p-10">
        <div className="flex flex-col gap-8">
          {/* ── Page header ── */}
          <h1 className="font-syne font-extrabold text-white 2xl:text-3xl md:text-xl">
            Pengaturan Akun
          </h1>

          {/* ── Account card ── */}
          <div
            className="bg-[#0A1A20] border border-[#16FF6E]/[.07] rounded-[20px]
                        px-6 py-8 relative overflow-hidden"
          >
            {/* shimmer top */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#16FF6E]/20 to-transparent" />

            <h2 className="font-syne font-bold text-white 2xl:text-xl md:text-lg mb-6">
              Informasi Akun
            </h2>

            <div className="flex w-full gap-6">
              {/* Avatar */}
              <div className="w-28 h-28 shrink-0 rounded-[16px] overflow-hidden border border-[#16FF6E]/10 bg-[#0D1F27]">
                <img
                  src={mascot}
                  className="w-full h-full object-cover"
                  alt="mascot"
                />
              </div>

              {/* Fields */}
              <div className="flex flex-col gap-1 w-full">
                <TableCompanyProfile
                  label="Nama"
                  value={
                    edit.Name ? (
                      <Input
                        name="name"
                        onchange={handleOnChange}
                        value={value.name}
                        placeholder="Input nama admin"
                        variant="primary"
                        classname="flex-1"
                      />
                    ) : (
                      value.name
                    )
                  }
                  icon={
                    edit.Name ? (
                      <div className="flex items-center gap-2">
                        <Button
                          classname="px-4 py-1.5 rounded-[8px] text-sm"
                          onclick={handleSubmit}
                        >
                          Simpan
                        </Button>
                        <X
                          className="text-red-400 cursor-pointer hover:text-red-300 transition-colors duration-200"
                          onClick={() =>
                            setEdit({
                              Name: false,
                              Email: false,
                              Password: false,
                              Username: false,
                            })
                          }
                          size={20}
                        />
                      </div>
                    ) : (
                      <SquarePen
                        onClick={() =>
                          setEdit({
                            Email: false,
                            Name: true,
                            Password: false,
                            Username: false,
                          })
                        }
                        className="text-[#6B8C80] hover:text-[#16FF6E] cursor-pointer transition-colors duration-200"
                        size={18}
                      />
                    )
                  }
                />
                <TableCompanyProfile
                  label="Username"
                  value={
                    edit.Username ? (
                      <Input
                        name="username"
                        onchange={handleOnChange}
                        value={value.username}
                        placeholder="Input username admin"
                        variant="primary"
                        classname="flex-1"
                      />
                    ) : (
                      value.username
                    )
                  }
                  icon={
                    edit.Username ? (
                      <div className="flex items-center gap-2">
                        <Button
                          classname="px-4 py-1.5 rounded-[8px] text-sm"
                          onclick={handleSubmit}
                        >
                          Simpan
                        </Button>
                        <X
                          className="text-red-400 cursor-pointer hover:text-red-300 transition-colors duration-200"
                          onClick={() =>
                            setEdit({
                              Name: false,
                              Email: false,
                              Password: false,
                              Username: false,
                            })
                          }
                          size={20}
                        />
                      </div>
                    ) : (
                      <SquarePen
                        onClick={() =>
                          setEdit({
                            Email: false,
                            Name: false,
                            Password: false,
                            Username: true,
                          })
                        }
                        className="text-[#6B8C80] hover:text-[#16FF6E] cursor-pointer transition-colors duration-200"
                        size={18}
                      />
                    )
                  }
                />
                <TableCompanyProfile
                  label="Email"
                  value={
                    edit.Email ? (
                      <Input
                        name="email"
                        onchange={handleOnChange}
                        value={value.email}
                        placeholder="Input email admin"
                        variant="primary"
                        classname="flex-1"
                      />
                    ) : (
                      value.email
                    )
                  }
                  icon={
                    edit.Email ? (
                      <div className="flex items-center gap-2">
                        <Button
                          classname="px-4 py-1.5 rounded-[8px] text-sm"
                          onclick={handleSubmit}
                        >
                          Simpan
                        </Button>
                        <X
                          className="text-red-400 cursor-pointer hover:text-red-300 transition-colors duration-200"
                          onClick={() =>
                            setEdit({
                              Name: false,
                              Email: false,
                              Password: false,
                              Username: false,
                            })
                          }
                          size={20}
                        />
                      </div>
                    ) : (
                      <SquarePen
                        onClick={() =>
                          setEdit({
                            Email: true,
                            Name: false,
                            Password: false,
                            Username: false,
                          })
                        }
                        className="text-[#6B8C80] hover:text-[#16FF6E] cursor-pointer transition-colors duration-200"
                        size={18}
                      />
                    )
                  }
                />
                <TableCompanyProfile
                  label="Password"
                  value={
                    edit.Password ? (
                      <Input
                        showPassword={previewPassword}
                        tooglePassword={() =>
                          setPreviewPassword(!previewPassword)
                        }
                        name="password"
                        value={value.password}
                        type={previewPassword ? "text" : "password"}
                        onchange={handleOnChange}
                        placeholder="Ubah password"
                        variant="primary"
                        classname="flex-1"
                      />
                    ) : (
                      "*".repeat(8)
                    )
                  }
                  icon={
                    edit.Password ? (
                      <div className="flex items-center gap-2">
                        <Button
                          classname="px-4 py-1.5 rounded-[8px] text-sm"
                          onclick={handleSubmit}
                        >
                          Simpan
                        </Button>
                        <X
                          className="text-red-400 cursor-pointer hover:text-red-300 transition-colors duration-200"
                          onClick={() =>
                            setEdit({
                              Name: false,
                              Email: false,
                              Password: false,
                              Username: false,
                            })
                          }
                          size={20}
                        />
                      </div>
                    ) : (
                      <SquarePen
                        onClick={() =>
                          setEdit({
                            Email: false,
                            Name: false,
                            Password: true,
                            Username: false,
                          })
                        }
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
      </div>
    </MainLayout>
  );
};
