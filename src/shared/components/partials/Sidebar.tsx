import { useSidebar } from "../../hooks/sidebar/useSidebar";
import Admin from "../common/Sidebars/Admin";
import Employee from "../common/Sidebars/Employee";
import Superadmin from "../common/Sidebars/Superadmin";

const Sidebar = () => {
  const { isLogin } = useSidebar();
  return (
    <>
      {isLogin === "admin" && <Admin />}
      {isLogin === "super_admin" && <Superadmin />}
      {isLogin === "employee" && <Employee />}
    </>
  );
};

export default Sidebar;
