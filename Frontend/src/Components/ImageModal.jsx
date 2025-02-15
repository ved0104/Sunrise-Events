import React from "react";

const ImageModal = ({ imageSrc, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
      <div className="relative">
        <button
          className="absolute top-4 right-4 text-white text-3xl font-bold bg-black/50 px-3 py-1 rounded-lg"
          onClick={onClose}
        >
          ✕
        </button>
        <img src={imageSrc} alt="Selected" className="max-w-screen-md max-h-[80vh] rounded-lg shadow-lg" />
      </div>
    </div>
  );
};

export default ImageModal;
