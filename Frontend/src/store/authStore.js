import { create } from "zustand";
import axios from "axios";
import { useEffect } from "react";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/auth"
    : "/api/auth";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  signup: async (email, password, name, phonenumber) => {
    set({ isLoading: true, error: null });
    const userData = { email, password, name, phonenumber };

    try {
      const response = await axios.post(`${API_URL}/signup`, {
        email,
        password,
        name,
        phonenumber,
      });

      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      return true;
    } catch (error) {
      console.log("error:", error);
      set({
        error: error.response.data.message || "Error signing up",
        isLoading: false,
      });
      return false;
    }
  },
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      // Store the full user object
      const userData = response.data.user;
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
      }

      localStorage.setItem("user", JSON.stringify(userData));

      set({
        isAuthenticated: true,
        user: userData, // Store full user details
        error: null,
        isLoading: false,
      });

      return true;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error logging in",
        isLoading: false,
      });
      return false;
    }
  },

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
  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/verify-email`, { code });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response.data.message || "Error verifying email",
        isLoading: false,
      });
      throw error;
    }
  },
  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });

    try {
      const response = await axios.get(`${API_URL}/check-auth`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Send token if stored
        },
        withCredentials: true, // If using cookies
      });

      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      if (error.response?.status === 401) {
        console.log("User not authenticated");
        set({
          user: null,
          isAuthenticated: false,
          isCheckingAuth: false,
        });
      } else {
        console.error("Error checking auth:", error);
        set({
          error: "Failed to check authentication",
          isCheckingAuth: false,
        });
      }
    }
  },

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
        error.response?.data?.message || "Something went wrong";
      set({
        isLoading: false,
        error: errorMessage,
      });
      return { success: false, message: errorMessage };
    }
  },
  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/reset-password/${token}`, {
        password,
      });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.message || "Error resetting password",
      });
      throw error;
    }
  },
}));
