import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminGalleryPage() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/gallery");
      setGalleryItems(response.data);
      setFilteredItems(response.data);

      // Extract unique categories from data
      const uniqueCategories = [
        ...new Set(response.data.map((item) => item.category)),
      ];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching gallery items:", error);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredItems(galleryItems);
    } else {
      const filtered = galleryItems.filter(
        (item) => item.category === category
      );
      setFilteredItems(filtered);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/gallery/${id}`, {
        withCredentials: true,
      });
      fetchGalleryItems(); // Refresh data after deletion
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  const handleUpdateItem = async (id) => {
    const updatedImage = prompt("Enter new image URL:");
    if (!updatedImage) return;

    try {
      await axios.put(
        `http://localhost:5000/gallery/${id}`,
        { image: updatedImage },
        { withCredentials: true }
      );
      fetchGalleryItems(); // Refresh after update
    } catch (error) {
      console.error("Failed to update item:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Admin Gallery Management
      </h1>

      {/* Category Filter */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => handleCategoryChange("All")}
          className={`px-4 py-2 rounded-lg ${
            selectedCategory === "All"
              ? "bg-amber-500 text-white"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 rounded-lg ${
              selectedCategory === category
                ? "bg-amber-500 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item._id}
            className="relative bg-white rounded-lg shadow-lg overflow-hidden group"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover transform transition-transform group-hover:scale-105"
            />

            {/* Hover Overlay with Update & Delete */}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleUpdateItem(item._id)}
                className="bg-blue-500 text-white px-3 py-1 rounded mb-2 hover:bg-blue-600"
              >
                Update Image
              </button>
              <button
                onClick={() => handleDeleteItem(item._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="text-sm text-gray-600">{item.category}</p>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          No items available in this category.
        </p>
      )}
    </div>
  );
}
