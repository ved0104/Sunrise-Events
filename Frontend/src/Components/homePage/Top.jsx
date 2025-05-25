import { useNavigate } from "react-router-dom";
import React from "react";

export default function TopComponent() {
  const navigate = useNavigate();

  return (
    <div className="min-h-100 sm:min-h-140 flex flex-col justify-center items-center pt-20 pb-8">  
      <div
        className="text-white flex flex-col items-center pt-11 bg-[url('/images/home/top3.jpg')] md:bg-[url('/images/home/top6.jpg')] bg-cover bg-center bg-no-repeat min-h-100 sm:min-h-140 min-w-full"
      >
        <div className="text-center mb-6 px-2 sm:px-4">
          <h1 className="font-inter font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-3d-effect drop-shadow-[4px_4px_0px_rgba(0,0,0,0.5)] sm:drop-shadow-[6px_6px_0px_rgba(0,0,0,0.6)] md:drop-shadow-[8px_8px_0px_rgba(0,0,0,0.7)]">
            Turning Ordinary Spaces<br/> into Extraordinary Celebrations
          </h1>
        </div>

        <div className="w-full max-w-md sm:max-w-lg px-2 sm:px-4">
          <p className="text-center text-lg sm:text-2xl mb-3 sm:mb-4 font-bold text-3d-effect drop-shadow-[3px_3px_0px_rgba(0,0,0,0.4)] sm:drop-shadow-[5px_5px_0px_rgba(0,0,0,0.5)] md:drop-shadow-[7px_7px_0px_rgba(0,0,0,0.6)]">
            Elegant, Customized Decor for Every Occasion
          </p>
        </div>
      </div>
    </div>
  );
}