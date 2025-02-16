import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";
import LoadingSpinner from "./components/LoadingSpinner";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout"; // Import Layout
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
import Home from "./pages/service-view/Home";
import UnauthPage from "./pages/un-auth-page/index";
import NotFound from "./pages/Not-Found/index";
import Booking from "./pages/service-view/Booking";
import ContactUs from "./pages/service-view/ContactUs";
import FindStore from "./pages/service-view/FindStore";
import Gallery from "./pages/service-view/Gallery";
import Services from "./pages/service-view/Services";
import AdminServices from "./pages/admin/AdminServices";
import AdminBooking from "./pages/admin/AdminBooking";
import AdminHome from "./pages/admin/AdminHome";
import AllServices from "./Components/booking/AllServices";

// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated, user } = useAuthStore();
//   if (!isAuthenticated) return <Navigate to="/login" replace />;
//   if (user && !user.isVerified) return <Navigate to="/verify-email" replace />;
//   return children;
// };

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const AppRoutes = () => {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br flex flex-col relative overflow-hidden">
      <Toaster />
      <Routes>
        {/* Wrap all main pages inside Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<AllServices />} />
          <Route path="/gallery" element={<Gallery />} />

          <Route path="/contact-us" element={<ContactUs />} />
        </Route>

        {/* Authentication Routes (without Layout) */}
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

        <Route
          path="/booking/:id"
          element={
            
              <Booking />
            
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
              <AdminHome />
            </RedirectAuthenticatedUser>
          }
        />

        {/* User Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/*booking routes */}
        

        {/* Misc Pages */}
        <Route path="/unauth-page" element={<UnauthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
