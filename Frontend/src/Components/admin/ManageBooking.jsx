import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { formatDate } from "../../utils/date";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch all bookings from the backend
  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/admin/bookings");
      if (response.data.success) {
        setBookings(response.data.bookings);
      } else {
        toast.error("Failed to fetch bookings");
      }
    } catch (error) {
      console.error("Error fetching bookings", error);
      toast.error("Error fetching bookings");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Update booking status
  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/admin/bookings/${bookingId}`,
        { status: newStatus }
      );
      if (response.data.success) {
        toast.success("Booking status updated successfully");
        setBookings((prev) =>
          prev.map((b) =>
            b._id === bookingId ? { ...b, status: newStatus } : b
          )
        );
      } else {
        toast.error("Failed to update booking status");
      }
    } catch (error) {
      console.error("Error updating booking status", error);
      toast.error("Error updating booking status");
    }
  };

  // Delete a booking
  const handleDelete = async (bookingId) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) {
      return;
    }
    try {
      const response = await axios.delete(
        `http://localhost:5000/admin/bookings/${bookingId}`
      );
      if (response.data.success) {
        toast.success("Booking deleted successfully");
        setBookings((prev) => prev.filter((b) => b._id !== bookingId));
      } else {
        toast.error("Failed to delete booking");
      }
    } catch (error) {
      console.error("Error deleting booking", error);
      toast.error("Error deleting booking");
    }
  };

  return (
    <div className="p-8 relative">
      {/* Close button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
      >
        ✖
      </button>

      <h2 className="text-2xl font-bold mb-6 text-gray-800">Manage Bookings</h2>
      {loading ? (
        <p className="text-gray-600">Loading bookings...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border-b">S/N</th>
                <th className="px-4 py-2 border-b">User</th>
                <th className="px-4 py-2 border-b">Service</th>
                <th className="px-4 py-2 border-b">Event Date</th>
                <th className="px-4 py-2 border-b">Status</th>
                <th className="px-4 py-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr
                  key={booking._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-2 border-b text-sm text-gray-600">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2 border-b text-sm text-gray-600">
                    {booking.user?.name || "N/A"}
                  </td>
                  <td className="px-4 py-2 border-b text-sm text-gray-600">
                    {booking.service?.title || "N/A"}
                  </td>
                  <td className="px-4 py-2 border-b text-sm text-gray-600">
                    {formatDate(booking.date)}
                  </td>
                  <td className="px-4 py-2 border-b text-sm text-gray-600">
                    <select
                      value={booking.status}
                      onChange={(e) =>
                        handleStatusChange(booking._id, e.target.value)
                      }
                      className="border border-gray-300 rounded p-1 text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="px-4 py-2 border-b text-sm text-gray-600">
                    <button
                      onClick={() => handleDelete(booking._id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="px-4 py-2 text-center text-gray-500"
                  >
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageBookings;
