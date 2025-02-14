import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ManageServices() {
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null); // For editing a service
  const [editTitle, setEditTitle] = useState("");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get("http://localhost:5000/admin/services", {
        withCredentials: true,
      });

      setServices(response.data.services);
    } catch (error) {
      console.error("Failed to fetch services:", error.response?.data);
      alert("Failed to load services");
    }
  };

  const handleDelete = async (serviceId) => {
    try {
      await axios.delete(`http://localhost:5000/admin/services/${serviceId}`, {
        withCredentials: true, // This will send the cookie automatically
      });
  
      alert("Service deleted successfully");
      fetchServices(); // Refresh the services list
    } catch (error) {
      console.error("Failed to delete service:", error.response?.data);
      alert(error.response?.data?.message || "Failed to delete service");
    }
  };
  

  const handleEditClick = (service) => {
    setEditingService(service);
    setEditTitle(service.title);
  };

  const handleUpdateService = async () => {
    try {
      await axios.put(
        `http://localhost:5000/admin/services/${editingService._id}`,
        { title: editTitle },
        { withCredentials: true }
      );

      alert("Service updated successfully");
      setEditingService(null);
      setEditTitle("");
      fetchServices(); // Refresh the list
    } catch (error) {
      console.error("Failed to update service:", error.response?.data);
      alert("Failed to update service");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-[10vh]">
      {editingService ? (
        <div className="mb-4 p-4 border rounded shadow-md w-[400px] bg-gray-100">
          <h3 className="text-lg font-bold mb-2">Edit Service</h3>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="border p-2 w-full mb-2"
          />
          <div className="flex justify-end">
            <button
              className="bg-green-500 text-white px-4 py-2 mr-2 rounded"
              onClick={handleUpdateService}
            >
              Save
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={() => setEditingService(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <table className="border-collapse border border-gray-400">
          <thead>
            <tr className="h-10 bg-gray-200">
              <th className="font-bold text-xl px-4 border border-gray-400">Sr. No</th>
              <th className="font-bold text-xl px-4 border border-gray-400">Title</th>
              <th className="font-bold text-xl px-4 border border-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.length > 0 ? (
              services.map((service, index) => (
                <tr key={service._id} className="h-15 border border-gray-400">
                  <td className="font-bold pl-3 border border-gray-400">{index + 1}</td>
                  <td className="font-medium pl-6 border border-gray-400">{service.title}</td>
                  <td className="flex flex-row justify-center items-center h-15 border border-gray-400">
                    <button
                      className="mx-2 bg-blue-500 text-white h-10 w-20 rounded-md font-medium hover:bg-blue-600 hover:font-bold cursor-pointer"
                      onClick={() => handleEditClick(service)}
                    >
                      Edit
                    </button>
                    <button
                      className="mx-2 bg-red-600 text-white h-10 w-20 rounded-md font-medium hover:bg-red-700 hover:font-bold cursor-pointer"
                      onClick={() => handleDelete(service._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4">
                  No services available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
