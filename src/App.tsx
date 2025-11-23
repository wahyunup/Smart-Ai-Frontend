import "./App.css";
import { Route, Routes } from "react-router";
import {
  AddDocument,
  AddStaffPage,
  AdminDashboardPage,
  ChatLogDetailPage,
  ChatLogPage,
  CompanyProfilePage,
  SuperAdminLogAuditPage,
  ManageDocumentsPage,
  ManageStaffPage,
  SuperAdminDashboardPage,
  SuperAdminManageCompanyPage,
  SuperAdminManageAdminCompanyPage,
  SuperAdminSettingsPage,
  SubscriptionPage,
} from "./features/dashboard";
import {
  AdminLoginPage,
  AdminCompanyLoginPage,
  CompanyRegisterPage,
  EmployeLoginPage,
  VerifiedAccountPage,
} from "./features/auth";
import { HomePage } from "./features/home";
import { AiChatPage, AiConversationPage } from "./features/aiChat";
import NotFoundPage from "./shared/components/common/Fallback/NotFoundPage";
import SelectSubcriptionPage from "./features/dashboard/pages/admin/subscription/SelectSubcriptionPage";

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
            <Route path="create" element={<AddDocument />} />
            <Route path="edit" element={<AddDocument />} />
          </Route>

          <Route path="chat-log">
            <Route index element={<ChatLogPage />} />
            <Route
              path="detail/:conversationId"
              element={<ChatLogDetailPage />}
            />
          </Route>

          <Route path="manage-staff">
            <Route index element={<ManageStaffPage />} />
            <Route path="create" element={<AddStaffPage />} />
            <Route path="edit" element={<AddStaffPage />} />
          </Route>
          <Route path="company-profile" element={<CompanyProfilePage />} />
          <Route path="subcription">
            <Route index element={<SubscriptionPage />} />
            <Route path="select-sub" element={<SelectSubcriptionPage />} />
          </Route>
        </Route>

        <Route path="/superadmin">
          <Route path="dashboard" element={<SuperAdminDashboardPage />} />
          <Route path="log-audit" element={<SuperAdminLogAuditPage />} />
          <Route
            path="manage-company"
            element={<SuperAdminManageCompanyPage />}
          />
          <Route
            path="manage-admin-company"
            element={<SuperAdminManageAdminCompanyPage />}
          />
          <Route path="settings" element={<SuperAdminSettingsPage />} />
        </Route>

        <Route path="/" element={<HomePage />} />

        <Route path="/chat">
          <Route index element={<AiChatPage />} />
          <Route
            path="conversation/:conversationId"
            element={<AiConversationPage />}
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
