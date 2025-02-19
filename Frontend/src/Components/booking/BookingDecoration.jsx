import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function BookingDecoration() {
  const { id } = useParams(); // Extract ID from URL
  const [selectedService, setSelectedService] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the service details based on the ID using Axios
    const fetchService = async () => {
      try {
        console.log("Confirming booking...");
        const response = await axios.get(
          `http://localhost:5000/users/services/${id}`,
          { withCredentials: true }
        );
        console.log(response.data); 
        setSelectedService(response.data.service);
      } catch (err) {
        console.error("Error fetching service:", err);
        setError("Failed to load service details.");
      }
    };

    if (id) fetchService();
  }, [id]);

  return (
    <div className="flex justify-center pb-20">
      <div className="text-center w-full md:w-180 lg:w-250 bg-blue-100 border-2 border-blue-200 p-4 md:p-10 rounded-3xl mx-4 md:mx-0">
        <h2 className="text-2xl md:text-3xl font-extrabold pt-4 pb-6 md:pt-0 md:pb-8">
          {selectedService?.title ||
            "Exquisite Wedding Decor Tailored to Gujarati Traditions"}
        </h2>
        {error ? (
          <p className="text-red-500 font-bold">{error}</p>
        ) : (
          <p className="font-bold px-4 md:px-15 text-sm md:text-base">
            {selectedService?.description || (
              <>
                Your wedding is a once-in-a-lifetime celebration, and we ensure
                it is nothing short of magical. Our expert team specializes in
                crafting breathtaking Gujarati wedding décor, blending
                traditional elegance with modern aesthetics.
                <br />
                <br />
                🌿 <strong>Grand Mandap Setup:</strong> Designed with intricate
                floral arrangements, traditional torans, and artistic drapes,
                our mandaps create a divine ambiance for your sacred vows.
                <br />
                <br />
                💡 <strong>Dazzling Lighting & Entryway:</strong> From warm
                fairy lights to vibrant LED installations, we create an
                enchanting atmosphere. Our decorative entrance features
                bandhani, marigold garlands, and peacock-themed décor to welcome
                your guests in style.
                <br />
                <br />
                � <strong>Theme-Based Decor:</strong> Whether you desire a
                royal Rajwadi theme, Bollywood glamour, or a classic red-gold
                traditional setup, we tailor the decorations to your dream
                wedding vision.
                <br />
                <br />
                🌸 <strong>Floral & Table Arrangements:</strong> Fresh roses,
                lotuses, and marigolds add fragrance and beauty to the venue,
                while custom table settings with elegant centerpieces ensure a
                sophisticated dining experience.
                <br />
                <br />
                🎭 <strong>Sangeet & Haldi Decor:</strong> We bring energy to
                your Garba and Sangeet nights with colorful drapes, floral
                canopies, and LED dance floors. For Haldi, our rustic
                yellow-themed décor with clay pots and flower showers adds the
                perfect festive touch.
                <br />
                <br />
                ✨ <strong>Personalized Touch:</strong> From beautifully
                adorned pheras stage to exquisite bride & groom seating
                arrangements, every element is meticulously designed to make
                your special day unforgettable.
                <br />
                <br />
                Let us transform your wedding into a dream celebration that
                reflects tradition, love, and elegance. Book your wedding decor
                today!
              </>
            )}
          </p>
        )}
      </div>
    </div>
  );
}






// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// export default function BookingDecoration() {
//   const { id } = useParams(); // Extract ID from URL
//   const [selectedService, setSelectedService] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Fetch the service details based on the ID using Axios
//     const fetchService = async () => {
//       try {
//         console.log("Confirming booking...");
//         const response = await axios.get(
//           `http://localhost:5000/users/services/${id}`,
//           { withCredentials: true }
//         );
//         console.log(response.data); 
//         setSelectedService(response.data.service);
//       } catch (err) {
//         console.error("Error fetching service:", err);
//         setError("Failed to load service details.");
//       }
//     };

//     if (id) fetchService();
//   }, [id]);

//   return (
//     <div className="flex justify-center pb-20">
//       <div className="text-center w-350 bg-blue-100 border-2 border-blue-200 p-10 rounded-3xl">
//         <h2 className="text-3xl font-extrabold pt pb-8">
//           {selectedService?.title ||
//             "Exquisite Wedding Decor Tailored to Gujarati Traditions"}
//         </h2>
//         {error ? (
//           <p className="text-red-500 font-bold">{error}</p>
//         ) : (
//           <p className="font-bold px-15">
//             {selectedService?.description || (
//               <>
//                 Your wedding is a once-in-a-lifetime celebration, and we ensure
//                 it is nothing short of magical. Our expert team specializes in
//                 crafting breathtaking Gujarati wedding décor, blending
//                 traditional elegance with modern aesthetics.
//                 <br />
//                 <br />
//                 🌿 <strong>Grand Mandap Setup:</strong> Designed with intricate
//                 floral arrangements, traditional torans, and artistic drapes,
//                 our mandaps create a divine ambiance for your sacred vows.
//                 <br />
//                 <br />
//                 💡 <strong>Dazzling Lighting & Entryway:</strong> From warm
//                 fairy lights to vibrant LED installations, we create an
//                 enchanting atmosphere. Our decorative entrance features
//                 bandhani, marigold garlands, and peacock-themed décor to welcome
//                 your guests in style.
//                 <br />
//                 <br />
//                 🎨 <strong>Theme-Based Decor:</strong> Whether you desire a
//                 royal Rajwadi theme, Bollywood glamour, or a classic red-gold
//                 traditional setup, we tailor the decorations to your dream
//                 wedding vision.
//                 <br />
//                 <br />
//                 🌸 <strong>Floral & Table Arrangements:</strong> Fresh roses,
//                 lotuses, and marigolds add fragrance and beauty to the venue,
//                 while custom table settings with elegant centerpieces ensure a
//                 sophisticated dining experience.
//                 <br />
//                 <br />
//                 🎭 <strong>Sangeet & Haldi Decor:</strong> We bring energy to
//                 your Garba and Sangeet nights with colorful drapes, floral
//                 canopies, and LED dance floors. For Haldi, our rustic
//                 yellow-themed décor with clay pots and flower showers adds the
//                 perfect festive touch.
//                 <br />
//                 <br />✨ <strong>Personalized Touch:</strong> From beautifully
//                 adorned pheras stage to exquisite bride & groom seating
//                 arrangements, every element is meticulously designed to make
//                 your special day unforgettable.
//                 <br />
//                 <br />
//                 Let us transform your wedding into a dream celebration that
//                 reflects tradition, love, and elegance. Book your wedding decor
//                 today!
//               </>
//             )}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }
