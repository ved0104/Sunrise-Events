import React from "react";
import { useNavigate } from "react-router-dom";


const HoverCard = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/booking"); // Navigate to Booking page
  };
  return (
      <div className="flex flex-col items-center bg-[#FFF5ED]">
      <h2 className="text-5xl font-bold">Choose what to decorate</h2>
      <div className="flex flex-row justify-center gap-6 my-8">
        <div className="border-amber-200 relative w-64 h-32 bg-white rounded-3xl overflow-hidden group flex items-center justify-center cursor-pointer hover:bg-blue-300 hover:underline" onClick={handleClick}>
          <div className="absolute -left-6 -top-4 w-24 h-24 clip-custom transition-all duration-300 group-hover:w-64 group-hover:h-32 group-hover:bg-orange-500"></div>
          <p className="relative z-10 text-black text-2xl font-semibold transition-all duration-300 group-hover:text-black">Bridal Salons</p>
        </div>
        <div className="border-amber-200 relative w-64 h-32 bg-white rounded-3xl overflow-hidden group flex items-center justify-center cursor-pointer hover:bg-blue-300 hover:underline">
          <div className="absolute -left-6 -top-4 w-24 h-24 clip-custom transition-all duration-300 group-hover:w-64 group-hover:h-32 group-hover:bg-orange-500"></div>
          <p className="relative z-10 text-black text-2xl font-semibold transition-all duration-300 group-hover:text-black">Bridal Salons</p>
        </div>
        <div className="border-amber-200 relative w-64 h-32 bg-white rounded-3xl overflow-hidden group flex items-center justify-center cursor-pointer hover:bg-blue-300 hover:underline">
          <div className="absolute -left-6 -top-4 w-24 h-24 clip-custom transition-all duration-300 group-hover:w-64 group-hover:h-32 group-hover:bg-orange-500"></div>
          <p className="relative z-10 text-black text-2xl font-semibold transition-all duration-300 group-hover:text-black">Bridal Salons</p>
        </div>
        <div className="border-amber-200 relative w-64 h-32 bg-white rounded-3xl overflow-hidden group flex items-center justify-center cursor-pointer hover:bg-blue-300 hover:underline">
          <div className="absolute -left-6 -top-4 w-24 h-24 clip-custom transition-all duration-300 group-hover:w-64 group-hover:h-32 group-hover:bg-orange-500"></div>
          <p className="relative z-10 text-black text-2xl font-semibold transition-all duration-300 group-hover:text-black">Bridal Salons</p>
        </div>
      </div>
      <div className="flex flex-row justify-center gap-6 mb-8">
        <div className="border-amber-200 relative w-64 h-32 bg-white rounded-3xl overflow-hidden group flex items-center justify-center cursor-pointer hover:bg-blue-300 hover:underline">
          <div className="absolute -left-6 -top-4 w-24 h-24 clip-custom transition-all duration-300 group-hover:w-64 group-hover:h-32 group-hover:bg-orange-500"></div>
          <p className="relative z-10 text-black text-2xl font-semibold transition-all duration-300 group-hover:text-black">Bridal Salons</p>
        </div>
        <div className="border-amber-200 relative w-64 h-32 bg-white rounded-3xl overflow-hidden group flex items-center justify-center cursor-pointer hover:bg-blue-300 hover:underline">
          <div className="absolute -left-6 -top-4 w-24 h-24 clip-custom transition-all duration-300 group-hover:w-64 group-hover:h-32 group-hover:bg-orange-500"></div>
          <p className="relative z-10 text-black text-2xl font-semibold transition-all duration-300 group-hover:text-black">Bridal Salons</p>
        </div>
        <div className="border-amber-200 relative w-64 h-32 bg-white rounded-3xl overflow-hidden group flex items-center justify-center cursor-pointer hover:bg-blue-300 hover:underline">
          <div className="absolute -left-6 -top-4 w-24 h-24 clip-custom transition-all duration-300 group-hover:w-64 group-hover:h-32 group-hover:bg-orange-500"></div>
          <p className="relative z-10 text-black text-2xl font-semibold transition-all duration-300 group-hover:text-black">Bridal Salons</p>
        </div>
      </div>
    </div>
  );
};

export default HoverCard;