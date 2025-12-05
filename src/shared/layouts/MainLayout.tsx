import Navbar from "../components/partials/Navbar";
import Sidebar from "../components/partials/Sidebar";
import type { MainLayoutProps } from "../types/type";

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex bg-white h-screen">
      <Sidebar />
      <div className="flex flex-col w-screen h-full">
        <Navbar />
        <div className="h-screen overflow-auto">
        {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
