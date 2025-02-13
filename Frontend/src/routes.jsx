import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
// import Navbar from "./Components/Navbar/navbar";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import FloatingShape from "./components/FloatingShape";
import { Toaster } from "react-hot-toast";
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
import AdminForgotPasswordPage from "./pages/admin/ForgotPasswordPage";

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Allow user to access verification page
  if (!user.isVerified) {
    return children;
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
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex flex-col relative overflow-hidden">
      {/* Floating Shapes for UI Effects */}
      <FloatingShape
        color="bg-green-500"
        size="w-64 h-64"
        top="-5%"
        left="10%"
        delay={0}
      />
      <FloatingShape
        color="bg-emerald-500"
        size="w-48 h-48"
        top="70%"
        left="80%"
        delay={5}
      />
      <FloatingShape
        color="bg-lime-500"
        size="w-32 h-32"
        top="40%"
        left="-10%"
        delay={2}
      />

      <Toaster />

      {/* Routes for different pages */}

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
        <Route
          path="/admin/verify-email"
          element={<AdminEmailVerificationPage />}
        />
        <Route
  path="/admin/forgot-password"
  element={
    <RedirectAuthenticatedUser>
      <AdminForgotPasswordPage />
    </RedirectAuthenticatedUser>
  }
/>

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
    </div>
  );
};

export default AppRoutes;
