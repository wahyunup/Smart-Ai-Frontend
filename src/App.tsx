import "./App.css";
import { Route, Routes } from "react-router";
import { AiChatPage } from "./features/dashboard";
import { AdminLoginPage, AuthorizePage, CompanyLoginPage, CompanyRegisterPage, EmployeLoginPage, EmployeRegisterPage } from "./features/auth";
import { HomePage } from "./features/home";


function App() {
  return (
    <div>
      <Routes>
        <Route path="/auth" >
          <Route path="authorization" element={<AuthorizePage />} />
          <Route path="employe/login" element={<EmployeLoginPage />} />
          <Route path="employe/register" element={<EmployeRegisterPage />} />
          <Route path="company/login" element={<CompanyLoginPage/>} />
          <Route path="company/register" element={<CompanyRegisterPage />} />
          <Route path="admin/login" element={<AdminLoginPage />} />
        </Route>
        
        <Route path="/" element={<HomePage/>} />
        <Route path="/chat" element={<AiChatPage />} />
      </Routes>
    </div>
  );
}

export default App;
