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
       
        const response = await axios.get(
          `http://localhost:5000/users/services/${id}`,
          { withCredentials: true }
        );
       
        setSelectedService(response.data.service);
      } catch (err) {
        console.error("Error fetching service:", err);
        setError("Failed to load service details.");
      }
    };

    if (id) fetchService();
  }, [id]);
  const defaultDescription = `
    <p>Your wedding is a once-in-a-lifetime celebration, and we ensure
    it is nothing short of magical. Our expert team specializes in
    crafting breathtaking Gujarati wedding décor, blending
    traditional elegance with modern aesthetics.</p>

    <p>🌿 <strong>Grand Mandap Setup:</strong> Designed with intricate
    floral arrangements, traditional torans, and artistic drapes,
    our mandaps create a divine ambiance for your sacred vows.</p>

    <p>💡 <strong>Dazzling Lighting & Entryway:</strong> From warm
    fairy lights to vibrant LED installations, we create an
    enchanting atmosphere. Our decorative entrance features
    bandhani, marigold garlands, and peacock-themed décor to welcome
    your guests in style.</p>

    <p>✨ <strong>Personalized Touch:</strong> From beautifully
    adorned pheras stage to exquisite bride & groom seating
    arrangements, every element is meticulously designed to make
    your special day unforgettable.</p>

    <p>Let us transform your wedding into a dream celebration that
    reflects tradition, love, and elegance. Book your wedding decor
    today!</p>
  `;
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
          <p
            className="font-bold px-4 md:px-15 text-sm md:text-base"
            dangerouslySetInnerHTML={{
              __html: selectedService?.description || defaultDescription,
            }}
          />
        )}
      </div>
    </div>
  );
}
