import { Eye, EyeOff, SquarePen } from "lucide-react";
import MainLayout from "../../../../../shared/layouts/MainLayout";
import TableCompanyProfile from "../../../components/admin/TableCompanyProfile";
import { useEffect, useState } from "react";

const CompanyProfilePage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  useEffect(() => {
    setPassword("asdadsasdsad");
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
                icon={<SquarePen color="#0B5C37" size={22} />}
                label="Nama Admin"
                value="Jhondoe"
              />
              <TableCompanyProfile
                label="Email Admin"
                value="Jhon.d@cemerlang.com"
              />
              <TableCompanyProfile
                label="Nama Perusahaan"
                value="PT Cemerlang Jaya"
              />
              <TableCompanyProfile label="Email" value="info@cemerlang.com" />
              <TableCompanyProfile
                label="Alamat Perusahaan"
                value="Jalan Cendrawasih No. 25, RT 03/RW 05, Kelurahan Mulyorejo, Kecamatan Sukomanunggal, Kota Surabaya, Jawa Timur, 60112"
                icon={<SquarePen color="#0B5C37" size={22} />}
              />
              <TableCompanyProfile label="Logo Perusahaan" />
            </div>
            <div className="border-t border-r border-l border-gray-300">
              <TableCompanyProfile
                label="Password"
                value={
                  <div className="flex items-center gap-3">
                    {showPassword ? password : "*".repeat(password.length)}
                    <button
                      className="cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <Eye size={15} /> : <EyeOff size={15} />}
                    </button>
                  </div>
                }
                icon={<SquarePen color="#0B5C37" size={22} />}
              />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CompanyProfilePage;
