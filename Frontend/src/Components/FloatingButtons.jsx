import React, { useState } from "react";

const FloatingButtons = () => {
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [showCall, setShowCall] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 flex flex-col items-end gap-3 z-11">
      {/* WhatsApp Pop-up */}
      {showWhatsApp && (
        <a
          href="https://wa.me/919363325158"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300"
        >
          Chat on WhatsApp
        </a>
      )}

      {/* Phone Call Pop-up */}
      {showCall && (
        <a
          href="tel:+919363325158"
          className="bg-blue-400 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300"
        >
          Call Now
        </a>
      )}

      {/* Floating WhatsApp Button */}
      <button
        onClick={() => setShowWhatsApp(!showWhatsApp)}
        className="bg-green-500 p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          className="w-8 h-8"
        />
      </button>

      {/* Floating Call Button */}
      <button
        onClick={() => setShowCall(!showCall)}
        className="rounded-full shadow-lg hover:scale-110 transition-transform"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/724/724664.png"
          alt="Call"
          className="w-13 h-13"
        />
      </button>
    </div>
  );
};

export default FloatingButtons;