import Navbar from "../components/partials/Navbar";
import Sidebar from "../components/partials/Sidebar";
import type { MainLayoutProps } from "../types/type";

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex bg-white">
      <Sidebar />
      <div className="flex flex-col w-screen">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
