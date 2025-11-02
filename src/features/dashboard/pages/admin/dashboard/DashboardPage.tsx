import { useEffect } from "react";
import { getCookie } from "../../../../../shared/utils/Cookies";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../../../../shared/layouts/MainLayout";

const AdminDashboard = () => {
const navigate = useNavigate()

  useEffect(() => {
    const token = getCookie("accesstoken")
    if (token) {
      navigate("/admin/dashboard")
    } else if (!token) {
      navigate("/")
    }
  },[navigate])

  return (
    <MainLayout>
      <div className="p-10">
        <p>Kelola Dokument</p>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
