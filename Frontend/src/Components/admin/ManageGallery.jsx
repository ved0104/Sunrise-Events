import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const toastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

const ManageGallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    images: [],
    uploadType: "single", // 'single' or 'multiple'
  });

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/admin/gallery", {
        withCredentials: true,
      });
      setGalleryItems(response.data.galleryItems);
    } catch (error) {
      console.error("Error fetching gallery items:", error);
      toast.error("Error fetching gallery items", toastOptions);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      images: files,
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      category: "",
      images: [],
      uploadType: "single",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("category", formData.category);

    if (formData.uploadType === "single") {
      data.append("image", formData.images[0]);
    } else {
      formData.images.forEach((image) => data.append("images", image));
    }

    try {
      const endpoint =
        formData.uploadType === "single"
          ? "http://localhost:5000/admin/gallery"
          : "http://localhost:5000/admin/gallery/multiple";

      await axios.post(endpoint, data, { withCredentials: true });

      toast.success("Images uploaded successfully!", toastOptions);
      fetchGalleryItems();
      closeModal();
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Error uploading images", toastOptions);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`http://localhost:5000/admin/gallery/${id}`, {
          withCredentials: true,
        });
        toast.success("Gallery item deleted successfully", toastOptions);
        fetchGalleryItems();
      } catch (error) {
        console.error("Error deleting item:", error);
        toast.error("Error deleting item", toastOptions);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Gallery</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add New Images
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryItems.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={item.imageUrl}
              alt="Gallery"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                {item.category}
              </span>
              <div className="mt-4">
                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Upload Images</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Upload Type</label>
                  <select
                    name="uploadType"
                    value={formData.uploadType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                  >
                    <option value="single">Single Image</option>
                    <option value="multiple">Multiple Images</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Images</label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple={formData.uploadType === "multiple"}
                    onChange={handleFileChange}
                    className="w-full"
                    required
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 border rounded hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Upload
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageGallery;