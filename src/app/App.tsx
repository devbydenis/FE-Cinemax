import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "@/features/movies/pages/HomePage";
import MoviesPage from "@/features/movies/pages/MoviesPage";
import MovieDetailPage from "@/features/movies/pages/MovieDetailPage";
import MainLayout from "@/shared/layouts/MainLayout";
import AuthLayout from "@/shared/layouts/AuthLayout";
import ProfileLayout from "@/shared/layouts/ProfileLayout";
import AdminLayout from "@/shared/layouts/AdminLayout";
import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import ForgotPasswordPage from "@/features/auth/pages/ForgotPasswordPage";
import ResetPasswordPage from "@/features/auth/pages/ResetPasswordPage";
import ProfileAccountPage from "@/features/profile/pages/ProfileAccountPage";
import ProfileHistoryPage from "@/features/profile/pages/ProfileHistoryPage";
import ProtectedRoute from "@/shared/components/ProtectedRoute";
import NotFoundPage from "@/shared/pages/NotFoundPage";

const OrderSeatPage = lazy(
  () => import("@/features/order/pages/OrderSeatPage"),
);
const OrderPaymentPage = lazy(
  () => import("@/features/order/pages/OrderPaymentPage"),
);
const OrderTicketPage = lazy(
  () => import("@/features/order/pages/OrderTicketPage"),
);
const AdminDashboardPage = lazy(
  () => import("@/features/admin/pages/AdminDashboardPage"),
);
const AdminAddMoviePage = lazy(
  () => import("@/features/admin/pages/AdminAddMoviePage"),
);
const AdminListMoviePage = lazy(
  () => import("@/features/admin/pages/AdminListMoviePage"),
);

function App() {
  return (
    <Routes>
      <Route path="auth" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
      </Route>

      <Route element={<AdminLayout />}>
        <Route path="admin">
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="add-movie"
            element={
              <ProtectedRoute>
                <AdminAddMoviePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="list-movie"
            element={
              <ProtectedRoute>
                <AdminListMoviePage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Route>

      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="movies">
          <Route index element={<MoviesPage />} />
          <Route path=":id" element={<MovieDetailPage />} />
        </Route>
        <Route path="buy-ticket" element={<Navigate to="/movies" replace />} />
        <Route path="order">
          <Route
            path="seat/:id"
            element={
              <ProtectedRoute>
                <OrderSeatPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="payment/:id"
            element={
              <ProtectedRoute>
                <OrderPaymentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="ticket/:id"
            element={
              <ProtectedRoute>
                <OrderTicketPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Route>

      <Route element={<ProfileLayout />}>
        <Route path="profile">
          <Route
            path="account"
            element={
              <ProtectedRoute>
                <ProfileAccountPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="history"
            element={
              <ProtectedRoute>
                <ProfileHistoryPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
