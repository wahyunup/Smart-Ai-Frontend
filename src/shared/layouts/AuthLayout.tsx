import Footer from "../components/partials/Footer"
import type { AuthLayoutProps } from "../types/type"

const AuthLayout = ({children}:AuthLayoutProps) => {
    return (
        <div className="bg-gradient-to-b from-[#E3F9E8] to-[#E6F9EB] flex flex-col bg-red justify-between md:h-screen 2xl:h-full">
        {children}
        <Footer/>
        </div>
    )
}

export default AuthLayout