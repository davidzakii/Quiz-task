import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import LoginPage from "../pages/Login";
import HomePage from "../pages/Home";
import SchedulePage from "../pages/Schedule";
import CoursesPage from "../pages/Courses";
import GradebookPage from "../pages/Gradebook";
import PerformancePage from "../pages/Performance";
import AnnouncementsPage from "../pages/Announcements";
import AdminDashboard from "../pages/AdminDashboard"; // صفحة فاضية للأدمن
import RegisterPage from "../pages/Register";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard">
            <Route path="home" element={<HomePage />} />
            <Route path="schedule" element={<SchedulePage />} />
            <Route path="courses" element={<CoursesPage />} />
            <Route path="gradebook" element={<GradebookPage />} />
            <Route path="performance" element={<PerformancePage />} />
            <Route path="announcements" element={<AnnouncementsPage />} />
            <Route path="admin" element={<ProtectedRoute adminOnly />}>
              <Route index element={<AdminDashboard />} />
            </Route>
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
    </Route>
  )
);

export default router;
