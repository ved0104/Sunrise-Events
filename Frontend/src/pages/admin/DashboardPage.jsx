import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAdminAuthStore } from "../../store/adminAuthStore";
import { formatDate } from "../../utils/date";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ChartBarIcon,
  UsersIcon,
  PhotoIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import AddService from "../../Components/admin/AddService";

// Mapping for icons and background colors based on the stat title
const statMappings = {
  "Total Users": { icon: UsersIcon, color: "bg-pink-100" },
  "Active Services": { icon: Cog6ToothIcon, color: "bg-purple-100" },
  "Gallery Items": { icon: PhotoIcon, color: "bg-blue-100" },
  "Monthly Bookings": { icon: CalendarIcon, color: "bg-teal-100" },
};

const AdminDashboardPage = () => {
  const { user: admin, logout } = useAdminAuthStore();
  const navigate = useNavigate();

  const [stats, setStats] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);

  // Fetch dashboard stats and recent activities dynamically
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const statsResponse = await axios.get("http://localhost:5000/admin/dashboard-stats");
        const activitiesResponse = await axios.get("http://localhost:5000/admin/recent-activities");

        // Map stats with corresponding icons and colors
        const mappedStats = statsResponse.data.stats.map((stat) => {
          const mapping = statMappings[stat.title] || {};
          return {
            ...stat,
            icon: mapping.icon,
            color: mapping.color || "bg-gray-100",
          };
        });

        setStats(mappedStats);
        setRecentActivities(activitiesResponse.data.activities);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  // Handlers for quick actions
  const handleManageUsers = () => navigate("/admin/manage-users");
  const handleManageServices = () => navigate("/admin/manage-services");
  const handleManageGallery = () => navigate("/admin/manage-gallery");
  const handleManageBookings = () => navigate("/admin/manage-bookings");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-pink-50 p-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome back, {admin?.name}
            </h1>
            <p className="text-gray-600">{formatDate(new Date())}</p>
          </div>
          <button
            onClick={() => {
              logout();
              navigate("/admin/login");
            }}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-pink-100 rounded-lg transition-colors"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-500 text-sm mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    {Icon && <Icon className="w-6 h-6 text-gray-700" />}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={handleManageUsers}
            className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 text-left hover:border-pink-200 transition-colors"
          >
            <UsersIcon className="w-8 h-8 text-pink-500 mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Manage Users
            </h3>
            <p className="text-gray-600 text-sm">
              View, edit, and manage user accounts and permissions.
            </p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={handleManageServices}
            className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 text-left hover:border-purple-200 transition-colors"
          >
            <Cog6ToothIcon className="w-8 h-8 text-purple-500 mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Manage Services
            </h3>
            <p className="text-gray-600 text-sm">
              Update service offerings and manage service categories.
            </p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={handleManageGallery}
            className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 text-left hover:border-blue-200 transition-colors"
          >
            <PhotoIcon className="w-8 h-8 text-blue-500 mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Manage Gallery
            </h3>
            <p className="text-gray-600 text-sm">
              Organize and manage gallery images and media content.
            </p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={handleManageBookings}
            className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 text-left hover:border-teal-200 transition-colors"
          >
            <CalendarIcon className="w-8 h-8 text-teal-500 mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Manage Bookings
            </h3>
            <p className="text-gray-600 text-sm">
              View and manage customer bookings and appointments.
            </p>
          </motion.button>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Activity
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-600 border-b border-gray-200">
                  <th className="pb-3">Action</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentActivities.map((activity) => (
                  <tr key={activity.id} className="border-b border-gray-100 last:border-0">
                    <td className="py-4 text-gray-800">{activity.action}</td>
                    <td className="py-4 text-gray-600">{formatDate(activity.date)}</td>
                    <td className="py-4">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        {activity.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {recentActivities.length === 0 && (
                  <tr>
                    <td colSpan="3" className="py-4 text-center text-gray-500">
                      No recent activity.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminDashboardPage;
