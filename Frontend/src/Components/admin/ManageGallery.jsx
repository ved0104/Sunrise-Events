import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageGallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // State for new gallery item form
  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    category: "",
    image: null,
  });

  // State for editing an item
  const [editingItemId, setEditingItemId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    category: "",
    image: null,
  });

  // Fetch gallery items on component mount
  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("http://localhost:5000/admin/gallery");
      if (res.data.success) {
        setGalleryItems(res.data.galleryItems);
      } else {
        setError("Error fetching gallery items");
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching gallery items");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle new item form changes
  const handleNewItemChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setNewItem({ ...newItem, image: files[0] });
    } else {
      setNewItem({ ...newItem, [name]: value });
    }
  };

  // Submit new gallery item
  const handleNewItemSubmit = async (e) => {
    e.preventDefault();
    if (!newItem.title || !newItem.description || !newItem.category || !newItem.image) {
      alert("Please fill in all fields and select an image.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("title", newItem.title);
      formData.append("description", newItem.description);
      formData.append("category", newItem.category);
      formData.append("image", newItem.image);

      const res = await axios.post("http://localhost:5000/admin/gallery", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data.success) {
        alert("Gallery item created successfully");
        setGalleryItems([...galleryItems, res.data.galleryItem]);
        // Reset the form
        setNewItem({
          title: "",
          description: "",
          category: "",
          image: null,
        });
      } else {
        alert("Error creating gallery item");
      }
    } catch (err) {
      console.error(err);
      alert("Error creating gallery item");
    }
  };

  // Handle delete gallery item
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this gallery item?")) {
      try {
        const res = await axios.delete(`http://localhost:5000/admin/gallery/${id}`);
        if (res.data.success) {
          alert("Gallery item deleted successfully");
          setGalleryItems(galleryItems.filter((item) => item._id !== id));
        } else {
          alert("Error deleting gallery item");
        }
      } catch (err) {
        console.error(err);
        alert("Error deleting gallery item");
      }
    }
  };

  // Begin editing a gallery item
  const handleEditClick = (item) => {
    setEditingItemId(item._id);
    setEditForm({
      title: item.title,
      description: item.description,
      category: item.category,
      image: null, // Allow new image upload (optional)
    });
  };

  // Handle changes for the edit form
  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setEditForm({ ...editForm, image: files[0] });
    } else {
      setEditForm({ ...editForm, [name]: value });
    }
  };

  // Submit the edited gallery item
  const handleEditSubmit = async (e, id) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", editForm.title);
      formData.append("description", editForm.description);
      formData.append("category", editForm.category);
      // If a new image is provided, append it.
      // Otherwise, the backend should use the existing image URL (sent as "imageUrl")
      if (editForm.image) {
        formData.append("image", editForm.image);
      } else {
        // Find the current image URL for this item and send it as "imageUrl"
        const currentItem = galleryItems.find((item) => item._id === id);
        formData.append("imageUrl", currentItem.imageUrl);
      }

      const res = await axios.put(`/admin/gallery/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data.success) {
        alert("Gallery item updated successfully");
        // Update the item in the state
        const updatedItem = res.data.galleryItem;
        setGalleryItems(
          galleryItems.map((item) => (item._id === id ? updatedItem : item))
        );
        setEditingItemId(null);
      } else {
        alert("Error updating gallery item");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating gallery item");
    }
  };

  return (
    <div className="manage-gallery container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Gallery</h2>
      {error && <p className="text-red-500">{error}</p>}
      {isLoading ? (
        <p>Loading gallery items...</p>
      ) : (
        <>
          {/* Form to create a new gallery item */}
          <form onSubmit={handleNewItemSubmit} className="mb-8 border p-4 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">Add New Gallery Item</h3>
            <div className="mb-4">
              <label className="block mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={newItem.title}
                onChange={handleNewItemChange}
                className="border p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Description</label>
              <textarea
                name="description"
                value={newItem.description}
                onChange={handleNewItemChange}
                className="border p-2 w-full"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block mb-1">Category</label>
              <input
                type="text"
                name="category"
                value={newItem.category}
                onChange={handleNewItemChange}
                className="border p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Image</label>
              <input type="file" name="image" accept="image/*" onChange={handleNewItemChange} />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Add Gallery Item
            </button>
          </form>

          {/* Display gallery items */}
          <h3 className="text-xl font-semibold mb-2">Gallery Items</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryItems.map((item) => (
              <div key={item._id} className="border p-4 rounded shadow">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-48 object-cover mb-2"
                />
                {editingItemId === item._id ? (
                  // Edit form for this item
                  <form onSubmit={(e) => handleEditSubmit(e, item._id)}>
                    <div className="mb-2">
                      <label className="block mb-1">Title</label>
                      <input
                        type="text"
                        name="title"
                        value={editForm.title}
                        onChange={handleEditChange}
                        className="border p-2 w-full"
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block mb-1">Description</label>
                      <textarea
                        name="description"
                        value={editForm.description}
                        onChange={handleEditChange}
                        className="border p-2 w-full"
                      ></textarea>
                    </div>
                    <div className="mb-2">
                      <label className="block mb-1">Category</label>
                      <input
                        type="text"
                        name="category"
                        value={editForm.category}
                        onChange={handleEditChange}
                        className="border p-2 w-full"
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block mb-1">Image (optional)</label>
                      <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleEditChange}
                        className="w-full"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingItemId(null)}
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  // Display gallery item details
                  <>
                    <h4 className="text-lg font-bold">{item.title}</h4>
                    <p>{item.description}</p>
                    <p>
                      <strong>Category:</strong> {item.category}
                    </p>
                    <div className="flex space-x-2 mt-2">
                      <button
                        onClick={() => handleEditClick(item)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ManageGallery;
