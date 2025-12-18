import { SquarePen, X } from "lucide-react";
import MainLayout from "../../../../../shared/layouts/MainLayout";
import TableCompanyProfile from "../../../components/admin/TableCompanyProfile";
import Button from "../../../../../shared/components/ui/Button";
import { useState } from "react";

const SettingsPage = () => {
  const [edit, setEdit] = useState({
    Email: false,
    Name: false,
    Username: false,
    Password: false,
  });


  return (
    <MainLayout>
      <div className="p-10">
        <div className="flex flex-col gap-8">
          <h1 className="text-3xl font-semibold">Pengaturan Akun</h1>
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold">Informasi Akun</h2>
            <p className="text-lg font-medium">Informasi Dasar</p>
          </div>
          <div className="flex flex-col gap-5">
            <div className="border-x border-t boder-gray-300">
              <TableCompanyProfile
                label="Nama"
                value=""
                icon={
                  edit.Name ? (
                    <div className="flex items-center gap-3">
                      <Button classname="px-5 py-2">submit</Button>
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
              <TableCompanyProfile label="Username" value="" icon={
                edit.Username ? (
                    <div className="flex items-center gap-3">
                      <Button classname="px-5 py-2">submit</Button>
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
              <TableCompanyProfile label="Email" value="" icon={edit.Email ? (
                    <div className="flex items-center gap-3">
                      <Button classname="px-5 py-2">submit</Button>
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
                  )}/>
            </div>
            <div className="border-x border-t boder-gray-300">
              <TableCompanyProfile label="Password" value="" icon={edit.Password ? (
                    <div className="flex items-center gap-3">
                      <Button classname="px-5 py-2">submit</Button>
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
                  )}/>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
export default SettingsPage;
