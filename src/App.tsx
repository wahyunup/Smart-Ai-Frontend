import "./App.css";
import { Route, Routes } from "react-router";
import {
  AddDocument,
  AdminDashboardPage,
  AiChatPage,
  ChatLogPage,
  CompanyProfilePage,
  ManageDocumentsPage,
  ManageStaffPage,
} from "./features/dashboard";
import {
  AdminLoginPage,
  AdminCompanyLoginPage,
  CompanyRegisterPage,
  EmployeLoginPage,
  VerifiedAccountPage,
} from "./features/auth";
import { HomePage } from "./features/home";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/auth">
          <Route path="company-employe/login" element={<EmployeLoginPage />} />
          <Route
            path="company-admin/login"
            element={<AdminCompanyLoginPage />}
          />
          <Route
            path="company-admin/register"
            element={<CompanyRegisterPage />}
          />
          <Route path="admin/login" element={<AdminLoginPage />} />
          <Route path="account-verified" element={<VerifiedAccountPage />} />
        </Route>

        <Route path="/admin">
          <Route path="dashboard" element={<AdminDashboardPage />} />

          <Route path="manage-documents">
            <Route index element={<ManageDocumentsPage />} />
            <Route path="create" element={<AddDocument/>}/>
            <Route path="edit" element={<AddDocument/>}/>
          </Route>

          <Route path="chat-log" element={<ChatLogPage />} />
          <Route path="manage-staff" element={<ManageStaffPage />} />
          <Route path="company-profile" element={<CompanyProfilePage />} />
        </Route>

        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<AiChatPage />} />
      </Routes>
    </div>
  );
}

export default App;
