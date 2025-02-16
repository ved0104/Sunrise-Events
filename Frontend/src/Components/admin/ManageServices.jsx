import React, { useEffect, useState } from "react";
import axios from "axios";
import { X, Edit, Trash } from "lucide-react";

export default function ManageServices() {
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editImage, setEditImage] = useState("");
  const [imageFile, setImageFile] = useState(null);

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
        withCredentials: true,
      });
      alert("Service deleted successfully");
      fetchServices();
    } catch (error) {
      console.error("Failed to delete service:", error.response?.data);
      alert(error.response?.data?.message || "Failed to delete service");
    }
  };

  const handleEditClick = (service) => {
    setEditingService(service);
    setEditTitle(service.title);
    setEditDescription(service.description);
    setEditPrice(service.price);
    setEditCategory(service.category);
    setEditImage(service.image);
    setImageFile(null);
  };

  const handleUpdateService = async () => {
    try {
      let imageUrl = editImage;
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);
        const uploadResponse = await axios.post("http://localhost:5000/upload-image", formData, { withCredentials: true });
        imageUrl = uploadResponse.data.imageUrl;
      }
      await axios.put(
        `http://localhost:5000/admin/services/${editingService._id}`,
        { title: editTitle, description: editDescription, price: editPrice, category: editCategory, image: imageUrl },
        { withCredentials: true }
      );
      alert("Service updated successfully");
      setEditingService(null);
      fetchServices();
    } catch (error) {
      console.error("Failed to update service:", error.response?.data);
      alert("Failed to update service");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-6 bg-gray-100 relative">
      <button onClick={() => window.history.back()} className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition">
      <X size={24} className="text-gray-700" />
      </button>

      {editingService ? (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
          <h3 className="text-2xl font-semibold mb-4">Edit Service</h3>
          <input type="text" placeholder="Title" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="border p-2 w-full mb-2 rounded" />
          <textarea placeholder="Description" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} className="border p-2 w-full mb-2 rounded" />
          <input type="text" placeholder="Price" value={editPrice} onChange={(e) => setEditPrice(e.target.value)} className="border p-2 w-full mb-2 rounded" />
          <input type="text" placeholder="Category" value={editCategory} onChange={(e) => setEditCategory(e.target.value)} className="border p-2 w-full mb-2 rounded" />
          <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} className="border p-2 w-full mb-2 rounded" />
          {imageFile && <img src={URL.createObjectURL(imageFile)} alt="Preview" className="w-full h-32 object-cover rounded mb-2" />}
          {editImage && !imageFile && <img src={editImage} alt="Service" className="w-full h-32 object-cover rounded mb-2" />}
          <div className="flex justify-between">
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition" onClick={handleUpdateService}>Save</button>
            <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition" onClick={() => setEditingService(null)}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-3xl font-semibold text-center mb-4">Manage Services</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.length > 0 ? (
                services.map((service, index) => (
                  <tr key={service._id} className="border-b hover:bg-gray-100 transition">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3 font-medium">{service.title}</td>
                    <td className="p-3 flex space-x-3">
                      <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition" onClick={() => handleEditClick(service)}>
                        <Edit size={18} />
                      </button>
                      <button className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition" onClick={() => handleDelete(service._id)}>
                        <Trash size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center p-4">No services available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
