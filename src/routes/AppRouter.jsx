import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "@/pages/auth/LoginPage";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import ChangePasswordPage from "@/pages/dashboard/ChangePasswordPage";
import DashboardLayout from "@/pages/dashboard/DashboardLayout";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        {/* DASHBOARD WRAPPER */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
