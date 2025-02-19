import React, { useState } from "react";
import axios from "axios";
import contactImage from "/src/assets/images/galleryImages/contactImage.jpg";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";
import Navbar from "../Navbar/navbar";
import Footer from "../Footer/Footer";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    services: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/contactform",
        formData
      );

      if (response.data.success) {
        setResponseMessage("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          services: "",
          message: "",
        });
      } else {
        setResponseMessage("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setResponseMessage("An error occurred. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="bg-[#fff5ed]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12 pt-28">
        {/* Heading Section */}
        <div className="flex flex-col items-center">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
            <p className="text-lg text-gray-600">
              Looking for the best and most experienced décor professionals in Surat? <br />
              Get in touch with us without hesitation. Call us or fill up the form! <br />
              We'd love to hear from you!
            </p>
          </div>
          <img
            src={contactImage}
            alt="Sunrise Events Contact Banner"
            className="mt-8 w-full h-auto object-cover rounded-xlv mb-25 shadow-[0_0_30px_rgba(236,72,153,1)]"
          />
        </div>

        {/* Contact Form */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">
              We are here to Help You!
            </h2>
            <p className="text-center text-gray-600 mb-6">
              Fill out the form and our team will get back to you within 24 hours.
            </p>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-pink-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2" htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-pink-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2" htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-pink-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2" htmlFor="services">Select Services</label>
                <select
                  id="services"
                  value={formData.services}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-pink-500 focus:outline-none cursor-pointer"
                  required
                >
                  <option value="">Select a Service</option>
                  <option value="Haldi Decoration">Haldi Decoration</option>
                  <option value="Mehendi Decoration">Mehendi Decoration</option>
                  <option value="Wedding Decoration">Wedding Decoration</option>
                  <option value="Reception Setup">Reception Setup</option>
                  <option value="Rental Furniture">Rental Furniture</option>
                  <option value="Ballon Decoration">Ballon Decoration</option>
                  <option value="Flower Decoration">Flower Decorations</option>
                  <option value="Birthday Party">Birthday Party Decoration</option>
                  <option value="Suprise Party">Suprise Party Decorations</option>
                  <option value="Entertainment">Entertainment & Fun Activities</option>
                  <option value="Catering">Catering</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-pink-500 focus:outline-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-pink-600 text-white py-3 px-6 rounded-lg hover:bg-pink-700 transition-colors disabled:bg-gray-400"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

              {responseMessage && (
                <p className={`text-center mt-4 ${responseMessage.includes("success") ? "text-green-600" : "text-red-600"}`}>
                  {responseMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
