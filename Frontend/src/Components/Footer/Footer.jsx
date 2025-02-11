import StoreLocation from "./StoreLocation";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Services & Planning */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Planning & Services</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-gray-400 transition">
                Wedding Decors
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400 transition">
                Reception Setup
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400 transition">
                Sangeet Decoration
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400 transition">
                Haldi Decoration
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400 transition">
                Rental Furniture
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400 transition">
                Sitting Arrangements
              </a>
            </li>
          </ul>
        </div>

        {/* Company Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Company</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-gray-400 transition">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400 transition">
                Our Team
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400 transition">
                Testimonials
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400 transition">
                Gallery
              </a>
            </li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Support</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-gray-400 transition">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400 transition">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400 transition">
                Booking Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400 transition">
                Cancellation & Refund
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media & App */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4 mb-4">
            <a href="#" className="hover:text-gray-400 transition">
              Facebook
            </a>
            <a href="#" className="hover:text-gray-400 transition">
              Instagram
            </a>
            <a href="#" className="hover:text-gray-400 transition">
              Twitter
            </a>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Get Our App</h3>
            <img src="qr-code.png" alt="Download App" className="w-24" />
          </div>

          {/* Ensure proper spacing and rendering */}
          <StoreLocation />
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="text-center mt-6 border-t border-gray-600 pt-4">
        <p className="text-gray-400">
          © 2025 Sunrise Events. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
