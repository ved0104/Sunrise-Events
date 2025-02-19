// Footer.jsx
import { Link } from "react-router-dom";
import qrcode from "../../assets/qrcode.svg";
import {CiFacebook, CiTwitter ,CiInstagram} from "react-icons/ci";
import logo from "../../assets/images/logo.svg";

const Footer = () => {
  const socialIcons = [
    { icon: CiFacebook, name: "Facebook", url: "#" },
    { icon: CiInstagram, name: "Instagram", url: "#" },
    { icon: CiTwitter, name: "Twitter", url: "#" },
  ];

  return (
    <footer className="bg-black text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="grid grid-cols-3 items-center mb-8">
          <div className="flex justify-start">
            <img src={logo} alt="Logo" className="h-10 w-auto" />
          </div>
          <div className="flex justify-center">
            <h2 className="text-xl text-white">
              Turning every detail into a masterpiece.
            </h2>
          </div>
          <div className="flex justify-end">
            {/* Empty spacer */}
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Services & Planning */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white mb-4">
              Planning &amp; Services
            </h3>
            <ul className="space-y-2.5">
              {[
                { name: "Wedding Decors", path: "/services" },
                { name: "Reception Setup", path: "/services" },
                { name: "Sangeet Decoration", path: "/services" },
                { name: "Haldi Decoration", path: "/services" },
                { name: "Rental Furniture", path: "/services" },
                { name: "Sitting Arrangements", path: "/services" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="hover:text-amber-400 transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Info */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2.5">
              {[
                { name: "About Us", path: "/privacy-policy#aboutus" },
                { name: "Testimonials", path: "/#testimonials" },
                { name: "Gallery", path: "/gallery" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="hover:text-amber-400 transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2.5">
              {[
                { name: "Contact Us", path: "/contact-us" },
                { name: "FAQs", path: "/privacy-policy#faq" },
                { name: "Booking Policy", path: "/privacy-policy#bookingpolicy" },
                { name: "Cancellation & Refund", path: "/privacy-policy#cancellationrefund" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="hover:text-amber-400 transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media & App */}
          <div className="space-y-6">

            <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white mb-4">
                One place for wedding decor
              </h3>
              <div className="flex items-center space-x-4">
                <img
                  src={qrcode}
                  alt="Download App"
                  className="w-24 h-24 border-2 border-amber-400 rounded-lg"
                />
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white mb-4">
                Follow Us
              </h3>
              <div className="flex space-x-6">
                {socialIcons.map(({ icon: Icon, name, url }) => (
                  <a
                    key={name}
                    href={url}
                    className="hover:text-amber-400 transition-colors duration-300"
                    aria-label={`Follow us on ${name}`}
                  >
                    <Icon size={24} />
                  </a>
                ))}
              </div>
            </div>

            {/* Optional: Uncomment if you wish to include StoreLocation */}
            {/* <StoreLocation /> */}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2025. All rights reserved. |{" "}
            <Link to="/privacy-policy" className="hover:text-amber-400 ml-2">
              Privacy Policy
            </Link>{" "}
            |{" "}
            <Link to="/terms-of-service" className="hover:text-amber-400 ml-2">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
