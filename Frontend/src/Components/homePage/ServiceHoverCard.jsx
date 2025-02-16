import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HoverCard = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);

  // Fetch services from backend
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users/services");
        console.log(response.data.services); // Debugging response
        setServices(response.data.services);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  // Handle navigation when a service is clicked
  const handleClick = (serviceId) => {
    navigate(`/booking/${serviceId}`);
  };

  return (
    <div className="flex flex-col items-center bg-[#FFF5ED] py-8 px-4 sm:px-6 lg:px-8">
      {/* Responsive Heading */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 sm:mb-8">
        Choose what to decorate
      </h2>

      {/* Responsive Grid for Services */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-7xl">
        {services.map((service) => (
          <div
            key={service._id}
            className="relative w-full h-24 sm:h-32 md:h-40 bg-white rounded-3xl overflow-hidden group flex items-center justify-center cursor-pointer hover:bg-blue-300 hover:underline transition-all duration-300"
            onClick={() => handleClick(service._id)}
          >
            {/* Hover Effect Background */}
            <div className="absolute -left-6 -top-4 w-24 h-24 clip-custom transition-all duration-300 group-hover:w-full group-hover:h-full group-hover:bg-orange-500"></div>

            {/* Service Title with Responsive Text Size */}
            <p className="relative z-10 text-black text-sm sm:text-base md:text-lg lg:text-xl font-semibold transition-all duration-300 group-hover:text-black text-center">
              {service.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HoverCard;



// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const HoverCard = () => {
//   const navigate = useNavigate();
//   const [services, setServices] = useState([]);

//   // Fetch services from backend
//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/users/services");
//         console.log(response.data.services); // Debugging response
//         setServices(response.data.services);
//       } catch (error) {
//         console.error("Error fetching services:", error);
//       }
//     };
//     fetchServices();
//   }, []);

//   // Handle navigation when a service is clicked
//   const handleClick = (serviceId) => {
//     navigate(`/booking/${serviceId}`);
//   };

//   return (
//     <div className="flex flex-col items-center bg-[#FFF5ED]">
//       <h2 className="text-5xl font-bold">Choose what to decorate</h2>
//       <div className="flex flex-wrap justify-center gap-6 my-8">
//         {services.map((service) => (
//           <div
//             key={service._id} // Corrected
//             className="border-amber-200 relative w-64 h-32 bg-white rounded-3xl overflow-hidden group flex items-center justify-center cursor-pointer hover:bg-blue-300 hover:underline"
//             onClick={() => handleClick(service._id)} // Corrected
//           >
//             <div className="absolute -left-6 -top-4 w-24 h-24 clip-custom transition-all duration-300 group-hover:w-64 group-hover:h-32 group-hover:bg-orange-500"></div>
//             <p className="relative z-10 text-black text-2xl font-semibold transition-all duration-300 group-hover:text-black">
//               {service.title} {/* Display service title */}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HoverCard;
