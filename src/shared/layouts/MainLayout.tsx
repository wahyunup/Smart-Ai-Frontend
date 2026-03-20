import Navbar from "../components/partials/Navbar";
import Sidebar from "../components/partials/Sidebar";
import type { MainLayoutProps } from "../types/type";

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex bg-[#040B0E] h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
