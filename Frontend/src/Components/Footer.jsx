const Footer = () => {
    return (
      <footer className="bg-black text-white py-10">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Services & Planning */}
          <div>
            <h3 className="text-lg font-semibold">Planning & Services</h3>
            <ul>
              <li>Weddings</li>
              <li>Corporate Events</li>
              <li>Birthdays</li>
              <li>Baby Showers</li>
              <li>Concerts & Festivals</li>
            </ul>
          </div>
  
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold">Company</h3>
            <ul>
              <li>About Us</li>
              <li>Our Team</li>
              <li>Testimonials</li>
              <li>Careers</li>
              <li>Press & Media</li>
            </ul>
          </div>
  
          {/* Customer Support */}
          <div>
            <h3 className="text-lg font-semibold">Support</h3>
            <ul>
              <li>Contact Us</li>
              <li>FAQs</li>
              <li>Booking Policy</li>
              <li>Cancellation & Refund</li>
            </ul>
          </div>
  
          {/* Social Media & App */}
          <div>
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#">Facebook</a>
              <a href="#">Instagram</a>
              <a href="#">Twitter</a>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Get Our App</h3>
              <img src="qr-code.png" alt="Download App" />
            </div>
          </div>
        </div>
  
        <div className="text-center mt-6 border-t border-gray-600 pt-4">
          <p>© 2025 Sunrise Events. All rights reserved.</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  