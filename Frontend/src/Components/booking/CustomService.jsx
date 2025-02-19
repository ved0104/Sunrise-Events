import { useState ,useEffect} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Navbar/navbar";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";

const CustomBookingForm = () => {
  const navigate = useNavigate();
  const [eventType, setEventType] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/users/services/custom-service",
        { eventType, description, date },
        { withCredentials: true }
      );
      toast.success("Service submitted successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      setEventType("");
      setDescription("");
      setDate("");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit booking", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
        <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Custom Event Request
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="eventType" className="block text-sm font-semibold text-gray-700 mb-2">
                Event Type
              </label>
              <input
                type="text"
                id="eventType"
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                placeholder="e.g., Corporate Event, Birthday Party"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                Event Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your requirements..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                required
              />
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-2">
                Event Date
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-all duration-200 font-semibold shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit Request
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CustomBookingForm;
