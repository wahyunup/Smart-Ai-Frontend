import { SquarePen, X } from "lucide-react";
import MainLayout from "../../../../../shared/layouts/MainLayout";
import TableCompanyProfile from "../../../components/admin/TableCompanyProfile";
import Button from "../../../../../shared/components/ui/Button";
import React, { useEffect, useState } from "react";
import mascot from "../../../../../assets/icons/SmartAI-2.png";
import Input from "../../../../../shared/components/ui/Input";
import {
  getSetting,
  updateProfile,
} from "../../../services/superadmin/Setting";
import Swal from "sweetalert2";

const SettingsPage = () => {
  const [previewPassword, setPreviewPassword] = useState(false);
  const [edit, setEdit] = useState({
    Email: false,
    Name: false,
    Username: false,
    Password: false,
  });
  const [value, setValue] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    const fetchSetting = async () => {
      try {
        const res = await getSetting();
        setValue({
          email: res.email,
          name: res.name,
          username: res.username,
          password: "",
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchSetting();
  }, []);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await updateProfile(
        value.name,
        value.username,
        value.email,
        value.password
      );
      console.log(res);
      
      if (res) {
        Swal.fire({
          text: "profil berhasil diperbarui",
          icon: "success",
          confirmButtonText: "oke",
          confirmButtonColor: "#2BA54B",
          buttonsStyling: true,
          customClass: {
            confirmButton: "primary-button",
          },
        });
      }
    } catch (error:any) {
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
      setEdit({
        Email: false,
        Name: false,
        Password: false,
        Username: false,
      });
    }
  };

  return (
    <MainLayout>
      <div className="p-10">
        <div className="flex flex-col gap-8">
          <h1 className="2xl:text-3xl md:text-xl font-semibold">
            Pengaturan Akun
          </h1>
          <div className="flex flex-col gap-8 border px-6 py-10 rounded-2xl">
            <div className="flex flex-col gap-2">
              <h2 className="2xl:text-2xl font-semibold">Informasi Akun</h2>
            </div>
            <div className="flex w-full gap-5">
              <div className="w-30 h-30">
                <img src={mascot} className=" w-full" alt="" />
              </div>
              <div className="flex flex-col gap-5 w-full">
                <div>
                  <TableCompanyProfile
                    label="Nama"
                    value={
                      edit.Name ? (
                        <Input
                          name="name"
                          onchange={handleOnChange}
                          value={value.name}
                          placeholder="input nama admin"
                          classname="border rounded-xl px-2"
                        />
                      ) : (
                        value.name
                      )
                    }
                    icon={
                      edit.Name ? (
                        <div className="flex items-center gap-3">
                          <Button classname="px-5 py-2" onclick={handleSubmit}>
                            submit
                          </Button>
                          <X
                            className="text-red-700"
                            onClick={() =>
                              setEdit({
                                Name: false,
                                Email: false,
                                Password: false,
                                Username: false,
                              })
                            }
                            size={22}
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
                          color="#0B5C37"
                          size={22}
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
                          placeholder="input username admin"
                          classname="border rounded-xl px-2"
                        />
                      ) : (
                        value.username
                      )
                    }
                    icon={
                      edit.Username ? (
                        <div className="flex items-center gap-3">
                          <Button classname="px-5 py-2" onclick={handleSubmit}>
                            submit
                          </Button>
                          <X
                            className="text-red-700"
                            onClick={() =>
                              setEdit({
                                Name: false,
                                Email: false,
                                Password: false,
                                Username: false,
                              })
                            }
                            size={22}
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
                          color="#0B5C37"
                          size={22}
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
                          placeholder="input email admin"
                          classname="border rounded-xl px-2"
                        />
                      ) : (
                        value.email
                      )
                    }
                    icon={
                      edit.Email ? (
                        <div className="flex items-center gap-3">
                          <Button classname="px-5 py-2" onclick={handleSubmit}>
                            submit
                          </Button>
                          <X
                            className="text-red-700"
                            onClick={() =>
                              setEdit({
                                Name: false,
                                Email: false,
                                Password: false,
                                Username: false,
                              })
                            }
                            size={22}
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
                          placeholder="ubah password"
                          classname="border rounded-xl px-2"
                        />
                      ) : (
                        "*".repeat(8)
                      )
                    }
                    icon={
                      edit.Password ? (
                        <div className="flex items-center gap-3">
                          <Button classname="px-5 py-2" onclick={handleSubmit}>
                            submit
                          </Button>
                          <X
                            className="text-red-700"
                            onClick={() =>
                              setEdit({
                                Name: false,
                                Email: false,
                                Password: false,
                                Username: false,
                              })
                            }
                            size={22}
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
        </div>
      </div>
    </MainLayout>
  );
};
export default SettingsPage;
