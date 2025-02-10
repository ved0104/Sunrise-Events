import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "./store/authStore";

// Import pages
import SignUpPage from "./pages/userloginSignup/SignUpPage";
import LoginPage from "./pages/userloginSignup/LoginPage";
import EmailVerificationPage from "./pages/userloginSignup/EmailVerificationPage";
import DashboardPage from "./pages/userloginSignup/DashboardPage";
import ForgotPasswordPage from "./pages/userloginSignup/ForgotPasswordPage";
import ResetPasswordPage from "./pages/userloginSignup/ResetPasswordPage";
import AdminSignUpPage from "./pages/admin/SignUpPage";
import AdminLoginPage from "./pages/admin/LoginPage";
import AdminEmailVerificationPage from "./pages/admin/EmailVerificationPage";
import AdminDashboardPage from "./pages/admin/DashboardPage";
// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

// Redirect authenticated users to dashboard
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Routes Component
const AppRoutes = () => {
  return (
    <Routes>
      {/* User Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <RedirectAuthenticatedUser>
            <SignUpPage />
          </RedirectAuthenticatedUser>
        }
      />
      <Route
        path="/login"
        element={
          <RedirectAuthenticatedUser>
            <LoginPage />
          </RedirectAuthenticatedUser>
        }
      />
      <Route path="/verify-email" element={<EmailVerificationPage />} />
      <Route
        path="/forgot-password"
        element={
          <RedirectAuthenticatedUser>
            <ForgotPasswordPage />
          </RedirectAuthenticatedUser>
        }
      />
      <Route
        path="/reset-password/:token"
        element={
          <RedirectAuthenticatedUser>
            <ResetPasswordPage />
          </RedirectAuthenticatedUser>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin/signup"
        element={
          <RedirectAuthenticatedUser>
            <AdminSignUpPage />
          </RedirectAuthenticatedUser>
        }
      />
      <Route
        path="/admin/login"
        element={
          <RedirectAuthenticatedUser>
            <AdminLoginPage />
          </RedirectAuthenticatedUser>
        }
      />
      <Route path="/admin/verify-email" element={<AdminEmailVerificationPage />} />
      <Route
        path="/admin/dashboard"
        element={
          <RedirectAuthenticatedUser>
            <AdminDashboardPage />
          </RedirectAuthenticatedUser>
        }
      />

      {/* User Dashboard */}
      <Route
        path="/user/dashboard"
        element={
          <RedirectAuthenticatedUser>
            {/* <Services /> */}
          </RedirectAuthenticatedUser>
        }
      />

      {/* Catch all other routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
