import React from "react";
import { useNavigate } from "react-router-dom";
import furniture from "../../assets/images/home/furniture.jpg";
import sangeet from "../../assets/images/home/sangeet.jpg"
import reception from "../../assets/images/home/reception.jpg"
import rental from "../../assets/images/home/rental.jpg"
import haldiGif from "../../assets/images/home/haldi.gif";
import weddingGif from "../../assets/images/home/wedding.gif";
import birthdayGif from "../../assets/images/home/birthday.gif";
import { color } from "framer-motion";

const services = [
  
  {
    title: "Sangeet",
    description: "Set the stage for a vibrant musical evening",
    image: sangeet,
    type: "standard",
    
  },
  {
    title: "Wedding",
    description: "Transform your venue with elegant decor",
    background: weddingGif,
    type: "full-bleed",
  
  },
  {
    title: "Reception",
    description: "Style your reception for a grand celebration",
    image: reception,
    type: "standard",
   
  },
  {
    title: "Haldi",
    description: "Brighten your ceremony with vivid haldi decor",
    background: haldiGif,
    type: "full-bleed",
    
  },
  {
    title: "Rental",
    description: "Furnish your event with premium rentals",
    image: rental,
    type: "standard",
   
  },
  {
    title: "Birthday",
    description: "Lavish birthday decor",
    background: birthdayGif,
    type: "full-bleed",
   
  }
];

export default function ServiceComponent() {
  const navigate = useNavigate();

  const handleServiceClick = (serviceTitle) => {
    navigate(`/gallery?category=${encodeURIComponent(serviceTitle.toLowerCase())}`);
    console.log("Navigating :",`/gallery?category=${encodeURIComponent(serviceTitle.toLowerCase())}`)
  };

  return (
    <div className="flex flex-col items-center pb-10 px-4 md:px-10 lg:px-20">
      <h2 className="mt-8 mb-4 text-center font-inter font-bold text-3xl md:text-4xl lg:text-5xl">
        Checkout our gallery
      </h2>
      <p className="text-center font-inter text-lg md:text-xl lg:text-2xl max-w-2xl">
        Explore Our Finest Event Decorations
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 w-full max-w-6xl mt-6">
        {services.map((service, index) => (
          <div
            key={index}
            onClick={() => handleServiceClick(service.title)}
            className={` w-full p-3 md:p-5 rounded-2xl shadow-lg text-center flex flex-col items-center bg-orange-200
              cursor-pointer transition-transform duration-300 hover:scale-105 ${
                service.type === 'standard' ? 'min-h-[180px]' : 'h-[180px] md:h-[260px]'
              }`}
            style={service.background ? { 
              backgroundImage: `url(${service.background})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            } : {}}
          >
            {service.type === 'standard' ? (
              <>
                <div className={`${service.background ? 'text-white' : 'text-black'}`}>
                  <h2 className="text-base md:text-lg font-semibold mb-1">{service.title}</h2>
                  <p className="mt-1">{service.description}</p>
                </div>
                {service.image && (
                  <div className="flex justify-center mt-3">
                    <img 
                      src={service.image} 
                      className="rounded-lg w-20 h-12 md:w-40 md:h-27" 
                      alt={service.title} 
                    />
                  </div>
                )}
                <button className="mt-3 px-3 py-1 border border-black rounded-full text-black hover:bg-black hover:text-white transition">
                  See more
                </button>
              </>
            ) : (
              <div className="flex flex-col justify-center h-full">
                <h2 className="text-white text-xl md:text-2xl font-semibold">{service.title}</h2>
                <p className="mt-1 text-white font-semibold underline underline-offset-3">
                  {service.description}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}