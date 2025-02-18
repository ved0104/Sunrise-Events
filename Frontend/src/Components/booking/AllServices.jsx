import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar/navbar";
import FloatingButtons from "../FloatingButtons";
import { useNavigate } from "react-router-dom";

export default function AllServices() {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users/services"); // Your backend API
      console.log("data coming from backend", response);
      setServices(response.data.services); // Assuming response.data is an array of services
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const handleBookNow = async (serviceId) => {
    navigate(`/booking/${serviceId}`);
  };

  const limitWords = (text, wordLimit) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  return (
    <>
      <Navbar />
      <FloatingButtons />
      {/* Adjusted Heading with Padding to Account for Navbar Height */}
      <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl text-center pt-20 pb-6 mt-8 mb-3">
        Explore All Our Services
      </h1>

      {/* Grid Container with Adjusted Padding */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-8 md:px-12 lg:px-16 mb-10">
        {services.map((service) => (
          <div
            key={service._id}
            className="w-full bg-amber-50 text-center rounded-3xl shadow-lg shadow-gray-300 p-4 flex flex-col justify-between"
          >
            <img
              className="w-full h-[200px] sm:h-[250px] md:h-[300px] rounded-3xl object-cover"
              src={service.image}
              alt={service.title}
            />
            <h2 className="font-bold text-lg sm:text-xl md:text-2xl mt-2">
              {service.title}
            </h2>
            <p className="text-sm sm:text-base px-2 break-words overflow-hidden text-ellipsis">
              {limitWords(service.description, 30)}
            </p>
            <p className="text-lg font-bold text-amber-600 mt-1">
              Price: ₹{service.price}
            </p>
            <div className="flex flex-row mt-2 justify-center items-center">
              <button
                className="bg-amber-400 rounded-lg h-10 sm:h-12 w-24 sm:w-32 font-bold text-white hover:bg-amber-500 hover:font-extrabold cursor-pointer"
                onClick={() => handleBookNow(service._id)}
              >
                Booking
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}




// import { useEffect, useState } from "react";
// import axios from "axios";
// import Navbar from "../Navbar/navbar";
// import FloatingButtons from "../FloatingButtons";
// import { useNavigate } from "react-router-dom";

// export default function AllServices() {
//   const [services, setServices] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchServices();
//   }, []);

//   const fetchServices = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/users/services"); // Your backend API
//       console.log("data coming from backend", response);
//       setServices(response.data.services); // Assuming response.data is an array of services
//     } catch (error) {
//       console.error("Error fetching services:", error);
//     }
//   };

//   const handleBookNow = async (serviceId) => {
//     navigate(`/booking/${serviceId}`);
//   };

//   const limitWords = (text, wordLimit) => {
//     const words = text.split(" ");
//     return words.length > wordLimit
//       ? words.slice(0, wordLimit).join(" ") + "..."
//       : text;
//   };

//   return (
//     <>
//       <Navbar />
//       <FloatingButtons />
//       <h1 className="font-bold text-5xl text-center h-[16vh] mt-[15vh]">
//         Explore All Our Services
//       </h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mx-[10vh] gap-[5vh] mb-[10vh]">
//         {services.map((service) => (
//           <div
//             key={service._id}
//             className="w-[50vh] h-[58vh] bg-amber-50 text-center rounded-3xl shadow-2xs shadow-gray-300 p-4 flex flex-col justify-between"
//           >
//             <img
//               className="w-full h-[30vh] rounded-3xl object-cover"
//               src={service.image}
//               alt={service.title}
//             />
//             <h2 className="font-bold text-xl mt-2">{service.title}</h2>
//             <p className="text-sm px-2 break-words overflow-hidden text-ellipsis">
//               {limitWords(service.description, 30)}
//             </p>
//             <p className="text-lg font-bold text-amber-600 mt-1">
//               Price: ₹{service.price}
//             </p>
//             <div className="flex flex-row mt-2 justify-center items-center">
//               <button
//                 className="bg-amber-400 rounded-lg h-[5vh] w-[15vh] font-bold text-white hover:bg-amber-500 hover:font-extrabold cursor-pointer"
//                 onClick={() => handleBookNow(service._id)}
//               >
//                 Booking
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }
