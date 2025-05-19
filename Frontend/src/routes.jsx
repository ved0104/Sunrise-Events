import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "./store/authStore"; // User auth store
import { useAdminAuthStore } from "./store/adminAuthStore"; // Admin auth store
import LoadingSpinner from "./Components/LoadingSpinner";
import { Toaster } from "react-hot-toast";
import Layout from "./Components/Layout";

// ===========================
// User Authentication Pages
import SignUpPage from "./pages/userloginSignup/SignUpPage";
import LoginPage from "./pages/userloginSignup/LoginPage";
import EmailVerificationPage from "./pages/userloginSignup/EmailVerificationPage";
import DashboardPage from "./pages/userloginSignup/DashboardPage";
import ForgotPasswordPage from "./pages/userloginSignup/ForgotPasswordPage";
import ResetPasswordPage from "./pages/userloginSignup/ResetPasswordPage";

// ===========================
// Admin Authentication Pages
import AdminSignUpPage from "./pages/admin/SignUpPage";
import AdminLoginPage from "./pages/admin/LoginPage";
import AdminEmailVerificationPage from "./pages/admin/EmailVerificationPage";
import AdminForgotPasswordPage from "./pages/admin/ForgotPasswordPage";

// ===========================
// Service & Misc Pages
import Home from "./pages/service-view/Home";
import UnauthPage from "./pages/un-auth-page/index";
import NotFound from "./pages/Not-Found/index";
import Booking from "./pages/service-view/Booking";

import Gallery from "./pages/service-view/Gallery";
import AllServices from "./Components/booking/AllServices";

// ===========================
// Admin Protected Pages
import AdminHome from "./pages/admin/AdminHome";
import ManageUsers from "./Components/admin/ManageUsers";
import ManageServices from "./Components/admin/ManageServices";
import ManageGallery from "./Components/admin/ManageGallery";
import ManageBookings from "./Components/admin/ManageBooking";
import ContactUs from "./Components/other/ContactUs";
import PolicyPage from "./Components/other/PolicyPage";
import CustomBookingForm from "./Components/booking/CustomService";


// ---------------------------
// User Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  // Allow access to non-verified users to see verification-related pages
  if (!user.isVerified) {
    return children;
  }
  return children;
};

// Redirect Authenticated Users (for user auth pages)
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace />;
  }
  return children;
};

// ---------------------------
// Updated Admin Protected Route Wrapper (checks both stores)
const AdminRoute = ({ children }) => {
  const adminStore = useAdminAuthStore();
  const userStore = useAuthStore();

  const isAdminFromAdminStore =
    adminStore.isAuthenticated && adminStore.user?.role === "admin";
  const isAdminFromUserStore =
    userStore.isAuthenticated && userStore.user?.role === "admin";

  if (!isAdminFromAdminStore && !isAdminFromUserStore) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

// Updated Redirect Authenticated Admin Users (for admin auth pages)
const RedirectAuthenticatedAdminUser = ({ children }) => {
  const adminStore = useAdminAuthStore();
  const userStore = useAuthStore();

  const isAdminFromAdminStore =
    adminStore.isAuthenticated && adminStore.user?.role === "admin";
  const isAdminFromUserStore =
    userStore.isAuthenticated && userStore.user?.role === "admin";

  if (isAdminFromAdminStore || isAdminFromUserStore) {
    return <Navigate to="/admin/dashboard" replace />;
  }
  return children;
};

// ---------------------------
const AppRoutes = () => {
  const { isCheckingAuth, checkAuth } = useAuthStore();
  const {
    isCheckingAuth: isCheckingAdminAuth,
    checkAuth: checkAdminAuth,
  } = useAdminAuthStore();

  useEffect(() => {
    checkAuth();
    checkAdminAuth();
  }, [checkAuth, checkAdminAuth]);

  if (isCheckingAuth || isCheckingAdminAuth) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br flex flex-col relative overflow-hidden">
      <Toaster />
      <Routes>
        {/* Main Layout Routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<AllServices />} />
          <Route path="/gallery" element={<Gallery />} />
         
        </Route>

        {/* User Authentication Routes (no layout) */}
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
        <Route path="/booking/:id" element={<Booking />} />

        {/* Admin Public Routes */}
        <Route
          path="/admin/signup"
          element={
            <RedirectAuthenticatedAdminUser>
              <AdminSignUpPage />
            </RedirectAuthenticatedAdminUser>
          }
        />
        <Route
          path="/admin/login"
          element={
            <RedirectAuthenticatedAdminUser>
              <AdminLoginPage />
            </RedirectAuthenticatedAdminUser>
          }
        />
        <Route
          path="/admin/verify-email"
          element={<AdminEmailVerificationPage />}
        />
        <Route
          path="/admin/forgot-password"
          element={
            <RedirectAuthenticatedAdminUser>
              <AdminForgotPasswordPage />
            </RedirectAuthenticatedAdminUser>
          }
        />

        {/* Admin Protected Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminHome />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/manage-users"
          element={
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/manage-services"
          element={
            <AdminRoute>
              <ManageServices />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/manage-gallery"
          element={
            <AdminRoute>
              <ManageGallery />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/manage-bookings"
          element={
            <AdminRoute>
              <ManageBookings />
            </AdminRoute>
          }
        />

        {/* User Protected Route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/request-booking"
          element={
            <ProtectedRoute>
              <CustomBookingForm />
            </ProtectedRoute>
          }
        />

        {/* Miscellaneous Pages */}
        <Route path="/unauth-page" element={<UnauthPage />} />
        <Route path="/contact-us" element={<ContactUs/>} />
        <Route path="/privacy-policy" element={<PolicyPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;