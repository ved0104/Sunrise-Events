import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminGalleryPage() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [newImageFile, setNewImageFile] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newDescription, setNewDescription] = useState("");

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/admin/gallery");
      setGalleryItems(response.data.galleryItems);
      setFilteredItems(response.data.galleryItems);

      const uniqueCategories = [
        ...new Set(response.data.galleryItems.map((item) => item.category)),
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
      await axios.delete(`http://localhost:5000/admin/gallery/${id}`, {
        withCredentials: true,
      });
      fetchGalleryItems();
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  const handleUpdateItem = async (id) => {
    const updatedImageUrl = prompt("Enter new image URL:");
    if (!updatedImageUrl) return;

    try {
      await axios.put(
        `http://localhost:5000/admin/gallery/${id}`,
        { imageUrl: updatedImageUrl },
        { withCredentials: true }
      );
      fetchGalleryItems();
    } catch (error) {
      console.error("Failed to update item:", error);
    }
  };

  const handleAddItem = async () => {
    if (!newImageFile || !newTitle || !newCategory || !newDescription) {
      alert("Please fill out all fields and select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", newImageFile);
    formData.append("title", newTitle);
    formData.append("description", newDescription);
    formData.append("category", newCategory);

    try {
      await axios.post("http://localhost:5000/admin/gallery", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setNewImageFile(null);
      setNewTitle("");
      setNewDescription("");
      setNewCategory("");
      fetchGalleryItems();
    } catch (error) {
      console.error("Failed to add item:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Admin Gallery Management
      </h1>

      {/* Add New Image Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add New Image</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewImageFile(e.target.files[0])}
            className="border border-gray-300 p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
          />
          <button
            onClick={handleAddItem}
            className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600"
          >
            Add Image
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex justify-center gap-4 mb-6 flex-wrap">
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
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-48 object-cover transform transition-transform group-hover:scale-105"
            />

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
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.category}</p>
              <p className="text-xs text-gray-500">{item.description}</p>
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
