import { create } from "zustand";
import axios from "axios";

const API_URL = "https://sunrise-events.onrender.com/api/auth/admin";

axios.defaults.withCredentials = true;

export const useAdminAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isCheckingAuth: true,
  error: null,
  message: null,
  users: [],
  dashboardStats: {},

  // Admin Signup (if required)
  signup: async (email, password, name, phonenumber) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(`${API_URL}/signup`, {
        email,
        password,
        name,
        phonenumber,
      });

      // Check if the user is verified
      if (response.data.user.isVerified) {
        set({
          user: response.data.user,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        // User not verified – do not mark as authenticated
        set({
          user: response.data.user,
          isAuthenticated: false,
          isLoading: false,
        });
      }
      return { success: true, data: response.data };
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error signing up",
        isLoading: false,
      });
      return { success: false, message: error };
    }
  },

  // Admin Login
  login: async (email, password) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      return true; // ✅ Return success for redirection
    } catch (error) {
      set({
        error: error.response?.data?.message || "Login failed",
        isLoading: false,
      });
      return false; // ❌ Return failure
    }
  },

  // Admin Logout
  // logout: async () => {
  //   set({ isLoading: true, error: null });
  //   try {
  //     await axios.post(`${API_URL}/logout`);
  //     set({
  //       user: null,
  //       isAuthenticated: false,
  //       isLoading: false,
  //     });
  //     console.log("logged out");
  //     localStorage.removeItem("token");
  //   } catch (error) {
  //     set({ error: "Error logging out", isLoading: false });
  //     throw error;
  //   }
  // },
  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/logout`);
      set({
        user: null,
        isAuthenticated: false,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      set({ error: "Error logging out", isLoading: false });
      throw error;
    }
  },

  // Fetch Admin Profile (for Dashboard)
  fetchAdmin: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/profile`);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  // Update Admin Profile
  updateAdmin: async (updatedData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(
        `${API_URL}/profile/update`,
        updatedData
      );
      set({
        user: response.data.user,
        isLoading: false,
        message: "Profile updated successfully!",
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error updating profile",
        isLoading: false,
      });
      throw error;
    }
  },

  // Fetch Users for Admin Panel
  fetchUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/users`);
      set({ users: response.data.users, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch users", isLoading: false });
    }
  },

  // Fetch Dashboard Statistics
  fetchDashboardStats: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/dashboard/stats`);
      set({ dashboardStats: response.data.stats, isLoading: false });
    } catch (error) {
      set({ error: "Failed to load dashboard stats", isLoading: false });
    }
  },

  // Check Admin Authentication Status
  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/check-auth`);
      if (response.data.user?.role === "admin") {
        set({
          user: response.data.user,
          isAuthenticated: true,
          isCheckingAuth: false,
        });
      } else {
        set({ user: null, isAuthenticated: false, isCheckingAuth: false });
      }
    } catch (error) {
      set({ user: null, isAuthenticated: false, isCheckingAuth: false });
    }
  },

  // Forgot Password
  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, {
        email,
      });
      set({ message: response.data.message, isLoading: false });
      return { success: true, message: response.data.message };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error sending reset email";
      set({
        error: error.response?.data?.message || "Error sending reset email",
        isLoading: false,
      });
      return { success: false, message: errorMessage };
    }
  },

  // Reset Password
  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/reset-password/${token}`, {
        password,
      });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error resetting password",
        isLoading: false,
      });
      throw error;
    }
  },

  // Verify Admin Email
  verifyAdminEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(`${API_URL}/verify-email`, { code });
      set({
        user: res.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      return true;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Verification failed",
        isLoading: false,
      });
      return false;
    }
  },
}));
