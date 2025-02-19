import React, { useState } from "react";
import axios from "axios";
import contactImage from "/src/assets/images/galleryImages/contactImage.jpg";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
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

<<<<<<< HEAD
=======
  const location=useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);


>>>>>>> 116059a66e064589a31c9d8dd5a6ce858070ce5d
  return (
    <div className="bg-[#fff5ed]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12 pt-28">
        {/* Heading Section */}
        <div className="flex flex-col items-center">
<<<<<<< HEAD
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
=======
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Contact Us
            </h1>
>>>>>>> 116059a66e064589a31c9d8dd5a6ce858070ce5d
            <p className="text-lg text-gray-600">
              Looking for the best and most experienced décor professionals in Surat? <br />
              Get in touch with us without hesitation. Call us or fill up the form! <br />
              We'd love to hear from you!
            </p>
          </div>
<<<<<<< HEAD
          <img
            src={contactImage}
            alt="Sunrise Events Contact Banner"
            className="mt-8 w-full h-auto object-cover rounded-xlv mb-25 shadow-[0_0_30px_rgba(236,72,153,1)]"
          />
        </div>

        {/* Contact Form */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
=======
          <div>
            <img
              src={contactImage}
              alt="sunriseEventsContactBanner"
              className=" w-full h-auto object-cover rounded-xlv mb-10 md:mb-15"
            />
          </div>
        </div>

        {/* Contact Content Grid */}
        <div id="calltoaction" className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Left Side - Contact Form */}
>>>>>>> 116059a66e064589a31c9d8dd5a6ce858070ce5d
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
<<<<<<< HEAD
=======

          {/* Right Side - Contact Info */}
          <div className="space-y-8">
            {/* Contact Card */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Get in Touch
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="text-pink-600 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Office Address
                    </h3>
                    <p className="text-gray-600">
                      Near, 110, Aagam Ochid, Nadani-2, Vesu
                      <br />
                      Surat, Gujarat 395007
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Phone className="text-pink-600" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Phone Number
                    </h3>
                    <p className="text-gray-600">+91 95878 36977</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Mail className="text-pink-600" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Email Address
                    </h3>
                    <p className="text-gray-600">Sunriseevents.in@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Clock className="text-pink-600" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Working Hours
                    </h3>
                    <p className="text-gray-600">
                      Mon-Sun: 9 AM - 9 PM
                      <br />
                      Opens All the Days
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Follow Us
              </h2>
              <div className="flex gap-6">
                <a href="#" className="text-pink-600 hover:text-pink-700">
                  <Facebook size={28} />
                </a>
                <a
                  href="https://www.instagram.com/sunriseevents.in?igsh=MTJuZXdoMnVvcGNxZw=="
                  className="text-pink-600 hover:text-pink-700"
                >
                  <Instagram size={28} />
                </a>
                <a href="#" className="text-pink-600 hover:text-pink-700">
                  <Twitter size={28} />
                </a>
                <a href="#" className="text-pink-600 hover:text-pink-700">
                  <Linkedin size={28} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="relative rounded-2xl overflow-hidden group">
          <div className="absolute inset-0 z-10 pointer-events-none  border-5" />
          <iframe
            title="Sunrise Events"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.300687486!2d72.77298259999999!3d21.1404288!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be05362b26e0b2b%3A0x184d69514dbd8923!2sSunrise%20Craft%20%26%20Decor!5e0!3m2!1sen!2sin!4v1739481128528!5m2!1sen!2sin"
            width="110%"
            height="500"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            style={{ border: 0 }}
            allowFullScreen
            className="filter grayscale-0 group-hover:grayscale-0 transition-all duration-500"
          />
          <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-md flex items-center gap-2 z-10">
            <MapPin className="text-pink-600" size={20} />
            <span className="text-sm font-medium text-gray-700">
              Near, 110, Aagam Ochid,
              <br />
              Nandan-2, Vesu, Surat,
              <br />
              Gujarat 395007
            </span>
          </div>
>>>>>>> 116059a66e064589a31c9d8dd5a6ce858070ce5d
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
