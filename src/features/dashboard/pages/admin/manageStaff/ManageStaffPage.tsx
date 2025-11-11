import { useEffect, useState } from "react";
import TableBody from "../../../../../shared/components/common/Table/TableBody";
import TableHeaderList from "../../../../../shared/components/common/Table/TableHeaderList";
import Button from "../../../../../shared/components/ui/Button";
import Input from "../../../../../shared/components/ui/Input";
import MainLayout from "../../../../../shared/layouts/MainLayout";
import { useNavigate } from "react-router-dom";
import { FilePlus, Search } from "lucide-react";
import { deleteStaff, getStaff } from "../../../services/ManageStaff";

const ManageStaffPage = () => {
  const [value, setValue] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(0);
  const [statusSelected, setStatusSelected] = useState("");
  const [roleSelected, setRoleSelected] = useState("");
  const getRandomColor = () => {
    const colors = [
      "#E57373",
      "#81C784",
      "#64B5F6",
      "#FFD54F",
      "#BA68C8",
      "#4DB6AC",
      "#F06292",
      "#90A4AE",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const fetchStaff = async () => {
    try {
      const res = await getStaff();
      setData(res);
      setTotalPage(1)
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, [page]);

  const fillterStaff = data.filter((chatLog: any) =>
    chatLog.username.toLowerCase().includes(value)
  );

  const handleNextPage = () => {
    if (page < totalPage) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleDelete = async (id: number) => {
    setIsLoading(id);
    try {
      const confirmation = confirm("yakin ingin menghapus staff");
      if (confirmation) {
        const res = await deleteStaff(id);
        alert("staff berhasil dihapus");
        console.log(res);
        fetchStaff();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(0);
    }
  };
  const handleEdit = (id:number) => {
    const userData = data.find((data:{id:number}) => data.id === id)
    navigate("/admin/manage-staff/edit", { state: { userData:  userData} });
  };
  return (
    <MainLayout>
      <div className="p-10 flex flex-col gap-10">
        <h1 className="text-3xl font-semibold">Kelola Staff</h1>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <h3 className="text-xl">Data Staff Perusahaan</h3>
              <Button
                onclick={() => navigate("/admin/manage-staff/create")}
                classname="px-5 flex justify-center py-3 items-center gap-2 rounded-xl"
                variant="secondary">
                Tambah <FilePlus size={20} />
              </Button>
            </div>
            <div className="flex items-center">
              <Input
                onchange={(e) => setValue(e.target.value)}
                variant="secondary"
                placeholder="Masukan nama dokumen atau kata kunci"
                name="search"
                type="text"
                htmlFor="search"
                icon={<Search color="#2F2F2F" />}
              />
              <div className="flex gap-3 pl-5">
                <select
                  className="outline px-5 rounded-2xl flex py-3"
                  id="status"
                  value={statusSelected}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setStatusSelected(e.target.value)
                  }>
                  <option value="Aktif">Aktif</option>
                  <option value="Tidak Aktif">Tidak Aktif</option>
                </select>
                <select
                  className="outline px-5 rounded-2xl flex"
                  id="status"
                  value={roleSelected}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setRoleSelected(e.target.value)
                  }>
                  <option value="Aktif">Semua</option>
                  <option value="Aktif">Employee</option>
                  <option value="Tidak Aktif">Admin</option>
                </select>
              </div>
              <div className="flex gap-5"></div>
            </div>
          </div>

          <div className="border border-[#B2B2B2] rounded-2xl overflow-hidden">
            <TableHeaderList classname="grid bg-[#E3F9E8] grid-cols-7">
              <span>ID</span>
              <span>Username</span>
              <span>Email</span>
              <span>Divisi</span>
              <span>Peran</span>
              <span>Status</span>
              <span>Aksi</span>
            </TableHeaderList>
            <TableBody
              isLoading={isLoading}
              data={fillterStaff}
              onclickDelete={handleDelete}
              nextPage={handleNextPage}
              prevPage={handlePrevPage}
              onclickEdit={handleEdit}
              classname="grid grid-cols-7"
              page={page}
              totalPage={totalPage}
              renderItem={(item) => {
                const bgColor = getRandomColor();
                return (
                  <>
                    <div className="flex items-center gap-5">
                      <div className="w-10 h-10 overflow-hidden rounded-full bg-gray-200">
                        {item.profile_picture_url === null ||
                        !item.profile_picture_url ? (
                          <div
                            style={{ backgroundColor: bgColor }}
                            className="h-full w-full text-white flex items-center justify-center">
                            {item.name.slice(0, 1)}
                          </div>
                        ) : (
                          <img src={item.profile_picture_url} alt="" />
                        )}
                      </div>
                      <span className="text-center">{item.id}</span>
                    </div>
                    <span className="text-center">{item.name}</span>
                    <span className="text-center">{item.email}</span>
                    <span className="text-center">{item.division_id}</span>
                    <span className="text-center">{item.role}</span>
                    {item.is_active ? (
                      <span className="text-center">Aktif</span>
                    ) : (
                      <span className="text-center">Tidak Aktif</span>
                    )}
                  </>
                );
              }}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ManageStaffPage;
