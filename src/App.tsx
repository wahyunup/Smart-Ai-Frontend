import "./App.css";
import { Route, Routes } from "react-router";
import NotFoundPage from "./shared/components/common/Fallback/NotFoundPage";

import {
  AddDocumentPage,
  AddStafPage,
  ChatLogDetailPage,
  ChatLogPage,
  CompanyProfilePage,
  DashboardAdminPage,
  InvoicePage,
  ManageDocumentsPage,
  ManageStaffPage,
  PaymentSuccessPage,
  SelectSubcriptionPage,
  SubscriptionPage,
  SubscriptionRequestPage,
} from "./features/dashboard/pages/admin";

import {
  CreateAdminCompanyPage,
  CreateCompanyPage,
  DashboardSuperadminPage,
  LogAuditPage,
  ManageCompanyPage,
  ManageTransactionPage,
  SettingsPage,
} from "./features/dashboard/pages/superadmin";

import {
  CompanyLoginPage,
  CompanyRegisterPage,
  EmployeeLoginPage,
  FillCompanyBiodataPage,
  ResetPasswordPage,
  ResetPasswordSendEmailPage,
  SuperadminLoginPage,
  VerifiedAccountPage,
} from "./features/auth/pages";

import {
  AiChatPage,
  AiConversationPage,
  FAQPage,
} from "./features/aiChat/pages";

import { HomePage } from "./features/home/page";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/auth">
          <Route path="company-employe/login" element={<EmployeeLoginPage />} />
          <Route path="company-admin/login" element={<CompanyLoginPage />} />
          <Route
            path="company-admin/register"
            element={<CompanyRegisterPage />}
          />
          <Route path="admin/login" element={<SuperadminLoginPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
          <Route
            path="reset-password-send-email"
            element={<ResetPasswordSendEmailPage />}
          />
          <Route path="account-verified" element={<VerifiedAccountPage />} />
          <Route path="fill-biodata" element={<FillCompanyBiodataPage />} />
        </Route>

        <Route path="/admin">
          <Route path="dashboard" element={<DashboardAdminPage />} />

          <Route path="manage-documents">
            <Route index element={<ManageDocumentsPage />} />
            <Route path="create" element={<AddDocumentPage />} />
            <Route path="edit" element={<AddDocumentPage />} />
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
            <Route path="create" element={<AddStafPage />} />
            <Route path="edit" element={<AddStafPage />} />
          </Route>

          <Route path="company-profile" element={<CompanyProfilePage />} />

          <Route path="subcription">
            <Route index element={<SubscriptionPage />} />
            <Route path="select-sub" element={<SelectSubcriptionPage />} />
            <Route path="sub-req" element={<SubscriptionRequestPage />} />
            <Route path="payment-success" element={<PaymentSuccessPage />} />
            <Route path="invoice" element={<InvoicePage />} />
          </Route>
        </Route>

        <Route path="/superadmin">
          <Route path="dashboard" element={<DashboardSuperadminPage />} />
          <Route path="log-audit" element={<LogAuditPage />} />
          <Route path="manage-company">
            <Route index element={<ManageCompanyPage />} />
            <Route path="create" element={<CreateAdminCompanyPage />} />
            <Route path="edit/:id" element={<CreateAdminCompanyPage />} />
          </Route>
          <Route path="manage-admin-company">
            <Route index element={<ManageCompanyPage />} />
            <Route path="create" element={<CreateCompanyPage />} />
            <Route path="edit/:id" element={<CreateCompanyPage />} />
            <Route path="details/:id" element={<CreateCompanyPage />} />
          </Route>
          <Route path="settings" element={<SettingsPage />} />
          <Route
            path="manage-transaction"
            element={<ManageTransactionPage />}
          />
        </Route>

        <Route path="/chat">
          <Route index element={<AiChatPage />} />
          <Route
            path="conversation/:conversationId"
            element={<AiConversationPage />}
          />
          <Route path="faq" element={<FAQPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
