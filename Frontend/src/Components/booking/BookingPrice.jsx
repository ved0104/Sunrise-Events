import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BookingPrice = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchServiceById(id);
    }
  }, [id]);

  const fetchServiceById = async (id) => {
    try {
      console.log("entered");
      const response = await axios.get(
        `http://localhost:5000/users/services/${id}`,
        { withCredentials: true }
      );
      setService(response.data.service);
    } catch (error) {
      console.error("Error fetching service:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="pb-5 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Service Price</h2>

        {loading ? (
          <p>Loading...</p>
        ) : service ? (
          <div className="p-4 border rounded-lg shadow-md">
            <span className="font-semibold">{service.title}:</span>{" "}
            <span className="text-amber-600 font-bold">₹{service.price}</span>
          </div>
        ) : (
          <p className="text-red-500">Service not found.</p>
        )}
      </div>
    </div>
  );
};

export default BookingPrice;
