import Footer from "../components/partials/Footer";
import type { AuthLayoutProps } from "../types/type";

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div
      className="relative flex flex-col justify-between md:h-screen 2xl:h-full
                 bg-[#040B0E] overflow-hidden"
    >
      {/* ── ambient glow orbs — same as HomePage ── */}
      <div className="fixed top-[10%] -left-[5%] w-[400px] h-[400px] rounded-full bg-[#16FF6E]/[.04] blur-[80px] pointer-events-none z-0" />
      <div className="fixed top-[50%] -right-[10%] w-[500px] h-[500px] rounded-full bg-[#09E86E]/[.03] blur-[80px] pointer-events-none z-0" />
      <div className="fixed bottom-[10%] left-[35%] w-[300px] h-[300px] rounded-full bg-[#16FF6E]/[.03] blur-[80px] pointer-events-none z-0" />

      {/* content */}
      <div className="relative z-10 flex flex-col justify-between flex-1">
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default AuthLayout;
