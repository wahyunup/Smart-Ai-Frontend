import Sidebar from "../components/partials/Sidebar"
import type { MainLayoutProps } from "../types/type"

const MainLayout = ({children}:MainLayoutProps) => {
    return (
        <div className="flex">
        <Sidebar/>
        {children}
        </div>
    )
}

export default MainLayout