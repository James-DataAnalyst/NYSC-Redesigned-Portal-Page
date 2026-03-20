import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "@/pages/auth/LoginPage";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import ChangePasswordPage from "@/pages/dashboard/ChangePasswordPage";
import DashboardLayout from "@/pages/dashboard/DashboardLayout";
import CourseCorrectionPage from "@/pages/dashboard/CourseCorrectionPage";
import PPALetterPage from "@/pages/dashboard/PPALetterPage";
import LGAClearancePage from "@/pages/dashboard/LGAClearancePage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        {/* DASHBOARD WRAPPER */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/course-correction" element={<CourseCorrectionPage />} />
          <Route path="/ppa-letter" element={<PPALetterPage />} />
          <Route path="/lga-clearance" element={<LGAClearancePage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
